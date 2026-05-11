import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Sales Performance Report
router.get('/sales-performance', async (req: Request, res: Response) => {
  try {
    const { startDate, endDate } = req.query;
    
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('month', si.invoice_date)::date as month,
        COUNT(si.id) as invoice_count,
        SUM(si.total_amount) as total_revenue,
        AVG(si.total_amount) as avg_invoice_amount
      FROM sales_invoices si
      WHERE si.status = 'Approved'
        AND si.invoice_date >= COALESCE($1::date, CURRENT_DATE - INTERVAL '12 months')
        AND si.invoice_date <= COALESCE($2::date, CURRENT_DATE)
      GROUP BY DATE_TRUNC('month', si.invoice_date)
      ORDER BY month DESC
    `, [startDate, endDate]);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching sales performance:', error);
    res.status(500).json({ error: 'Failed to fetch sales performance' });
  }
});

// Inventory Analysis Report
router.get('/inventory-analysis', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        w.name as warehouse,
        COUNT(sb.id) as total_items,
        SUM(sb.quantity) as total_quantity,
        COUNT(CASE WHEN sb.quantity = 0 THEN 1 END) as out_of_stock_items
      FROM stock_balances sb
      JOIN warehouses w ON sb.warehouse_id = w.id
      GROUP BY w.id, w.name
      ORDER BY w.name
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching inventory analysis:', error);
    res.status(500).json({ error: 'Failed to fetch inventory analysis' });
  }
});

// Customer Sales Report
router.get('/customer-sales', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        c.id,
        c.name as customer,
        COUNT(si.id) as total_invoices,
        SUM(si.total_amount) as total_spent,
        AVG(si.total_amount) as avg_invoice_amount,
        MAX(si.invoice_date) as last_purchase_date
      FROM customers c
      LEFT JOIN sales_invoices si ON c.id = si.customer_id AND si.status = 'Approved'
      GROUP BY c.id, c.name
      ORDER BY total_spent DESC NULLS LAST
      LIMIT 50
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customer sales report:', error);
    res.status(500).json({ error: 'Failed to fetch customer sales report' });
  }
});

// Supplier Performance Report
router.get('/supplier-performance', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        s.id,
        s.name as supplier,
        COUNT(pi.id) as total_invoices,
        SUM(pi.total_amount) as total_spent,
        AVG(pi.total_amount) as avg_invoice_amount,
        MAX(pi.invoice_date) as last_purchase_date
      FROM suppliers s
      LEFT JOIN purchase_invoices pi ON s.id = pi.supplier_id AND pi.status = 'Approved'
      GROUP BY s.id, s.name
      ORDER BY total_spent DESC NULLS LAST
      LIMIT 50
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching supplier performance:', error);
    res.status(500).json({ error: 'Failed to fetch supplier performance' });
  }
});

// Production Efficiency Report
router.get('/production-efficiency', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        pp.id,
        i.name as product,
        pp.quantity as planned_quantity,
        COUNT(ppi.id) as actual_items_produced,
        ROUND((COUNT(ppi.id)::numeric / pp.quantity) * 100, 2) as efficiency_percentage,
        pp.start_date,
        pp.end_date,
        pp.status
      FROM production_programs pp
      JOIN items i ON pp.item_id = i.id
      LEFT JOIN production_program_items ppi ON pp.id = ppi.production_program_id
      GROUP BY pp.id, i.name, pp.quantity, pp.start_date, pp.end_date, pp.status
      ORDER BY pp.start_date DESC
      LIMIT 50
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching production efficiency:', error);
    res.status(500).json({ error: 'Failed to fetch production efficiency' });
  }
});

// Dashboard Summary
router.get('/dashboard-summary', async (req: Request, res: Response) => {
  try {
    const [invoices, revenue, pendingApprovals, lowStock] = await Promise.all([
      pool.query('SELECT COUNT(*) as count FROM sales_invoices WHERE status = \'Approved\''),
      pool.query('SELECT COALESCE(SUM(total_amount), 0) as total FROM sales_invoices WHERE status = \'Approved\''),
      pool.query('SELECT COUNT(*) as count FROM approval_requests WHERE status = \'Pending\''),
      pool.query('SELECT COUNT(*) as count FROM stock_balances WHERE quantity < 10')
    ]);
    
    res.json({
      totalInvoices: invoices.rows[0].count,
      totalRevenue: revenue.rows[0].total,
      pendingApprovals: pendingApprovals.rows[0].count,
      lowStockItems: lowStock.rows[0].count
    });
  } catch (error) {
    console.error('Error fetching dashboard summary:', error);
    res.status(500).json({ error: 'Failed to fetch dashboard summary' });
  }
});

// Top Selling Items
router.get('/top-selling-items', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        i.id,
        i.name,
        i.sku,
        SUM(sii.quantity) as total_quantity_sold,
        SUM(sii.line_total) as total_revenue,
        COUNT(DISTINCT si.id) as number_of_sales
      FROM items i
      JOIN sales_invoice_items sii ON i.id = sii.item_id
      JOIN sales_invoices si ON sii.sales_invoice_id = si.id
      WHERE si.status = 'Approved'
      GROUP BY i.id, i.name, i.sku
      ORDER BY total_revenue DESC
      LIMIT 20
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching top selling items:', error);
    res.status(500).json({ error: 'Failed to fetch top selling items' });
  }
});

// Monthly Trend Report
router.get('/monthly-trends', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT 
        DATE_TRUNC('month', si.invoice_date)::date as month,
        COUNT(si.id) as invoices,
        SUM(si.total_amount) as revenue,
        COUNT(DISTINCT si.customer_id) as unique_customers
      FROM sales_invoices si
      WHERE si.status = 'Approved'
        AND si.invoice_date >= CURRENT_DATE - INTERVAL '12 months'
      GROUP BY DATE_TRUNC('month', si.invoice_date)
      ORDER BY month DESC
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching monthly trends:', error);
    res.status(500).json({ error: 'Failed to fetch monthly trends' });
  }
});

export default router;
