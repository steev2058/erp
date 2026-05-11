export interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: string;
  path: string;
  content: string;
}

export const searchIndex: SearchResult[] = [
  // Architecture
  {
    id: "arch-modular",
    title: "Modular Monolith",
    description: "Scalable, maintainable, and future-proof architecture",
    category: "Architecture",
    path: "/architecture",
    content: "modular monolith architecture single deployment clear boundaries microservices ready"
  },
  {
    id: "arch-nodejs",
    title: "Node.js / NestJS Backend",
    description: "Modern, scalable, and efficient for API development",
    category: "Architecture",
    path: "/architecture",
    content: "nodejs nestjs backend framework api development"
  },
  {
    id: "arch-react",
    title: "React 19 Frontend",
    description: "Component-based and excellent for building complex interfaces",
    category: "Architecture",
    path: "/architecture",
    content: "react frontend component-based user interface"
  },
  {
    id: "arch-postgresql",
    title: "PostgreSQL Database",
    description: "Robust, open-source, and highly extensible",
    category: "Architecture",
    path: "/architecture",
    content: "postgresql database relational data model"
  },

  // Modules
  {
    id: "mod-user",
    title: "User Management & Permissions",
    description: "Authentication, authorization, and access control",
    category: "Modules",
    path: "/modules",
    content: "user management authentication authorization permissions roles access control"
  },
  {
    id: "mod-master",
    title: "Master Data",
    description: "Foundational data used across all modules",
    category: "Modules",
    path: "/modules",
    content: "master data products materials customers suppliers units categories"
  },
  {
    id: "mod-sales",
    title: "Sales Module",
    description: "Sales planning, targeting, and invoicing",
    category: "Modules",
    path: "/modules",
    content: "sales planning targets invoices representatives performance"
  },
  {
    id: "mod-production",
    title: "Production Module",
    description: "Manufacturing planning and material requirements",
    category: "Modules",
    path: "/modules",
    content: "production planning programs bill of materials bom material requirements"
  },
  {
    id: "mod-inventory",
    title: "Inventory / Warehouse Module",
    description: "Stock management and warehouse operations",
    category: "Modules",
    path: "/modules",
    content: "inventory warehouse stock management movements balances"
  },
  {
    id: "mod-purchasing",
    title: "Purchasing Module",
    description: "Procurement and supplier management",
    category: "Modules",
    path: "/modules",
    content: "purchasing procurement suppliers purchase orders goods receipt"
  },
  {
    id: "mod-approval",
    title: "Approval Workflow",
    description: "Centralized approval system",
    category: "Modules",
    path: "/modules",
    content: "approval workflow state machine draft pending approved rejected"
  },
  {
    id: "mod-reports",
    title: "Reports & Dashboards",
    description: "Comprehensive reporting and analytics",
    category: "Modules",
    path: "/modules",
    content: "reports dashboards analytics kpi metrics performance"
  },

  // Database
  {
    id: "db-user",
    title: "User Management Entities",
    description: "Users, roles, and permissions structure",
    category: "Database",
    path: "/database",
    content: "users roles permissions entities relationships"
  },
  {
    id: "db-master",
    title: "Master Data Entities",
    description: "Foundational entities and relationships",
    category: "Database",
    path: "/database",
    content: "master data entities customers suppliers items categories"
  },
  {
    id: "db-sales",
    title: "Sales Module Entities",
    description: "Sales planning and invoicing entities",
    category: "Database",
    path: "/database",
    content: "sales entities plans targets invoices"
  },
  {
    id: "db-production",
    title: "Production Module Entities",
    description: "Production planning and material requirements",
    category: "Database",
    path: "/database",
    content: "production entities plans programs materials requirements"
  },
  {
    id: "db-inventory",
    title: "Inventory & Warehouse Entities",
    description: "Stock and warehouse management entities",
    category: "Database",
    path: "/database",
    content: "inventory warehouse stock entities movements"
  },

  // Workflows
  {
    id: "wf-sales",
    title: "Sales Plan Approval",
    description: "Workflow for approving long-term and monthly sales plans",
    category: "Workflows",
    path: "/workflows",
    content: "sales plan approval workflow draft pending approved"
  },
  {
    id: "wf-production",
    title: "Production Plan Approval",
    description: "Workflow for approving production plans and programs",
    category: "Workflows",
    path: "/workflows",
    content: "production plan approval workflow"
  },
  {
    id: "wf-purchase",
    title: "Purchase Request Approval",
    description: "Workflow for approving purchase requests",
    category: "Workflows",
    path: "/workflows",
    content: "purchase request approval workflow"
  },
  {
    id: "wf-invoice",
    title: "Sales Invoice Approval",
    description: "Workflow for approving sales invoices",
    category: "Workflows",
    path: "/workflows",
    content: "sales invoice approval workflow"
  },

  // Reports
  {
    id: "rep-sales",
    title: "Sales Reports",
    description: "Sales performance and metrics",
    category: "Reports",
    path: "/reports",
    content: "sales reports monthly performance targets actual"
  },
  {
    id: "rep-inventory",
    title: "Inventory Reports",
    description: "Stock levels and movements",
    category: "Reports",
    path: "/reports",
    content: "inventory reports stock levels movements shortages"
  },
  {
    id: "rep-production",
    title: "Production Reports",
    description: "Production planning and execution",
    category: "Reports",
    path: "/reports",
    content: "production reports planning execution efficiency"
  },
  {
    id: "rep-purchasing",
    title: "Purchasing Reports",
    description: "Purchase orders and supplier performance",
    category: "Reports",
    path: "/reports",
    content: "purchasing reports suppliers orders invoices"
  },

  // Roles
  {
    id: "role-admin",
    title: "System Administrator",
    description: "Full system configuration and user management",
    category: "Roles",
    path: "/roles-permissions",
    content: "system administrator full permissions configuration"
  },
  {
    id: "role-sales",
    title: "Sales Manager",
    description: "Oversee sales plans and representative performance",
    category: "Roles",
    path: "/roles-permissions",
    content: "sales manager permissions plans targets"
  },
  {
    id: "role-production",
    title: "Production Manager",
    description: "Oversee production plans and BOMs",
    category: "Roles",
    path: "/roles-permissions",
    content: "production manager permissions plans programs"
  },
  {
    id: "role-warehouse",
    title: "Warehouse Manager",
    description: "Manage inventory and stock movements",
    category: "Roles",
    path: "/roles-permissions",
    content: "warehouse manager permissions inventory stock"
  },
  {
    id: "role-purchasing",
    title: "Purchasing Manager",
    description: "Oversee purchase plans and supplier relations",
    category: "Roles",
    path: "/roles-permissions",
    content: "purchasing manager permissions purchase orders"
  },

  // Roadmap
  {
    id: "road-sprint1",
    title: "Sprint 1: Infrastructure & Core Master Data",
    description: "Setup development environment and core modules",
    category: "Roadmap",
    path: "/roadmap",
    content: "sprint 1 infrastructure master data users roles"
  },
  {
    id: "road-sprint2",
    title: "Sprint 2: Sales Planning & BOM",
    description: "Sales plans and bill of materials",
    category: "Roadmap",
    path: "/roadmap",
    content: "sprint 2 sales planning bom"
  },
  {
    id: "road-sprint3",
    title: "Sprint 3: Production Planning",
    description: "Production plans and material requirements",
    category: "Roadmap",
    path: "/roadmap",
    content: "sprint 3 production planning material requirements"
  },
  {
    id: "road-sprint4",
    title: "Sprint 4: Purchasing Workflow",
    description: "Purchase plans and goods receipt",
    category: "Roadmap",
    path: "/roadmap",
    content: "sprint 4 purchasing workflow"
  },
  {
    id: "road-sprint5",
    title: "Sprint 5: Inventory & Sales Execution",
    description: "Stock management and sales invoices",
    category: "Roadmap",
    path: "/roadmap",
    content: "sprint 5 inventory sales execution"
  },
];

export function searchContent(query: string): SearchResult[] {
  if (!query.trim()) return [];

  const lowerQuery = query.toLowerCase();
  return searchIndex
    .filter((item) => {
      const titleMatch = item.title.toLowerCase().includes(lowerQuery);
      const descMatch = item.description.toLowerCase().includes(lowerQuery);
      const contentMatch = item.content.toLowerCase().includes(lowerQuery);
      return titleMatch || descMatch || contentMatch;
    })
    .sort((a, b) => {
      // Prioritize title matches
      const aTitle = a.title.toLowerCase().includes(lowerQuery);
      const bTitle = b.title.toLowerCase().includes(lowerQuery);
      if (aTitle && !bTitle) return -1;
      if (!aTitle && bTitle) return 1;
      return 0;
    });
}
