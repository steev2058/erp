# ERP System Design Document - Phase 1

## 1. Introduction

This document outlines the design for Phase 1 of an Enterprise Resource Planning (ERP) system tailored for a manufacturing and distribution business. The system is designed to cover the full operational cycle, from sales planning to management reports, as specified by the provided workflow diagram and requirements. The primary goal is to create a non-generic ERP solution that precisely aligns with the business's unique operational flow, focusing on a modern web-based interface with multi-language support (Arabic RTL and English LTR).

## 2. System Architecture

### 2.1. Architectural Pattern

Considering the need for a comprehensive system in Phase 1 and the potential for future scalability, a **Modular Monolith** architecture is proposed [1] [2]. This approach allows for a single deployment unit initially, simplifying development and deployment, while enforcing clear module boundaries. Each module will be designed with high cohesion and low coupling, enabling independent development and testing. This structure provides a clear path for future evolution towards a microservices architecture if business needs dictate, by allowing individual modules to be extracted and deployed as separate services without a complete rewrite.

### 2.2. Technology Stack Suggestion

Based on the user's preferred technology suggestions, the following stack is recommended:

| Component | Technology | Rationale |
|---|---|---|
| **Backend** | Node.js/NestJS | Modern, scalable, and efficient for API development. NestJS provides a structured, enterprise-grade framework. |
| **Frontend** | React | Highly popular, component-based, and excellent for building complex, interactive user interfaces. |
| **Database** | PostgreSQL | Robust, open-source, and highly extensible, suitable for complex ERP data models and analytical queries. |
| **Reports** | SQL Views + PDF/Excel Export | Leverages the power of SQL for data aggregation and standard formats for easy sharing and analysis. |

## 3. ERP Modules

The ERP system will comprise the following core modules, designed to support the specified operational cycle:

### 3.1. User Management & Permissions

This module will manage all aspects of user access and authorization within the ERP system.

*   **Users**: Creation, management, and authentication of system users.
*   **Roles**: Definition of roles (e.g., Sales Manager, Production Planner, Warehouse Staff) with specific sets of permissions.
*   **Permissions**: Granular control over access to system functionalities and data.
*   **Approval Authorities**: Assignment of approval limits and hierarchies for various workflows.
*   **Department-based Access**: Restricting user access based on their assigned department.

### 3.2. Master Data

Centralized management of foundational data used across all ERP modules.

*   **Finished Products**: Details of products ready for sale.
*   **Raw Materials**: Information on materials used in production.
*   **Units**: Measurement units (e.g., kg, liters, pieces).
*   **Categories**: Classification of products and materials.
*   **Customers**: Customer profiles and contact information.
*   **Agents**: Agent details and their associated customers.
*   **Sales Representatives**: Sales representative profiles.
*   **Suppliers**: Supplier details and contact information.
*   **Regions**: Geographical regions for sales and distribution.
*   **Warehouses**: Main warehouses for finished goods and raw materials.
*   **Sales Representative Car Warehouses**: Inventory held by sales representatives.

### 3.3. Sales Module

Manages the entire sales process, from planning to invoicing.

*   **Long-term Sales Plan**: Strategic sales forecasts.
*   **Monthly Sales Plan**: Detailed monthly sales targets.
*   **Emergency Sales Plan**: Plans for unexpected sales opportunities or demands.
*   **Previous Sales Rates**: Historical sales data for analysis and forecasting.
*   **Monthly Sales Targets for Representatives**: Individual targets for sales personnel.
*   **Daily Sales Targets**: Daily breakdown of sales goals.
*   **Sales Invoices**: Generation and management of customer invoices.
*   **Customer/Agent Linkage**: Association of customers with specific agents.
*   **Sales Representative Performance**: Tracking and reporting on sales representative achievements.

### 3.4. Production Module

Oversees the manufacturing process, from planning to material requirements.

*   **Long-term Production Plan**: Strategic production forecasts.
*   **Monthly Production Program**: Detailed monthly production schedules.
*   **Weekly Production Program**: Weekly breakdown of production tasks.
*   **Manufacturing Models / Bill of Materials (BOM)**: Defines the components and quantities required to produce a finished product.
*   **Material Requirements Calculation**: Determines raw material needs based on production plans and BOMs.
*   **Production Approval Workflow**: Manages the approval process for production plans and programs.

### 3.5. Inventory / Warehouse Module

Manages all inventory movements and stock levels across various warehouses.

*   **Finished Goods Stock**: Inventory of completed products.
*   **Raw Materials Stock**: Inventory of materials for production.
*   **Representative Car Stock**: Inventory held by sales representatives in their vehicles.
*   **Stock Balances**: Real-time quantities of all items in each warehouse.
*   **Stock Movements**: Records of all incoming and outgoing inventory transactions.
*   **Delivery to Sales Representative**: Process for transferring stock from main warehouse to representative car warehouses.
*   **Receiving Raw Materials**: Process for receiving purchased raw materials into stock.
*   **Minimum and Maximum Stock Levels**: Defined thresholds for inventory quantities.
*   **Stock Shortage Alerts**: Notifications when stock levels fall below minimum thresholds.

### 3.6. Purchasing Module

Manages the procurement process, from planning to goods receipt.

*   **Long-term Purchase Plan**: Strategic purchasing forecasts.
*   **Monthly Purchase Plan**: Detailed monthly purchasing schedules.
*   **Monthly Purchase Requests**: Requests for purchasing specific raw materials or goods.
*   **Purchase Invoices**: Management of invoices from suppliers.
*   **Goods Receipt Notes**: Documentation of received goods.
*   **Supplier Linkage**: Association of materials with specific suppliers.
*   **Purchase Approval Workflow**: Manages the approval process for purchase plans and requests.

### 3.7. Approval Workflow

A centralized, configurable approval system will be implemented to manage various business processes [3] [4].

*   **Scope**: Sales plans, production plans, production programs, purchase plans, purchase requests, goods receipts, and sales invoices (if required).
*   **Statuses**: Draft, Pending Approval, Approved, Rejected, Cancelled, Completed.
*   **Mechanism**: A state machine pattern will be utilized to manage the transitions between approval statuses, ensuring robust and auditable workflows [5].

### 3.8. Reports & Dashboards

Comprehensive reporting and dashboard capabilities for management insights.

*   **Monthly Sales**: Overview of sales performance.
*   **Sales by Representative**: Performance metrics for individual sales representatives.
*   **Target vs Actual Sales**: Comparison of planned vs. actual sales figures.
*   **Finished Goods Stock**: Current inventory levels of finished products.
*   **Raw Material Stock**: Current inventory levels of raw materials.
*   **Stock Shortages**: Identification of critical stock deficiencies.
*   **Representative Car Stock**: Inventory levels in sales representative vehicles.
*   **Production Programs**: Status and progress of production schedules.
*   **Material Requirements**: Overview of material needs.
*   **Purchase Requests**: Status of outstanding purchase requests.
*   **Purchase Invoices**: Overview of supplier invoices.
*   **Goods Received**: Records of incoming goods.
*   **Management Overview Dashboard**: A consolidated view of key performance indicators (KPIs) across all modules.

## 4. Database ERD (Entity-Relationship Diagram)

The database schema will be designed to support the defined modules and business logic. The core entities and their relationships will be detailed in a separate ERD diagram. The following entities will form the foundation of the database:

*   `users`, `roles`, `permissions`, `role_permissions`
*   `regions`, `customers`, `sales_representatives`, `suppliers`
*   `units`, `item_categories`, `items`
*   `bill_of_materials`, `bill_of_material_items`
*   `warehouses`, `stock_balances`, `stock_movements`
*   `sales_plans`, `sales_plan_items`, `sales_targets`, `sales_target_items`, `daily_sales_targets`, `sales_invoices`, `sales_invoice_items`
*   `production_plans`, `production_plan_items`, `production_programs`, `production_program_items`, `material_requirements`, `material_requirement_items`
*   `purchase_plans`, `purchase_plan_items`, `purchase_requests`, `purchase_request_items`, `purchase_invoices`, `purchase_invoice_items`, `goods_receipts`, `goods_receipt_items`
*   `rep_deliveries`, `rep_delivery_items`
*   `approval_requests`, `approval_steps`

## 5. Main Screens and UI/UX Layout Proposal

The UI/UX design will prioritize a clean, professional, and business-oriented interface suitable for managers and employees, supporting both Arabic RTL and English LTR. A dashboard-first approach will be adopted.

### 5.1. General Design Principles

*   **Dashboard-First**: Upon login, users will see a personalized dashboard with key KPIs and quick access to relevant modules.
*   **Clean and Professional**: Modern aesthetic with intuitive navigation and minimal clutter.
*   **Multi-language Support**: Full support for Arabic (RTL) and English (LTR) layouts and content.
*   **Role-Based Views**: Screens and data presented will be tailored to the user's role and permissions.
*   **Color Indicators**: Use of color to highlight statuses (e.g., approval status, stock levels) for quick visual cues.
*   **Charts and KPI Cards**: Visual representation of data for management insights.

### 5.2. Screen Types per Module

Each module will typically include the following screen types:

*   **List Pages**: Displaying a list of records (e.g., Sales Invoices List, Raw Materials List) with filtering, sorting, and search capabilities.
*   **Create/Edit Pages**: Forms for creating new records or editing existing ones.
*   **Detail Pages**: Comprehensive view of a single record with all associated information.
*   **Approval Status**: Clear indication of the current approval status for relevant transactions.
*   **Export Options**: Ability to export data to formats like PDF or Excel.

### 5.3. Navigation

A clear navigation sidebar, grouped by modules, will provide easy access to all system functionalities. The navigation will be intuitive for non-technical users.

## 6. User Roles and Permissions

User roles will be defined to align with typical manufacturing and distribution business functions, ensuring appropriate access control and segregation of duties.

| Role | Key Responsibilities | Example Permissions |
|---|---|---|
| **System Administrator** | Full system configuration, user management, audit trails. | All permissions. |
| **Sales Manager** | Oversee sales plans, targets, representative performance. | Create/Approve Sales Plans, View Sales Reports. |
| **Sales Representative** | Manage daily sales, customer interactions, car stock. | Create Sales Invoices, View Daily Targets, Manage Rep Car Stock. |
| **Production Manager** | Oversee production plans, programs, BOMs. | Create/Approve Production Plans, View Material Requirements. |
| **Warehouse Manager** | Manage inventory, stock movements, goods receipts. | Adjust Stock, Confirm Goods Receipts, View Stock Balances. |
| **Purchasing Manager** | Oversee purchase plans, requests, supplier relations. | Create/Approve Purchase Plans, Manage Suppliers. |
| **Finance/Accounting** | Process invoices, financial reporting. | View Sales/Purchase Invoices, Generate Financial Reports. |

Permissions will be granular, allowing specific actions (e.g., `create`, `read`, `update`, `delete`, `approve`) on specific resources (e.g., `sales_plan`, `raw_material`, `purchase_invoice`). Approval authorities will be configured based on roles and potentially transaction values.

## 7. Inventory Movement Logic

The inventory movement logic will strictly adhere to the principle that no inventory quantity should be changed directly. Every stock change must be recorded as a `stock_movement` record, and only approved transactions will affect stock levels. This ensures a complete audit trail and data integrity.

### 7.1. Key Logic Flows

*   **Sales Plans → Production Requirements**: Sales plans will drive the calculation of production needs.
*   **Production Programs → Raw Material Needs**: Production programs, combined with Bill of Materials (BOMs), will determine the required raw materials.
*   **Material Requirements → Purchase Requirements**: Comparison of calculated material requirements with available raw material stock will trigger purchase requirements for shortages.
*   **Purchase Requests → Purchase Invoices**: Approved purchase requests will lead to the creation of purchase invoices.
*   **Purchase Invoices → Goods Receipts**: Receipt of goods against purchase invoices will generate goods receipt records.
*   **Goods Receipts → Raw Material Stock Increase**: Approved goods receipts will increase the raw material stock.
*   **Delivery to Sales Representative → Stock Transfer**: This action will decrease stock in the main warehouse and increase stock in the sales representative's car warehouse.
*   **Sales Invoices → Stock Reduction**: Approved sales invoices will reduce stock from either the sales representative's car warehouse or the finished goods warehouse, depending on the sales channel.

## 8. Main Reports

Reports will be generated using SQL views for efficiency and accuracy, with export options to PDF and Excel.

*   **Sales Reports**: Monthly Sales Summary, Sales by Representative, Target vs. Actual Sales.
*   **Inventory Reports**: Finished Goods Stock Report, Raw Material Stock Report, Stock Shortage Report, Representative Car Stock Report, Stock Movement History.
*   **Production Reports**: Production Program Status, Material Requirements Report.
*   **Purchasing Reports**: Purchase Request Status, Purchase Invoice Report, Goods Received Report.
*   **Management Dashboards**: Consolidated KPIs for overall business performance.

## 9. MVP Implementation Roadmap

Phase 1 will focus on delivering a Minimum Viable Product (MVP) that covers the core operational cycle. The roadmap will prioritize modules based on their criticality to the business workflow.

### 9.1. Key Milestones

1.  **Foundation Setup**: User Management, Master Data (basic entities), Core System Architecture.
2.  **Sales & Production Planning**: Long-term and Monthly Sales/Production Plans, BOMs.
3.  **Inventory Core**: Raw Material & Finished Goods Stock, Basic Stock Movements.
4.  **Purchasing Core**: Purchase Requests, Goods Receipts.
5.  **Sales Execution**: Sales Invoices, Delivery to Sales Representatives.
6.  **Approval Workflow Integration**: Implement approval flows for key transactions.
7.  **Reporting & Dashboards**: Initial set of critical reports and management dashboard.

## 10. Phase 1 Development Plan

This plan outlines the iterative development approach for Phase 1.

### 10.1. Iterative Development Sprints

*   **Sprint 1: Infrastructure & Core Master Data**: Setup development environment, implement User Management, and core Master Data entities (Users, Roles, Permissions, Customers, Suppliers, Items, Units, Categories, Warehouses).
*   **Sprint 2: Sales Planning & BOM**: Develop Long-term and Monthly Sales Plans, and Bill of Materials module.
*   **Sprint 3: Production Planning & Material Requirements**: Implement Production Plans, Production Programs, and Material Requirements Calculation.
*   **Sprint 4: Purchasing Workflow**: Develop Purchase Plans, Purchase Requests, and Goods Receipts.
*   **Sprint 5: Core Inventory & Sales Execution**: Implement Raw Material and Finished Goods Stock management, Stock Movements, Delivery to Sales Representatives, and Sales Invoices.
*   **Sprint 6: Approval Workflow & Basic Reports**: Integrate the centralized Approval Workflow across relevant modules and develop initial set of reports and dashboards.
*   **Sprint 7: UI/UX Refinement & Localization**: Focus on UI/UX polish, multi-language support (RTL/LTR), and user acceptance testing.

## 11. Improvements or Missing Components

While Phase 1 focuses on core functionalities, the following areas are identified for future consideration or as potential improvements:

*   **Advanced Forecasting**: Integration of machine learning for more accurate sales and production forecasting.
*   **Quality Management**: Module for quality control, inspections, and defect tracking.
*   **Maintenance Management**: Module for tracking and scheduling equipment maintenance.
*   **Financial Accounting Integration**: Deeper integration with general ledger, accounts payable, and accounts receivable.
*   **CRM Integration**: Enhanced customer relationship management features.
*   **Supplier Relationship Management (SRM)**: More robust supplier evaluation and management tools.
*   **Mobile Applications**: Dedicated mobile apps for sales representatives or warehouse staff.
*   **Offline Capabilities**: For sales representatives in areas with limited connectivity.

## 12. References

[1] Architecture Patterns That Actually Scale In 2026. (n.d.). *Medium*. <https://medium.com/@the_atomic_architect/architecture-patterns-that-actually-scale-in-2025-the-only-three-you-need-89d1488c60a7>
[2] Monolith vs Microservices vs Modular Monoliths: What's the ... (n.d.). *ByteByteGo*. <https://blog.bytebytego.com/p/monolith-vs-microservices-vs-modular>
[3] Workflow Engine vs. State Machine. (n.d.). *WorkflowEngine.io*. <https://workflowengine.io/blog/workflow-engine-vs-state-machine/>
[4] Simplifying Approval Process with State Machine. (n.d.). *Medium*. <https://medium.com/@wacsk19921002/simplifying-approval-process-with-state-machine-a-practical-guide-part-1-modeling-26d8999002b0>
[5] An introduction to state machines and the state pattern. (n.d.). *ShaggyDev*. <https://shaggydev.com/2021/11/01/state-machines-intro/>
