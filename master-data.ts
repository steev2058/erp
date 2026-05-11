import { Router, Request, Response } from 'express';
import pool from '../db/connection';
import { authMiddleware } from '../middleware/auth';

const router = Router();
router.use(authMiddleware);

// Items endpoints
router.get('/items', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT i.id, i.name, i.sku, i.description, ic.name as category, u.name as unit
      FROM items i
      LEFT JOIN item_categories ic ON i.category_id = ic.id
      LEFT JOIN units u ON i.unit_id = u.id
      WHERE i.is_active = true
      ORDER BY i.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

router.post('/items', async (req: Request, res: Response) => {
  try {
    const { name, sku, categoryId, unitId, description } = req.body;
    
    const result = await pool.query(
      `INSERT INTO items (name, sku, category_id, unit_id, description)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, sku, description`,
      [name, sku, categoryId, unitId, description]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Customers endpoints
router.get('/customers', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT c.id, c.name, c.email, c.phone, c.address, r.name as region
      FROM customers c
      LEFT JOIN regions r ON c.region_id = r.id
      ORDER BY c.name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching customers:', error);
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

router.post('/customers', async (req: Request, res: Response) => {
  try {
    const { name, regionId, contactPerson, email, phone, address } = req.body;
    
    const result = await pool.query(
      `INSERT INTO customers (name, region_id, contact_person, email, phone, address)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone`,
      [name, regionId, contactPerson, email, phone, address]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating customer:', error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// Suppliers endpoints
router.get('/suppliers', async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT id, name, email, phone, address, payment_terms
      FROM suppliers
      ORDER BY name
    `);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ error: 'Failed to fetch suppliers' });
  }
});

router.post('/suppliers', async (req: Request, res: Response) => {
  try {
    const { name, contactPerson, email, phone, address, paymentTerms } = req.body;
    
    const result = await pool.query(
      `INSERT INTO suppliers (name, contact_person, email, phone, address, payment_terms)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id, name, email, phone`,
      [name, contactPerson, email, phone, address, paymentTerms]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ error: 'Failed to create supplier' });
  }
});

// Regions endpoints
router.get('/regions', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, name, description FROM regions ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
});

// Categories endpoints
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, name, description FROM item_categories ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// Units endpoints
router.get('/units', async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT id, name, abbreviation FROM units ORDER BY name');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching units:', error);
    res.status(500).json({ error: 'Failed to fetch units' });
  }
});

export default router;
