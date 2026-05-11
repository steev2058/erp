import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Get pending approvals for current user
router.get('/pending', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT ar.id, ar.document_type, ar.document_id, ar.status, ar.created_at,
             u.username as created_by, ast.step_order, ast.approver_id
      FROM approval_requests ar
      JOIN users u ON ar.created_by = u.id
      JOIN approval_steps ast ON ar.id = ast.approval_request_id
      WHERE ast.approver_id = $1 AND ast.status = 'Pending'
      ORDER BY ar.created_at DESC
    `, [req.user?.userId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ error: 'Failed to fetch pending approvals' });
  }
});

// Get all approval requests
router.get('/requests', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT ar.id, ar.document_type, ar.document_id, ar.status, ar.created_at,
             u.username as created_by,
             (SELECT COUNT(*) FROM approval_steps WHERE approval_request_id = ar.id AND status = 'Approved') as approved_steps,
             (SELECT COUNT(*) FROM approval_steps WHERE approval_request_id = ar.id) as total_steps
      FROM approval_requests ar
      JOIN users u ON ar.created_by = u.id
      ORDER BY ar.created_at DESC
      LIMIT 100
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching approval requests:', error);
    res.status(500).json({ error: 'Failed to fetch approval requests' });
  }
});

// Create approval request
router.post('/requests', async (req: Request, res: Response) => {
  try {
    const { documentType, documentId, approverIds } = req.body;
    
    // Create approval request
    const requestResult = await pool.query(
      `INSERT INTO approval_requests (document_type, document_id, created_by)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [documentType, documentId, req.user?.userId]
    );
    
    const requestId = requestResult.rows[0].id;
    
    // Create approval steps
    for (let i = 0; i < approverIds.length; i++) {
      await pool.query(
        `INSERT INTO approval_steps (approval_request_id, step_order, approver_id)
         VALUES ($1, $2, $3)`,
        [requestId, i + 1, approverIds[i]]
      );
    }
    
    res.status(201).json({ id: requestId, message: 'Approval request created successfully' });
  } catch (error) {
    console.error('Error creating approval request:', error);
    res.status(500).json({ error: 'Failed to create approval request' });
  }
});

// Approve a step
router.post('/approve/:stepId', async (req: Request, res: Response) => {
  try {
    const { stepId } = req.params;
    const { comments } = req.body;
    
    // Update approval step
    const stepResult = await pool.query(
      `UPDATE approval_steps 
       SET status = 'Approved', comments = $1, approved_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND approver_id = $3
       RETURNING approval_request_id`,
      [comments, stepId, req.user?.userId]
    );
    
    if (stepResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized to approve this step' });
    }
    
    const requestId = stepResult.rows[0].approval_request_id;
    
    // Check if all steps are approved
    const pendingSteps = await pool.query(
      `SELECT COUNT(*) as count FROM approval_steps 
       WHERE approval_request_id = $1 AND status = 'Pending'`,
      [requestId]
    );
    
    if (pendingSteps.rows[0].count === 0) {
      // All steps approved, update request status
      await pool.query(
        `UPDATE approval_requests SET status = 'Approved' WHERE id = $1`,
        [requestId]
      );
    }
    
    res.json({ message: 'Step approved successfully' });
  } catch (error) {
    console.error('Error approving step:', error);
    res.status(500).json({ error: 'Failed to approve step' });
  }
});

// Reject a step
router.post('/reject/:stepId', async (req: Request, res: Response) => {
  try {
    const { stepId } = req.params;
    const { comments } = req.body;
    
    // Update approval step
    const stepResult = await pool.query(
      `UPDATE approval_steps 
       SET status = 'Rejected', comments = $1, approved_at = CURRENT_TIMESTAMP
       WHERE id = $2 AND approver_id = $3
       RETURNING approval_request_id`,
      [comments, stepId, req.user?.userId]
    );
    
    if (stepResult.rows.length === 0) {
      return res.status(403).json({ error: 'Not authorized to reject this step' });
    }
    
    const requestId = stepResult.rows[0].approval_request_id;
    
    // Update request status to rejected
    await pool.query(
      `UPDATE approval_requests SET status = 'Rejected' WHERE id = $1`,
      [requestId]
    );
    
    res.json({ message: 'Step rejected successfully' });
  } catch (error) {
    console.error('Error rejecting step:', error);
    res.status(500).json({ error: 'Failed to reject step' });
  }
});

// Get approval history for a request
router.get('/history/:requestId', async (req: Request, res: Response) => {
  try {
    const { requestId } = req.params;
    
    const result = await pool.query(`
      SELECT ast.id, ast.step_order, u.username as approver, ast.status, ast.comments, ast.approved_at
      FROM approval_steps ast
      JOIN users u ON ast.approver_id = u.id
      WHERE ast.approval_request_id = $1
      ORDER BY ast.step_order
    `, [requestId]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching approval history:', error);
    res.status(500).json({ error: 'Failed to fetch approval history' });
  }
});

export default router;
