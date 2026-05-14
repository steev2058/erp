-- ERP HANA As-Is | SQL Schema v0.1 (Initial)
-- SQL Server compatible draft

CREATE TABLE departments (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE roles (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE users_app (
  id INT IDENTITY(1,1) PRIMARY KEY,
  username NVARCHAR(100) NOT NULL UNIQUE,
  password_hash NVARCHAR(255) NOT NULL,
  display_name NVARCHAR(200) NOT NULL,
  department_id INT NOT NULL,
  is_active BIT NOT NULL DEFAULT 1,
  created_at DATETIME2 NOT NULL DEFAULT SYSDATETIME(),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);

CREATE TABLE user_roles (
  user_id INT NOT NULL,
  role_id INT NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users_app(id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

CREATE TABLE permissions (
  id INT IDENTITY(1,1) PRIMARY KEY,
  module_code NVARCHAR(50) NOT NULL,
  action_code NVARCHAR(20) NOT NULL, -- read/add/edit/delete/approve
  UNIQUE(module_code, action_code)
);

CREATE TABLE role_permissions (
  role_id INT NOT NULL,
  permission_id INT NOT NULL,
  PRIMARY KEY (role_id, permission_id),
  FOREIGN KEY (role_id) REFERENCES roles(id),
  FOREIGN KEY (permission_id) REFERENCES permissions(id)
);

CREATE TABLE approval_authorities (
  id INT IDENTITY(1,1) PRIMARY KEY,
  role_id INT NOT NULL,
  request_type NVARCHAR(50) NOT NULL,
  can_line_approve BIT NOT NULL DEFAULT 0,
  can_full_approve BIT NOT NULL DEFAULT 0,
  FOREIGN KEY (role_id) REFERENCES roles(id),
  UNIQUE(role_id, request_type)
);

-- Master Data (WBS-02)
CREATE TABLE products (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  category NVARCHAR(100) NOT NULL,
  unit NVARCHAR(50) NOT NULL,
  min_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  max_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE customers_agents (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  region NVARCHAR(100) NULL,
  classification NVARCHAR(100) NULL,
  contact_info NVARCHAR(300) NULL,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE sales_reps (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  region NVARCHAR(100) NULL,
  supervisor_name NVARCHAR(200) NULL,
  vehicle_no NVARCHAR(50) NULL,
  monthly_target_qty DECIMAL(18,3) NOT NULL DEFAULT 0,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE suppliers (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  contact_info NVARCHAR(300) NULL,
  payment_terms NVARCHAR(200) NULL,
  is_active BIT NOT NULL DEFAULT 1
);

CREATE TABLE warehouses (
  id INT IDENTITY(1,1) PRIMARY KEY,
  code NVARCHAR(50) NOT NULL UNIQUE,
  name_ar NVARCHAR(200) NOT NULL,
  warehouse_type NVARCHAR(50) NOT NULL, -- ready/raw/vehicle
  location_text NVARCHAR(200) NULL,
  keeper_name NVARCHAR(200) NULL,
  is_active BIT NOT NULL DEFAULT 1
);