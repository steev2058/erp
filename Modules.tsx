import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Modules() {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  const modules = [
    {
      id: "user-management",
      title: "User Management & Permissions",
      description: "Authentication, authorization, and access control",
      color: "from-blue-500 to-blue-600",
      items: [
        "Users - Creation, management, and authentication of system users",
        "Roles - Definition of roles with specific sets of permissions",
        "Permissions - Granular control over access to system functionalities",
        "Approval Authorities - Assignment of approval limits and hierarchies",
        "Department-based Access - Restricting user access by department"
      ]
    },
    {
      id: "master-data",
      title: "Master Data",
      description: "Foundational data used across all modules",
      color: "from-purple-500 to-purple-600",
      items: [
        "Finished Products - Details of products ready for sale",
        "Raw Materials - Information on materials used in production",
        "Units - Measurement units (kg, liters, pieces, etc.)",
        "Categories - Classification of products and materials",
        "Customers - Customer profiles and contact information",
        "Sales Representatives - Sales representative profiles",
        "Suppliers - Supplier details and contact information",
        "Regions - Geographical regions for sales and distribution",
        "Warehouses - Main warehouses and sales representative car warehouses"
      ]
    },
    {
      id: "sales",
      title: "Sales Module",
      description: "Sales planning, targeting, and invoicing",
      color: "from-green-500 to-green-600",
      items: [
        "Long-term Sales Plan - Strategic sales forecasts",
        "Monthly Sales Plan - Detailed monthly sales targets",
        "Emergency Sales Plan - Plans for unexpected opportunities",
        "Previous Sales Rates - Historical sales data for analysis",
        "Monthly Sales Targets - Individual targets for sales personnel",
        "Daily Sales Targets - Daily breakdown of sales goals",
        "Sales Invoices - Generation and management of customer invoices",
        "Customer/Agent Linkage - Association of customers with agents",
        "Sales Representative Performance - Tracking and reporting"
      ]
    },
    {
      id: "production",
      title: "Production Module",
      description: "Manufacturing planning and material requirements",
      color: "from-orange-500 to-orange-600",
      items: [
        "Long-term Production Plan - Strategic production forecasts",
        "Monthly Production Program - Detailed monthly production schedules",
        "Weekly Production Program - Weekly breakdown of production tasks",
        "Bill of Materials (BOM) - Components and quantities for products",
        "Material Requirements Calculation - Raw material needs based on BOMs",
        "Production Approval Workflow - Approval process for production plans"
      ]
    },
    {
      id: "inventory",
      title: "Inventory / Warehouse Module",
      description: "Stock management and warehouse operations",
      color: "from-cyan-500 to-cyan-600",
      items: [
        "Finished Goods Stock - Inventory of completed products",
        "Raw Materials Stock - Inventory of production materials",
        "Representative Car Stock - Inventory held by sales representatives",
        "Stock Balances - Real-time quantities in each warehouse",
        "Stock Movements - Records of all inventory transactions",
        "Delivery to Sales Representative - Stock transfers to rep vehicles",
        "Receiving Raw Materials - Process for receiving purchased materials",
        "Minimum/Maximum Stock Levels - Defined inventory thresholds",
        "Stock Shortage Alerts - Notifications for low inventory"
      ]
    },
    {
      id: "purchasing",
      title: "Purchasing Module",
      description: "Procurement and supplier management",
      color: "from-pink-500 to-pink-600",
      items: [
        "Long-term Purchase Plan - Strategic purchasing forecasts",
        "Monthly Purchase Plan - Detailed monthly purchasing schedules",
        "Monthly Purchase Requests - Requests for specific materials",
        "Purchase Invoices - Management of supplier invoices",
        "Goods Receipt Notes - Documentation of received goods",
        "Supplier Linkage - Association of materials with suppliers",
        "Purchase Approval Workflow - Approval process for purchases"
      ]
    },
    {
      id: "approval",
      title: "Approval Workflow",
      description: "Centralized approval system",
      color: "from-indigo-500 to-indigo-600",
      items: [
        "Scope - Sales plans, production plans, purchase plans, etc.",
        "Statuses - Draft, Pending Approval, Approved, Rejected, Cancelled, Completed",
        "State Machine Pattern - Robust workflow management",
        "Approval Steps - Multi-level approval hierarchies",
        "Audit Trail - Complete tracking of all approvals"
      ]
    },
    {
      id: "reports",
      title: "Reports & Dashboards",
      description: "Comprehensive reporting and analytics",
      color: "from-red-500 to-red-600",
      items: [
        "Monthly Sales - Overview of sales performance",
        "Sales by Representative - Performance metrics for individuals",
        "Target vs Actual Sales - Comparison of planned vs actual",
        "Finished Goods Stock - Current inventory levels",
        "Raw Material Stock - Current material inventory",
        "Stock Shortages - Identification of critical deficiencies",
        "Representative Car Stock - Inventory in rep vehicles",
        "Production Programs - Status and progress",
        "Material Requirements - Overview of material needs",
        "Purchase Requests - Status of outstanding requests",
        "Management Overview Dashboard - Consolidated KPIs"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link href="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">ERP Modules</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="text-lg text-slate-600">
            The ERP system comprises 8 core modules, each designed to support specific aspects of the operational cycle.
          </p>
        </div>

        {/* Modules List */}
        <div className="space-y-4">
          {modules.map((module) => (
            <Card 
              key={module.id}
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${module.color}`}></div>
                      <CardTitle>{module.title}</CardTitle>
                    </div>
                    <CardDescription>{module.description}</CardDescription>
                  </div>
                  <ChevronDown 
                    className={`w-5 h-5 text-slate-400 transition-transform ${expandedModule === module.id ? 'rotate-180' : ''}`}
                  />
                </div>
              </CardHeader>
              
              {expandedModule === module.id && (
                <CardContent>
                  <ul className="space-y-3">
                    {module.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-600 font-semibold mt-1">•</span>
                        <span className="text-slate-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              )}
            </Card>
          ))}
        </div>

        {/* Key Concepts */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Key Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Modular Design</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Each module is self-contained with clear boundaries, enabling independent development and testing while maintaining system cohesion.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Data Flow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Sales plans drive production requirements, which determine material needs, triggering purchase requests and inventory management.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Workflows</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Centralized approval system ensures all critical transactions go through proper authorization before affecting system state.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Every transaction is tracked with created_by and approved_by fields, ensuring complete accountability and compliance.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
