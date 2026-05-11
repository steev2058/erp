import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Database, Download } from "lucide-react";
import { InteractiveERD, ERDDiagram } from "@/components/InteractiveERD";
import { exportSectionToPDF } from "@/lib/exportPDF";

export default function DatabasePage() {
  const entityGroups = [
    {
      title: "User Management",
      color: "from-blue-500 to-blue-600",
      entities: ["users", "roles", "permissions", "role_permissions", "user_roles"]
    },
    {
      title: "Master Data",
      color: "from-purple-500 to-purple-600",
      entities: ["regions", "customers", "sales_representatives", "suppliers", "units", "item_categories", "items"]
    },
    {
      title: "Bill of Materials",
      color: "from-green-500 to-green-600",
      entities: ["bill_of_materials", "bill_of_material_items"]
    },
    {
      title: "Inventory & Warehouse",
      color: "from-cyan-500 to-cyan-600",
      entities: ["warehouses", "stock_balances", "stock_movements", "rep_deliveries", "rep_delivery_items"]
    },
    {
      title: "Sales",
      color: "from-orange-500 to-orange-600",
      entities: ["sales_plans", "sales_plan_items", "sales_targets", "sales_target_items", "daily_sales_targets", "sales_invoices", "sales_invoice_items"]
    },
    {
      title: "Production",
      color: "from-pink-500 to-pink-600",
      entities: ["production_plans", "production_plan_items", "production_programs", "production_program_items", "material_requirements", "material_requirement_items"]
    },
    {
      title: "Purchasing",
      color: "from-indigo-500 to-indigo-600",
      entities: ["purchase_plans", "purchase_plan_items", "purchase_requests", "purchase_request_items", "purchase_invoices", "purchase_invoice_items", "goods_receipts", "goods_receipt_items"]
    },
    {
      title: "Approval Workflow",
      color: "from-red-500 to-red-600",
      entities: ["approval_requests", "approval_steps"]
    }
  ];

  const erdDiagrams: ERDDiagram[] = [
    {
      title: "User Management ERD",
      description: "Users, roles, and permissions structure",
      entities: [
        {
          name: "users",
          fields: ["id", "username", "email", "password_hash", "full_name", "department_id", "is_active", "created_at"],
          relationships: ["has many: user_roles", "belongs to: departments"]
        },
        {
          name: "roles",
          fields: ["id", "name", "description", "created_at"],
          relationships: ["has many: role_permissions", "has many: user_roles"]
        },
        {
          name: "permissions",
          fields: ["id", "name", "description", "resource", "action"],
          relationships: ["has many: role_permissions"]
        },
        {
          name: "user_roles",
          fields: ["user_id", "role_id", "assigned_at"],
          relationships: ["belongs to: users", "belongs to: roles"]
        },
        {
          name: "role_permissions",
          fields: ["role_id", "permission_id"],
          relationships: ["belongs to: roles", "belongs to: permissions"]
        }
      ]
    },
    {
      title: "Master Data ERD",
      description: "Foundational entities and relationships",
      entities: [
        {
          name: "items",
          fields: ["id", "name", "sku", "category_id", "unit_id", "description", "is_active"],
          relationships: ["belongs to: item_categories", "belongs to: units", "has many: bill_of_material_items"]
        },
        {
          name: "item_categories",
          fields: ["id", "name", "description"],
          relationships: ["has many: items"]
        },
        {
          name: "customers",
          fields: ["id", "name", "region_id", "contact_person", "email", "phone", "address"],
          relationships: ["belongs to: regions", "has many: sales_invoices"]
        },
        {
          name: "suppliers",
          fields: ["id", "name", "contact_person", "email", "phone", "address", "payment_terms"],
          relationships: ["has many: purchase_invoices"]
        },
        {
          name: "regions",
          fields: ["id", "name", "description"],
          relationships: ["has many: customers", "has many: sales_representatives"]
        }
      ]
    },
    {
      title: "Sales Module ERD",
      description: "Sales planning and invoicing entities",
      entities: [
        {
          name: "sales_plans",
          fields: ["id", "plan_type", "period_start", "period_end", "status", "created_by", "approved_by"],
          relationships: ["has many: sales_plan_items", "has many: sales_targets"]
        },
        {
          name: "sales_plan_items",
          fields: ["id", "sales_plan_id", "item_id", "quantity", "unit_price"],
          relationships: ["belongs to: sales_plans", "belongs to: items"]
        },
        {
          name: "sales_targets",
          fields: ["id", "sales_plan_id", "sales_rep_id", "target_amount", "target_quantity"],
          relationships: ["belongs to: sales_plans", "belongs to: sales_representatives"]
        },
        {
          name: "sales_invoices",
          fields: ["id", "customer_id", "sales_rep_id", "invoice_date", "total_amount", "status", "created_by"],
          relationships: ["belongs to: customers", "belongs to: sales_representatives", "has many: sales_invoice_items"]
        },
        {
          name: "sales_invoice_items",
          fields: ["id", "sales_invoice_id", "item_id", "quantity", "unit_price", "line_total"],
          relationships: ["belongs to: sales_invoices", "belongs to: items"]
        }
      ]
    },
    {
      title: "Production Module ERD",
      description: "Production planning and material requirements",
      entities: [
        {
          name: "production_plans",
          fields: ["id", "plan_type", "period_start", "period_end", "status", "created_by", "approved_by"],
          relationships: ["has many: production_plan_items", "has many: production_programs"]
        },
        {
          name: "production_plan_items",
          fields: ["id", "production_plan_id", "item_id", "quantity", "scheduled_date"],
          relationships: ["belongs to: production_plans", "belongs to: items"]
        },
        {
          name: "bill_of_materials",
          fields: ["id", "finished_item_id", "version", "is_active", "created_at"],
          relationships: ["belongs to: items", "has many: bill_of_material_items"]
        },
        {
          name: "bill_of_material_items",
          fields: ["id", "bom_id", "raw_material_id", "quantity", "unit_id"],
          relationships: ["belongs to: bill_of_materials", "belongs to: items", "belongs to: units"]
        },
        {
          name: "material_requirements",
          fields: ["id", "production_plan_id", "raw_material_id", "total_required", "available_stock"],
          relationships: ["belongs to: production_plans", "belongs to: items"]
        }
      ]
    },
    {
      title: "Inventory & Warehouse ERD",
      description: "Stock and warehouse management entities",
      entities: [
        {
          name: "warehouses",
          fields: ["id", "name", "location", "capacity", "warehouse_type"],
          relationships: ["has many: stock_balances", "has many: stock_movements"]
        },
        {
          name: "stock_balances",
          fields: ["id", "warehouse_id", "item_id", "quantity", "last_updated"],
          relationships: ["belongs to: warehouses", "belongs to: items"]
        },
        {
          name: "stock_movements",
          fields: ["id", "from_warehouse_id", "to_warehouse_id", "item_id", "quantity", "movement_type", "reference_document", "created_by"],
          relationships: ["belongs to: warehouses", "belongs to: items"]
        },
        {
          name: "rep_deliveries",
          fields: ["id", "sales_rep_id", "delivery_date", "total_items", "created_by"],
          relationships: ["belongs to: sales_representatives", "has many: rep_delivery_items"]
        },
        {
          name: "rep_delivery_items",
          fields: ["id", "rep_delivery_id", "item_id", "quantity"],
          relationships: ["belongs to: rep_deliveries", "belongs to: items"]
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-4 h-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Database Schema</h1>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => exportSectionToPDF("database-content", { filename: "Database-Schema", title: "Database Schema" })}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" id="database-content">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Entity-Relationship Model</h2>
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5 text-blue-600" />
                Database Design
              </CardTitle>
              <CardDescription>PostgreSQL with normalized schema</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                The database schema is designed to support all ERP modules with a focus on data integrity, performance, and auditability. The schema follows normalization principles to minimize data redundancy while maintaining query efficiency.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
                  <p className="text-sm text-slate-600">Core Entities</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2">100+</div>
                  <p className="text-sm text-slate-600">Attributes</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">Complex</div>
                  <p className="text-sm text-slate-600">Relationships</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Entity Groups */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Entity Groups</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {entityGroups.map((group, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${group.color}`}></div>
                    <CardTitle className="text-lg">{group.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {group.entities.map((entity, entityIdx) => (
                      <li key={entityIdx} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span>
                        <code className="text-sm bg-slate-100 px-2 py-1 rounded text-slate-700">{entity}</code>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Interactive ERD Diagrams */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Interactive ERD Diagrams</h2>
          <div className="space-y-8">
            {erdDiagrams.map((diagram, idx) => (
              <InteractiveERD key={idx} diagram={diagram} />
            ))}
          </div>
        </section>

        {/* Key Design Principles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Design Principles</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Normalization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  The schema follows third normal form (3NF) to minimize data redundancy and ensure data consistency across all entities.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All transactional entities include created_by, created_at, updated_by, and updated_at fields for complete audit tracking.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Foreign Key Relationships</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Strong referential integrity through foreign keys ensures data consistency and prevents orphaned records.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Status Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  All workflow entities include status fields (Draft, Pending Approval, Approved, Rejected, Cancelled, Completed) for state management.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Inventory Movements</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Stock movements are recorded as immutable transactions with reference to source documents, ensuring complete inventory audit trail.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
