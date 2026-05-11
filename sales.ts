import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Sales Invoices
router.get('/invoices', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT si.id, si.invoice_number, c.name as customer, si.total_amount, si.status, si.invoice_date
      FROM sales_invoices si
      JOIN customers c ON si.customer_id = c.id
      ORDER BY si.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching invoices:', error);
    res.status(500).json({ error: 'Failed to fetch invoices' });
  }
});

router.post('/invoices', requireRole('Sales Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { customerId, salesRepId, invoiceDate, items } = req.body;
    
    // Calculate total
    let totalAmount = 0;
    items.forEach((item: any) => {
      totalAmount += item.quantity * item.unitPrice;
    });
    
    // Create invoice
    const invoiceResult = await pool.query(
      `INSERT INTO sales_invoices (invoice_number, customer_id, sales_rep_id, invoice_date, total_amount, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [`INV-${Date.now()}`, customerId, salesRepId, invoiceDate, totalAmount, req.user?.userId]
    );
    
    const invoiceId = invoiceResult.rows[0].id;
    
    // Add line items
    for (const item of items) {
      const lineTotal = item.quantity * item.unitPrice;
      await pool.query(
        `INSERT INTO sales_invoice_items (sales_invoice_id, item_id, quantity, unit_price, line_total)
         VALUES ($1, $2, $3, $4, $5)`,
        [invoiceId, item.itemId, item.quantity, item.unitPrice, lineTotal]
      );
    }
    
    res.status(201).json({ id: invoiceId, message: 'Invoice created successfully' });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Failed to create invoice' });
  }
});

// Sales Plans
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, plan_type, period_start, period_end, status, created_at
      FROM sales_plans
      ORDER BY created_at DESC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales plans:', error);
    res.status(500).json({ error: 'Failed to fetch sales plans' });
  }
});

router.post('/plans', requireRole('Sales Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { planType, periodStart, periodEnd, items } = req.body;
    
    const planResult = await pool.query(
      `INSERT INTO sales_plans (plan_type, period_start, period_end, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [planType, periodStart, periodEnd, req.user?.userId]
    );
    
    const planId = planResult.rows[0].id;
    
    // Add plan items
    for (const item of items) {
      await pool.query(
        `INSERT INTO sales_plan_items (sales_plan_id, item_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4)`,
        [planId, item.itemId, item.quantity, item.unitPrice]
      );
    }
    
    res.status(201).json({ id: planId, message: 'Sales plan created successfully' });
  } catch (error) {
    console.error('Error creating sales plan:', error);
    res.status(500).json({ error: 'Failed to create sales plan' });
  }
});

// Sales Targets
router.get('/targets', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT st.id, sr.name as representative, st.target_amount, st.target_quantity, sp.period_start, sp.period_end
      FROM sales_targets st
      JOIN sales_representatives sr ON st.sales_rep_id = sr.id
      JOIN sales_plans sp ON st.sales_plan_id = sp.id
      ORDER BY sp.period_start DESC
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales targets:', error);
    res.status(500).json({ error: 'Failed to fetch sales targets' });
  }
});

export default router;
