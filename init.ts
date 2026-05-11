import pool from './connection';
import fs from 'fs';
import path from 'path';

async function initializeDatabase() {
  try {
    console.log('Initializing database schema...');
    
    const schemaPath = path.join(process.cwd(), 'src/server/db/schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    
    // Split by semicolon and execute each statement
    const statements = schema
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      await pool.query(statement);
    }
    
    console.log('✓ Database schema initialized successfully');
    
    // Create default roles
    await pool.query(`
      INSERT INTO roles (name, description) VALUES
      ('Admin', 'System Administrator'),
      ('Sales Manager', 'Manages sales plans and targets'),
      ('Production Manager', 'Manages production plans'),
      ('Warehouse Manager', 'Manages inventory and warehouse'),
      ('Purchasing Manager', 'Manages purchase orders'),
      ('Sales Representative', 'Creates and manages sales'),
      ('Accountant', 'Manages financial records'),
      ('Viewer', 'Read-only access')
      ON CONFLICT (name) DO NOTHING;
    `);
    
    console.log('✓ Default roles created');
    
    // Create default permissions
    const permissions = [
      { name: 'create_sales_plan', resource: 'sales_plan', action: 'create' },
      { name: 'read_sales_plan', resource: 'sales_plan', action: 'read' },
      { name: 'update_sales_plan', resource: 'sales_plan', action: 'update' },
      { name: 'approve_sales_plan', resource: 'sales_plan', action: 'approve' },
      { name: 'create_production_plan', resource: 'production_plan', action: 'create' },
      { name: 'read_production_plan', resource: 'production_plan', action: 'read' },
      { name: 'update_production_plan', resource: 'production_plan', action: 'update' },
      { name: 'approve_production_plan', resource: 'production_plan', action: 'approve' },
      { name: 'create_purchase_request', resource: 'purchase_request', action: 'create' },
      { name: 'read_purchase_request', resource: 'purchase_request', action: 'read' },
      { name: 'approve_purchase_request', resource: 'purchase_request', action: 'approve' },
      { name: 'manage_inventory', resource: 'inventory', action: 'manage' },
      { name: 'view_reports', resource: 'reports', action: 'view' },
      { name: 'manage_users', resource: 'users', action: 'manage' },
    ];
    
    for (const perm of permissions) {
      await pool.query(
        `INSERT INTO permissions (name, description, resource, action) 
         VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING`,
        [perm.name, perm.name, perm.resource, perm.action]
      );
    }
    
    console.log('✓ Default permissions created');
    
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

initializeDatabase().then(() => {
  console.log('Database initialization complete');
  process.exit(0);
}).catch(err => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});
