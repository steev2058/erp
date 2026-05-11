# ERP System - Full Stack Implementation

A complete, production-ready ERP system for manufacturing and distribution businesses built with Node.js, React, PostgreSQL, and TypeScript.

## Features

### Core Modules

- **User Management**: Authentication, authorization, and role-based access control

- **Master Data**: Items, customers, suppliers, categories, units, regions

- **Sales Module**: Sales plans, targets, and invoicing

- **Production Module**: Production planning and bill of materials

- **Inventory Management**: Stock balances and warehouse management

- **Purchasing Module**: Purchase orders and supplier management

- **Approval Workflows**: State machine-based approval processes

- **Reports & Dashboards**: Comprehensive analytics and KPI tracking

### Technical Stack

- **Backend**: Node.js + Express + TypeScript

- **Frontend**: React 19 + Tailwind CSS

- **Database**: PostgreSQL with normalized schema

- **Authentication**: JWT-based with bcrypt password hashing

- **API**: RESTful API with role-based access control

## Prerequisites

- Node.js 18+

- PostgreSQL 12+

- npm or pnpm

## Installation

1. **Clone the repository**

```bash
cd /home/ubuntu/erp-full
```

1. **Install dependencies**

```bash
pnpm install
```

1. **Set up environment variables**

```bash
cp .env.example .env
# Edit .env with your database credentials
```

1. **Initialize the database**

```bash
pnpm run db:migrate
```

1. **Start the development server**

```bash
pnpm run dev
```

The application will be available at:

- Frontend: [http://localhost:3000](http://localhost:3000)

- Backend API: [http://localhost:3001/api](http://localhost:3001/api)

## Default Credentials

For testing purposes, use these credentials:

- **Username**: admin

- **Password**: admin123

## Project Structure

```
erp-full/
├── src/
│   ├── server/
│   │   ├── db/
│   │   │   ├── connection.ts
│   │   │   ├── schema.sql
│   │   │   └── init.ts
│   │   ├── auth/
│   │   │   ├── jwt.ts
│   │   │   └── password.ts
│   │   ├── middleware/
│   │   │   └── auth.ts
│   │   ├── routes/
│   │   │   ├── auth.ts
│   │   │   ├── master-data.ts
│   │   │   ├── sales.ts
│   │   │   └── inventory.ts
│   │   └── index.ts
│   └── client/
│       ├── pages/
│       ├── components/
│       ├── contexts/
│       ├── App.tsx
│       ├── main.tsx
│       └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user

- `POST /api/auth/login` - Login user

- `GET /api/auth/me` - Get current user

### Master Data

- `GET /api/master-data/items` - List items

- `POST /api/master-data/items` - Create item

- `GET /api/master-data/customers` - List customers

- `POST /api/master-data/customers` - Create customer

- `GET /api/master-data/suppliers` - List suppliers

- `POST /api/master-data/suppliers` - Create supplier

### Sales

- `GET /api/sales/invoices` - List sales invoices

- `POST /api/sales/invoices` - Create invoice

- `GET /api/sales/plans` - List sales plans

- `POST /api/sales/plans` - Create sales plan

### Inventory

- `GET /api/inventory/stock-balances` - List stock balances

- `GET /api/inventory/movements` - List stock movements

- `POST /api/inventory/movements` - Record stock movement

- `GET /api/inventory/warehouses` - List warehouses

## Database Schema

The system uses a normalized PostgreSQL schema with 50+ entities including:

- User management tables

- Master data tables

- Sales module tables

- Production module tables

- Inventory tables

- Purchasing tables

- Approval workflow tables

## Development

### Build for production

```bash
pnpm run build
```

### Type checking

```bash
pnpm run type-check
```

### Start production server

```bash
pnpm run start
```

## Security Considerations

- All passwords are hashed using bcrypt

- JWT tokens expire after 24 hours

- Role-based access control on all API endpoints

- SQL injection prevention through parameterized queries

- CORS configuration for cross-origin requests

## Future Enhancements

- [ ] Advanced reporting with charts and graphs

- [ ] Real-time notifications

- [ ] Mobile app support

- [ ] Multi-language support (Arabic/English )

- [ ] Audit logging

- [ ] Data export (PDF/Excel)

- [ ] Integration with third-party systems

- [ ] Advanced workflow automation

## License

MIT

## Support

For issues or questions, please refer to the project documentation or contact the development team.

