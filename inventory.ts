import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware, requireRole } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Stock Balances
router.get('/stock-balances', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT sb.id, w.name as warehouse, i.name as item, i.sku, sb.quantity, u.name as unit
      FROM stock_balances sb
      JOIN warehouses w ON sb.warehouse_id = w.id
      JOIN items i ON sb.item_id = i.id
      LEFT JOIN units u ON i.unit_id = u.id
      ORDER BY w.name, i.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching stock balances:', error);
    res.status(500).json({ error: 'Failed to fetch stock balances' });
  }
});

// Stock Movements
router.get('/movements', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT sm.id, 
             COALESCE(fw.name, 'External') as from_warehouse,
             COALESCE(tw.name, 'External') as to_warehouse,
             i.name as item, sm.quantity, sm.movement_type, sm.created_at
      FROM stock_movements sm
      LEFT JOIN warehouses fw ON sm.from_warehouse_id = fw.id
      LEFT JOIN warehouses tw ON sm.to_warehouse_id = tw.id
      JOIN items i ON sm.item_id = i.id
      ORDER BY sm.created_at DESC
      LIMIT 100
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching movements:', error);
    res.status(500).json({ error: 'Failed to fetch movements' });
  }
});

router.post('/movements', requireRole('Warehouse Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { fromWarehouseId, toWarehouseId, itemId, quantity, movementType, referenceDocument } = req.body;
    
    // Create movement
    const result = await pool.query(
      `INSERT INTO stock_movements (from_warehouse_id, to_warehouse_id, item_id, quantity, movement_type, reference_document, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [fromWarehouseId, toWarehouseId, itemId, quantity, movementType, referenceDocument, req.user?.userId]
    );
    
    // Update stock balances
    if (fromWarehouseId) {
      await pool.query(
        `UPDATE stock_balances SET quantity = quantity - $1, last_updated = CURRENT_TIMESTAMP
         WHERE warehouse_id = $2 AND item_id = $3`,
        [quantity, fromWarehouseId, itemId]
      );
    }
    
    if (toWarehouseId) {
      // Check if balance exists
      const existingBalance = await pool.query(
        'SELECT id FROM stock_balances WHERE warehouse_id = $1 AND item_id = $2',
        [toWarehouseId, itemId]
      );
      
      if (existingBalance.rows.length > 0) {
        await pool.query(
          `UPDATE stock_balances SET quantity = quantity + $1, last_updated = CURRENT_TIMESTAMP
           WHERE warehouse_id = $2 AND item_id = $3`,
          [quantity, toWarehouseId, itemId]
        );
      } else {
        await pool.query(
          `INSERT INTO stock_balances (warehouse_id, item_id, quantity)
           VALUES ($1, $2, $3)`,
          [toWarehouseId, itemId, quantity]
        );
      }
    }
    
    res.status(201).json({ id: result.rows[0].id, message: 'Movement recorded successfully' });
  } catch (error) {
    console.error('Error creating movement:', error);
    res.status(500).json({ error: 'Failed to create movement' });
  }
});

// Warehouses
router.get('/warehouses', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name, location, capacity, warehouse_type
      FROM warehouses
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching warehouses:', error);
    res.status(500).json({ error: 'Failed to fetch warehouses' });
  }
});

router.post('/warehouses', requireRole('Warehouse Manager', 'Admin'), async (req: Request, res: Response) => {
  try {
    const { name, location, capacity, warehouseType } = req.body;
    
    const result = await pool.query(
      `INSERT INTO warehouses (name, location, capacity, warehouse_type)
       VALUES ($1, $2, $3, $4)
       RETURNING id, name`,
      [name, location, capacity, warehouseType]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating warehouse:', error);
    res.status(500).json({ error: 'Failed to create warehouse' });
  }
});

export default router;
