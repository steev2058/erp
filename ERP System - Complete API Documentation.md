# ERP System - Complete API Documentation

## Base URL
```
http://localhost:3001/api
```

## Authentication

All endpoints (except `/auth/register` and `/auth/login`) require a Bearer token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Response Format

All responses are in JSON format:

### Success Response
```json
{
  "data": {},
  "message": "Success message"
}
```

### Error Response
```json
{
  "error": "Error message",
  "status": 400
}
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Create a new user account.

**Request Body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "fullName": "John Doe"
}
```

**Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "fullName": "John Doe"
  }
}
```

### Login
**POST** `/auth/login`

Authenticate user and get JWT token.

**Request Body:**
```json
{
  "username": "john_doe",
  "password": "securepassword123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "roles": ["Sales Manager", "Admin"]
  }
}
```

### Get Current User
**GET** `/auth/me`

Get current authenticated user information.

**Response:**
```json
{
  "id": 1,
  "username": "john_doe",
  "email": "john@example.com",
  "fullName": "John Doe",
  "roles": ["Sales Manager"]
}
```

---

## Master Data Endpoints

### Items

#### List Items
**GET** `/master-data/items`

Get all active items.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Product A",
    "sku": "SKU-001",
    "description": "Product description",
    "category": "Electronics",
    "unit": "Piece"
  }
]
```

#### Create Item
**POST** `/master-data/items`

Create a new item.

**Request Body:**
```json
{
  "name": "Product B",
  "sku": "SKU-002",
  "categoryId": 1,
  "unitId": 1,
  "description": "Product description"
}
```

**Response:**
```json
{
  "id": 2,
  "name": "Product B",
  "sku": "SKU-002",
  "description": "Product description"
}
```

### Customers

#### List Customers
**GET** `/master-data/customers`

Get all customers.

**Response:**
```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "email": "contact@acme.com",
    "phone": "+1234567890",
    "address": "123 Main St",
    "region": "North"
  }
]
```

#### Create Customer
**POST** `/master-data/customers`

Create a new customer.

**Request Body:**
```json
{
  "name": "Tech Solutions Inc",
  "regionId": 2,
  "contactPerson": "Jane Smith",
  "email": "jane@techsolutions.com",
  "phone": "+1987654321",
  "address": "456 Oak Ave"
}
```

### Suppliers

#### List Suppliers
**GET** `/master-data/suppliers`

Get all suppliers.

#### Create Supplier
**POST** `/master-data/suppliers`

Create a new supplier.

**Request Body:**
```json
{
  "name": "Global Supplies Ltd",
  "contactPerson": "Bob Wilson",
  "email": "bob@globalsupplies.com",
  "phone": "+1555555555",
  "address": "789 Industrial Blvd",
  "paymentTerms": "Net 30"
}
```

### Master Data Lists

#### Get Regions
**GET** `/master-data/regions`

#### Get Categories
**GET** `/master-data/categories`

#### Get Units
**GET** `/master-data/units`

---

## Sales Endpoints

### Sales Invoices

#### List Sales Invoices
**GET** `/sales/invoices`

Get all sales invoices.

**Response:**
```json
[
  {
    "id": 1,
    "invoice_number": "INV-1234567890",
    "customer": "Acme Corp",
    "total_amount": 5000,
    "status": "Approved",
    "invoice_date": "2025-05-11"
  }
]
```

#### Create Sales Invoice
**POST** `/sales/invoices`

Create a new sales invoice.

**Request Body:**
```json
{
  "customerId": 1,
  "salesRepId": 1,
  "invoiceDate": "2025-05-11",
  "items": [
    {
      "itemId": 1,
      "quantity": 10,
      "unitPrice": 500
    }
  ]
}
```

**Response:**
```json
{
  "id": 1,
  "message": "Invoice created successfully"
}
```

### Sales Plans

#### List Sales Plans
**GET** `/sales/plans`

Get all sales plans.

#### Create Sales Plan
**POST** `/sales/plans`

Create a new sales plan.

**Request Body:**
```json
{
  "planType": "Monthly",
  "periodStart": "2025-05-01",
  "periodEnd": "2025-05-31",
  "items": [
    {
      "itemId": 1,
      "quantity": 100,
      "unitPrice": 500
    }
  ]
}
```

### Sales Targets

#### List Sales Targets
**GET** `/sales/targets`

Get all sales targets.

---

## Inventory Endpoints

### Stock Balances

#### List Stock Balances
**GET** `/inventory/stock-balances`

Get current stock levels for all items in all warehouses.

**Response:**
```json
[
  {
    "id": 1,
    "warehouse": "Main Warehouse",
    "item": "Product A",
    "sku": "SKU-001",
    "quantity": 500,
    "unit": "Piece"
  }
]
```

### Stock Movements

#### List Stock Movements
**GET** `/inventory/movements`

Get all stock movements.

#### Record Stock Movement
**POST** `/inventory/movements`

Record a stock movement between warehouses.

**Request Body:**
```json
{
  "fromWarehouseId": 1,
  "toWarehouseId": 2,
  "itemId": 1,
  "quantity": 50,
  "movementType": "Transfer",
  "referenceDocument": "INV-001"
}
```

### Warehouses

#### List Warehouses
**GET** `/inventory/warehouses`

Get all warehouses.

#### Create Warehouse
**POST** `/inventory/warehouses`

Create a new warehouse.

**Request Body:**
```json
{
  "name": "Secondary Warehouse",
  "location": "Downtown",
  "capacity": 10000,
  "warehouseType": "Distribution"
}
```

---

## Purchasing Endpoints

### Purchase Plans

#### List Purchase Plans
**GET** `/purchasing/plans`

Get all purchase plans.

#### Create Purchase Plan
**POST** `/purchasing/plans`

Create a new purchase plan.

**Request Body:**
```json
{
  "planType": "Monthly",
  "periodStart": "2025-05-01",
  "periodEnd": "2025-05-31",
  "items": [
    {
      "itemId": 1,
      "supplierId": 1,
      "quantity": 100,
      "unitPrice": 100
    }
  ]
}
```

### Purchase Requests

#### List Purchase Requests
**GET** `/purchasing/requests`

Get all purchase requests.

#### Create Purchase Request
**POST** `/purchasing/requests`

Create a new purchase request.

### Purchase Invoices

#### List Purchase Invoices
**GET** `/purchasing/invoices`

Get all purchase invoices.

#### Create Purchase Invoice
**POST** `/purchasing/invoices`

Create a new purchase invoice.

**Request Body:**
```json
{
  "supplierId": 1,
  "invoiceDate": "2025-05-11",
  "items": [
    {
      "itemId": 1,
      "quantity": 100,
      "unitPrice": 100
    }
  ]
}
```

### Goods Receipts

#### List Goods Receipts
**GET** `/purchasing/goods-receipts`

Get all goods receipts.

#### Create Goods Receipt
**POST** `/purchasing/goods-receipts`

Record goods receipt and update stock.

**Request Body:**
```json
{
  "purchaseInvoiceId": 1,
  "warehouseId": 1,
  "receiptDate": "2025-05-11",
  "items": [
    {
      "itemId": 1,
      "quantity": 100
    }
  ]
}
```

---

## Approval Workflow Endpoints

### Pending Approvals

#### Get Pending Approvals
**GET** `/approvals/pending`

Get all pending approvals for current user.

**Response:**
```json
[
  {
    "id": 1,
    "document_type": "sales_invoice",
    "document_id": 1,
    "status": "Pending",
    "created_by": "john_doe",
    "step_order": 1,
    "created_at": "2025-05-11T10:00:00Z"
  }
]
```

### Approval Requests

#### List Approval Requests
**GET** `/approvals/requests`

Get all approval requests.

#### Create Approval Request
**POST** `/approvals/requests`

Create a new approval request.

**Request Body:**
```json
{
  "documentType": "sales_invoice",
  "documentId": 1,
  "approverIds": [2, 3]
}
```

### Approve/Reject Steps

#### Approve Step
**POST** `/approvals/approve/:stepId`

Approve an approval step.

**Request Body:**
```json
{
  "comments": "Approved as requested"
}
```

#### Reject Step
**POST** `/approvals/reject/:stepId`

Reject an approval step.

**Request Body:**
```json
{
  "comments": "Needs revision"
}
```

### Approval History

#### Get Approval History
**GET** `/approvals/history/:requestId`

Get approval history for a specific request.

---

## Reports Endpoints

### Sales Performance
**GET** `/reports/sales-performance`

Get sales performance metrics.

**Query Parameters:**
- `startDate` (optional): YYYY-MM-DD
- `endDate` (optional): YYYY-MM-DD

### Inventory Analysis
**GET** `/reports/inventory-analysis`

Get inventory analysis by warehouse.

### Customer Sales
**GET** `/reports/customer-sales`

Get sales metrics by customer.

### Supplier Performance
**GET** `/reports/supplier-performance`

Get purchase metrics by supplier.

### Production Efficiency
**GET** `/reports/production-efficiency`

Get production efficiency metrics.

### Dashboard Summary
**GET** `/reports/dashboard-summary`

Get dashboard summary statistics.

**Response:**
```json
{
  "totalInvoices": 45,
  "totalRevenue": 225000,
  "pendingApprovals": 3,
  "lowStockItems": 5
}
```

### Top Selling Items
**GET** `/reports/top-selling-items`

Get top 20 best-selling items.

### Monthly Trends
**GET** `/reports/monthly-trends`

Get monthly sales trends for the past 12 months.

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently, no rate limiting is implemented. It is recommended to add rate limiting in production.

## CORS

CORS is enabled for all origins by default. Configure `CORS_ORIGIN` in `.env` for production.

## Pagination

Pagination is not yet implemented. Most endpoints return all records. Consider adding pagination for large datasets.

---

## Example Usage

### Complete Workflow Example

1. **Register and Login**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

2. **Get Dashboard Summary**
```bash
curl -X GET http://localhost:3001/api/reports/dashboard-summary \
  -H "Authorization: Bearer <token>"
```

3. **List Customers**
```bash
curl -X GET http://localhost:3001/api/master-data/customers \
  -H "Authorization: Bearer <token>"
```

4. **Create Sales Invoice**
```bash
curl -X POST http://localhost:3001/api/sales/invoices \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": 1,
    "salesRepId": 1,
    "invoiceDate": "2025-05-11",
    "items": [{"itemId": 1, "quantity": 10, "unitPrice": 500}]
  }'
```

---

## Support

For issues or questions about the API, please refer to the README.md or contact the development team.
