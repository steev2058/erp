# ERP System - Complete Setup Guide

## Quick Start (Development)

### 1. Prerequisites
- Node.js 18+ installed
- PostgreSQL 12+ installed and running
- pnpm package manager

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your database credentials
# Default PostgreSQL connection:
# DB_HOST=localhost
# DB_PORT=5432
# DB_USER=postgres
# DB_PASSWORD=postgres
# DB_NAME=erp_system
```

### 3. Database Setup

```bash
# Create PostgreSQL database
createdb erp_system

# Initialize schema and seed data
pnpm run db:migrate
```

### 4. Install Dependencies

```bash
pnpm install
```

### 5. Start Development Server

```bash
# This starts both backend and frontend in development mode
pnpm run dev

# Or run them separately:
# Terminal 1: Backend server (port 3001)
pnpm run dev:server

# Terminal 2: Frontend dev server (port 3000)
pnpm run dev:client
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/health

### 7. Default Login Credentials

```
Username: admin
Password: admin123
```

## Production Deployment

### Build for Production

```bash
pnpm run build
```

This creates:
- `dist/public/` - Compiled React frontend
- `dist/server/` - Compiled Node.js backend

### Start Production Server

```bash
NODE_ENV=production pnpm run start
```

## Docker Deployment (Optional)

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

COPY . .

RUN pnpm run build

ENV NODE_ENV=production
ENV PORT=3001

EXPOSE 3001

CMD ["pnpm", "run", "start"]
```

Build and run:

```bash
docker build -t erp-system .
docker run -p 3001:3001 -e DB_HOST=postgres -e DB_PASSWORD=postgres erp-system
```

## Database Management

### Create Admin User

```bash
# Run this in psql or your database client
INSERT INTO users (username, email, password_hash, full_name, is_active) 
VALUES ('admin', 'admin@erp.local', '$2a$10$...', 'Administrator', true);

-- Get the admin user ID and assign Admin role
INSERT INTO user_roles (user_id, role_id) 
SELECT 1, id FROM roles WHERE name = 'Admin';
```

### Reset Database

```bash
# Drop and recreate the database
dropdb erp_system
createdb erp_system
pnpm run db:migrate
```

## API Documentation

### Authentication Endpoints

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securepassword",
  "fullName": "John Doe"
}
```

#### Login
```bash
POST /api/auth/login
Content-Type: application/json

{
  "username": "john_doe",
  "password": "securepassword"
}

Response:
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "john_doe",
    "roles": ["Sales Manager"]
  }
}
```

#### Get Current User
```bash
GET /api/auth/me
Authorization: Bearer <token>
```

### Master Data Endpoints

#### List Items
```bash
GET /api/master-data/items
Authorization: Bearer <token>
```

#### Create Item
```bash
POST /api/master-data/items
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Product Name",
  "sku": "SKU-001",
  "categoryId": 1,
  "unitId": 1,
  "description": "Product description"
}
```

#### List Customers
```bash
GET /api/master-data/customers
Authorization: Bearer <token>
```

#### Create Customer
```bash
POST /api/master-data/customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Customer Name",
  "regionId": 1,
  "contactPerson": "John Smith",
  "email": "john@customer.com",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

### Sales Endpoints

#### List Invoices
```bash
GET /api/sales/invoices
Authorization: Bearer <token>
```

#### Create Invoice
```bash
POST /api/sales/invoices
Authorization: Bearer <token>
Content-Type: application/json

{
  "customerId": 1,
  "salesRepId": 1,
  "invoiceDate": "2025-05-11",
  "items": [
    {
      "itemId": 1,
      "quantity": 10,
      "unitPrice": 100
    }
  ]
}
```

### Inventory Endpoints

#### List Stock Balances
```bash
GET /api/inventory/stock-balances
Authorization: Bearer <token>
```

#### Record Stock Movement
```bash
POST /api/inventory/movements
Authorization: Bearer <token>
Content-Type: application/json

{
  "fromWarehouseId": 1,
  "toWarehouseId": 2,
  "itemId": 1,
  "quantity": 50,
  "movementType": "Transfer",
  "referenceDocument": "INV-001"
}
```

## Troubleshooting

### Database Connection Error

```
Error: connect ECONNREFUSED 127.0.0.1:5432
```

**Solution**: Ensure PostgreSQL is running
```bash
# macOS
brew services start postgresql

# Linux
sudo systemctl start postgresql

# Windows
net start PostgreSQL
```

### Port Already in Use

```
Error: listen EADDRINUSE: address already in use :::3001
```

**Solution**: Change the port in .env or kill the process
```bash
# Find and kill process on port 3001
lsof -ti:3001 | xargs kill -9
```

### Module Not Found

```
Error: Cannot find module '@server/...'
```

**Solution**: Ensure TypeScript paths are configured correctly in tsconfig.json

### CORS Errors

**Solution**: Update CORS_ORIGIN in .env to match your frontend URL

## Performance Optimization

### Enable Query Caching
```typescript
// In routes, add caching headers
res.set('Cache-Control', 'public, max-age=300');
```

### Database Indexing
Indexes are already created on frequently queried columns:
- users.username
- users.email
- customers.region_id
- items.category_id
- stock_balances.warehouse_id
- sales_invoices.status
- purchase_invoices.status

### Connection Pooling
PostgreSQL connection pool is configured with default settings. Adjust in `src/server/db/connection.ts`:

```typescript
const pool = new Pool({
  max: 20,  // Maximum connections
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## Security Best Practices

1. **Change JWT_SECRET** in production
2. **Use HTTPS** in production
3. **Set strong database passwords**
4. **Enable database backups**
5. **Use environment variables** for sensitive data
6. **Implement rate limiting** on API endpoints
7. **Regular security audits**

## Monitoring

### Check Server Health
```bash
curl http://localhost:3001/health
```

### View Logs
```bash
# Backend logs (if running with tsx watch)
# Frontend logs (browser console)
```

### Database Monitoring
```bash
# Connect to PostgreSQL
psql -U postgres -d erp_system

# Check table sizes
SELECT schemaname, tablename, pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) 
FROM pg_tables 
WHERE schemaname NOT IN ('pg_catalog', 'information_schema') 
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;
```

## Backup and Recovery

### Backup Database
```bash
pg_dump -U postgres erp_system > erp_backup.sql
```

### Restore Database
```bash
psql -U postgres erp_system < erp_backup.sql
```

## Support and Documentation

- **API Documentation**: See API endpoints above
- **Database Schema**: See `src/server/db/schema.sql`
- **Frontend Components**: See `src/client/components/`
- **Backend Routes**: See `src/server/routes/`

## Next Steps

1. Configure your database connection
2. Run database migrations
3. Create admin user
4. Start development server
5. Access http://localhost:3000
6. Login with admin credentials
7. Begin exploring the ERP system

For more information, refer to the main README.md file.
