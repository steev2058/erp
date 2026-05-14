-- ERP HANA As-Is | SQL Schema v0.3 Document Tables

CREATE TABLE sales_invoices (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  invoice_no NVARCHAR(50) NOT NULL UNIQUE,
  invoice_date DATE NOT NULL,
  customer_id INT NOT NULL,
  sales_rep_id INT NULL,
  vehicle_warehouse_id INT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'posted',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (customer_id) REFERENCES customers_agents(id),
  FOREIGN KEY (sales_rep_id) REFERENCES sales_reps(id),
  FOREIGN KEY (vehicle_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id)
);

CREATE TABLE sales_invoice_lines (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  invoice_id BIGINT NOT NULL,
  product_id INT NOT NULL,
  qty DECIMAL(18,3) NOT NULL,
  unit_price DECIMAL(18,3) NOT NULL DEFAULT 0,
  line_total AS (qty * unit_price) PERSISTED,
  FOREIGN KEY (invoice_id) REFERENCES sales_invoices(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE purchase_invoices (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  invoice_no NVARCHAR(50) NOT NULL UNIQUE,
  invoice_date DATE NOT NULL,
  supplier_id INT NOT NULL,
  purchase_request_id BIGINT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'posted',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (supplier_id) REFERENCES suppliers(id),
  FOREIGN KEY (purchase_request_id) REFERENCES purchase_requests(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id)
);

CREATE TABLE purchase_invoice_lines (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  invoice_id BIGINT NOT NULL,
  product_id INT NOT NULL,
  qty DECIMAL(18,3) NOT NULL,
  unit_cost DECIMAL(18,3) NOT NULL DEFAULT 0,
  line_total AS (qty * unit_cost) PERSISTED,
  FOREIGN KEY (invoice_id) REFERENCES purchase_invoices(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE raw_material_receipt_notes (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  receipt_no NVARCHAR(50) NOT NULL UNIQUE,
  receipt_date DATE NOT NULL,
  purchase_invoice_id BIGINT NOT NULL,
  raw_warehouse_id INT NOT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'posted',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (purchase_invoice_id) REFERENCES purchase_invoices(id),
  FOREIGN KEY (raw_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id)
);

CREATE TABLE raw_material_receipt_lines (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  receipt_id BIGINT NOT NULL,
  product_id INT NOT NULL,
  received_qty DECIMAL(18,3) NOT NULL,
  FOREIGN KEY (receipt_id) REFERENCES raw_material_receipt_notes(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE rep_delivery_notes (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  note_no NVARCHAR(50) NOT NULL UNIQUE,
  note_date DATE NOT NULL,
  sales_rep_id INT NOT NULL,
  from_warehouse_id INT NOT NULL,
  to_vehicle_warehouse_id INT NOT NULL,
  status NVARCHAR(30) NOT NULL DEFAULT 'posted',
  created_by INT NOT NULL,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (sales_rep_id) REFERENCES sales_reps(id),
  FOREIGN KEY (from_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (to_vehicle_warehouse_id) REFERENCES warehouses(id),
  FOREIGN KEY (created_by) REFERENCES users_app(id)
);

CREATE TABLE rep_delivery_lines (
  id BIGINT IDENTITY(1,1) PRIMARY KEY,
  note_id BIGINT NOT NULL,
  product_id INT NOT NULL,
  delivered_qty DECIMAL(18,3) NOT NULL,
  FOREIGN KEY (note_id) REFERENCES rep_delivery_notes(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);
