import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Purchase Plans
router.get('/plans', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, plan_type, period_start, period_end, status, created_at
      FROM purchase_plans
      ORDER BY created_at DESC
      LIMIT 50
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching purchase plans:', error);
    res.status(500).json({ error: 'Failed to fetch purchase plans' });
  }
});

router.post('/plans', requireRole('Purchasing Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { planType, periodStart, periodEnd, items } = req.body;
    
    const planResult = await pool.query(
      `INSERT INTO purchase_plans (plan_type, period_start, period_end, created_by)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [planType, periodStart, periodEnd, req.user?.userId]
    );
    
    const planId = planResult.rows[0].id;
    
    // Add plan items
    for (const item of items) {
      await pool.query(
        `INSERT INTO purchase_plan_items (purchase_plan_id, item_id, supplier_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [planId, item.itemId, item.supplierId, item.quantity, item.unitPrice]
      );
    }
    
    res.status(201).json({ id: planId, message: 'Purchase plan created successfully' });
  } catch (error) {
    console.error('Error creating purchase plan:', error);
    res.status(500).json({ error: 'Failed to create purchase plan' });
  }
});

// Purchase Requests
router.get('/requests', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT pr.id, pr.request_number, pr.status, pr.created_at,
             COUNT(pri.id) as item_count
      FROM purchase_requests pr
      LEFT JOIN purchase_request_items pri ON pr.id = pri.purchase_request_id
      GROUP BY pr.id, pr.request_number, pr.status, pr.created_at
      ORDER BY pr.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching purchase requests:', error);
    res.status(500).json({ error: 'Failed to fetch purchase requests' });
  }
});

router.post('/requests', requireRole('Purchasing Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { purchasePlanId, items } = req.body;
    
    const requestResult = await pool.query(
      `INSERT INTO purchase_requests (request_number, purchase_plan_id, created_by)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [`PR-${Date.now()}`, purchasePlanId, req.user?.userId]
    );
    
    const requestId = requestResult.rows[0].id;
    
    // Add request items
    for (const item of items) {
      await pool.query(
        `INSERT INTO purchase_request_items (purchase_request_id, item_id, supplier_id, quantity, unit_price)
         VALUES ($1, $2, $3, $4, $5)`,
        [requestId, item.itemId, item.supplierId, item.quantity, item.unitPrice]
      );
    }
    
    res.status(201).json({ id: requestId, message: 'Purchase request created successfully' });
  } catch (error) {
    console.error('Error creating purchase request:', error);
    res.status(500).json({ error: 'Failed to create purchase request' });
  }
});

// Purchase Invoices
router.get('/invoices', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT pi.id, pi.invoice_number, s.name as supplier, pi.total_amount, pi.status, pi.invoice_date
      FROM purchase_invoices pi
      JOIN suppliers s ON pi.supplier_id = s.id
      ORDER BY pi.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching purchase invoices:', error);
    res.status(500).json({ error: 'Failed to fetch purchase invoices' });
  }
});

router.post('/invoices', requireRole('Purchasing Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { supplierId, invoiceDate, items } = req.body;
    
    // Calculate total
    let totalAmount = 0;
    items.forEach((item: any) => {
      totalAmount += item.quantity * item.unitPrice;
    });
    
    // Create invoice
    const invoiceResult = await pool.query(
      `INSERT INTO purchase_invoices (invoice_number, supplier_id, invoice_date, total_amount, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [`PINV-${Date.now()}`, supplierId, invoiceDate, totalAmount, req.user?.userId]
    );
    
    const invoiceId = invoiceResult.rows[0].id;
    
    // Add line items
    for (const item of items) {
      const lineTotal = item.quantity * item.unitPrice;
      await pool.query(
        `INSERT INTO purchase_invoice_items (purchase_invoice_id, item_id, quantity, unit_price, line_total)
         VALUES ($1, $2, $3, $4, $5)`,
        [invoiceId, item.itemId, item.quantity, item.unitPrice, lineTotal]
      );
    }
    
    res.status(201).json({ id: invoiceId, message: 'Purchase invoice created successfully' });
  } catch (error) {
    console.error('Error creating purchase invoice:', error);
    res.status(500).json({ error: 'Failed to create purchase invoice' });
  }
});

// Goods Receipts
router.get('/goods-receipts', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT gr.id, gr.receipt_number, pi.invoice_number, w.name as warehouse, gr.status, gr.receipt_date
      FROM goods_receipts gr
      JOIN purchase_invoices pi ON gr.purchase_invoice_id = pi.id
      JOIN warehouses w ON gr.warehouse_id = w.id
      ORDER BY gr.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching goods receipts:', error);
    res.status(500).json({ error: 'Failed to fetch goods receipts' });
  }
});

router.post('/goods-receipts', requireRole('Warehouse Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { purchaseInvoiceId, warehouseId, receiptDate, items } = req.body;
    
    // Create receipt
    const receiptResult = await pool.query(
      `INSERT INTO goods_receipts (receipt_number, purchase_invoice_id, warehouse_id, receipt_date, created_by)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id`,
      [`GR-${Date.now()}`, purchaseInvoiceId, warehouseId, receiptDate, req.user?.userId]
    );
    
    const receiptId = receiptResult.rows[0].id;
    
    // Add receipt items and update stock
    for (const item of items) {
      await pool.query(
        `INSERT INTO goods_receipt_items (goods_receipt_id, item_id, quantity)
         VALUES ($1, $2, $3)`,
        [receiptId, item.itemId, item.quantity]
      );
      
      // Update or create stock balance
      const existingBalance = await pool.query(
        'SELECT id FROM stock_balances WHERE warehouse_id = $1 AND item_id = $2',
        [warehouseId, item.itemId]
      );
      
      if (existingBalance.rows.length > 0) {
        await pool.query(
          `UPDATE stock_balances SET quantity = quantity + $1, last_updated = CURRENT_TIMESTAMP
           WHERE warehouse_id = $2 AND item_id = $3`,
          [item.quantity, warehouseId, item.itemId]
        );
      } else {
        await pool.query(
          `INSERT INTO stock_balances (warehouse_id, item_id, quantity)
           VALUES ($1, $2, $3)`,
          [warehouseId, item.itemId, item.quantity]
        );
      }
    }
    
    res.status(201).json({ id: receiptId, message: 'Goods receipt created successfully' });
  } catch (error) {
    console.error('Error creating goods receipt:', error);
    res.status(500).json({ error: 'Failed to create goods receipt' });
  }
});

export default router;
