-- ERP HANA As-Is | SQL Schema v0.2 Operational Tables

CREATE TABLE sales_monthly_plans (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  plan_month DATE NOT NULL,
  product_id INT NOT NULL,
  avg_sales_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  planned_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  status NVARCHAR(30) NOT NULL DEFAULT 'draft', -- draft/pending/approved/rejected/locked
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  approved_by INT NULL,
  approved_at DATETIME2 NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id),
  FOREIGN KEY (approved_by) REFERENCES users_app(id)
);

CREATE TABLE sales_emergency_plans (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  request_date DATE NOT NULL,
  product_id INT NOT NULL,
  emergency_qty DECIMAL(18,3) NOT NULL,
  request_reason NVARCHAR(500) NOT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'draft',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  approved_by INT NULL,
  approved_at DATETIME2 NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id),
  FOREIGN KEY (approved_by) REFERENCES users_app(id)
);

CREATE TABLE boms (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  finished_product_id INT NOT NULL,
  raw_material_id INT NOT NULL,
  qty_per_unit DECIMAL(18,6) NOT NULL,
  is_active BIT NOT NULL DEFAULT 1,
  UNIQUE(finished_product_id, raw_material_id),
  FOREIGN KEY (finished_product_id) REFERENCES products(id),
  FOREIGN KEY (raw_material_id) REFERENCES products(id)
);

CREATE TABLE production_monthly_plans (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  plan_month DATE NOT NULL,
  product_id INT NOT NULL,
  suggested_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  approved_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  status NVARCHAR(30) NOT NULL DEFAULT 'draft',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  approved_by INT NULL,
  approved_at DATETIME2 NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id),
  FOREIGN KEY (approved_by) REFERENCES users_app(id)
);

CREATE TABLE stock_movements (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  movement_type NVARCHAR(30) NOT NULL, -- receipt/issue/transfer/delivery/sale
  product_id INT NOT NULL,
  from_warehouse_id INT NULL,
  to_warehouse_id INT NULL,
  qty DECIMAL(18,3) NOT NULL,
  reference_type NVARCHAR(50) NULL,
  reference_id BIGINT NULL,
  movement_time DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  created_by INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (from_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (to_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id)
);

CREATE TABLE purchase_requests (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  request_date DATE NOT NULL,
  supplier_id INT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'draft',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  approved_by INT NULL,
  approved_at DATETIME2 NULL,
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id),
  FOREIGN KEY (approved_by) REFERENCES users_app(id)
);

CREATE TABLE purchase_request_lines (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  purchase_request_id BIGINT NOT NULL,
  product_id INT NOT NULL,
  requested_qty DECIMAL(18,3) NOT NULL,
  FOREIGN KEY (purchase_request_id) REFERENCES purchase_requests(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE approvals_log (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  entity_type NVARCHAR(50) NOT NULL,
  entity_id BIGINT NOT NULL,
  line_id BIGINT NULL,
  action NVARCHAR(20) NOT NULL, -- approve/reject/return
  actor_user_id INT NOT NULL,
  action_time DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  notes NVARCHAR(500) NULL,
  FOREIGN KEY (actor_user_id) REFERENCES users_app(id)
);
