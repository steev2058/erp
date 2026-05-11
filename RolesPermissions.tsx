import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Shield, Users } from "lucide-react";

export default function RolesPermissions() {
  const roles = [
    {
      title: "System Administrator",
      responsibilities: "Full system configuration, user management, audit trails",
      permissions: ["All permissions"],
      color: "from-red-500 to-red-600"
    },
    {
      title: "Sales Manager",
      responsibilities: "Oversee sales plans, targets, representative performance",
      permissions: [
        "Create/Approve Sales Plans",
        "View Sales Reports",
        "Manage Sales Representatives",
        "Approve Sales Invoices",
        "View Sales Performance Metrics"
      ],
      color: "from-green-500 to-green-600"
    },
    {
      title: "Sales Representative",
      responsibilities: "Manage daily sales, customer interactions, car stock",
      permissions: [
        "Create Sales Invoices",
        "View Daily Targets",
        "Manage Rep Car Stock",
        "View Customer Information",
        "Submit Sales Data"
      ],
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Production Manager",
      responsibilities: "Oversee production plans, programs, BOMs",
      permissions: [
        "Create/Approve Production Plans",
        "View Material Requirements",
        "Manage BOMs",
        "Approve Production Programs",
        "View Production Reports"
      ],
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Warehouse Manager",
      responsibilities: "Manage inventory, stock movements, goods receipts",
      permissions: [
        "Adjust Stock",
        "Confirm Goods Receipts",
        "View Stock Balances",
        "Record Stock Movements",
        "Manage Warehouse Operations"
      ],
      color: "from-cyan-500 to-cyan-600"
    },
    {
      title: "Purchasing Manager",
      responsibilities: "Oversee purchase plans, requests, supplier relations",
      permissions: [
        "Create/Approve Purchase Plans",
        "Manage Purchase Requests",
        "Manage Suppliers",
        "Approve Purchase Invoices",
        "View Purchase Reports"
      ],
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Finance/Accounting",
      responsibilities: "Process invoices, financial reporting",
      permissions: [
        "View Sales Invoices",
        "View Purchase Invoices",
        "Generate Financial Reports",
        "View Financial Dashboards",
        "Export Financial Data"
      ],
      color: "from-purple-500 to-purple-600"
    }
  ];

  const permissionTypes = [
    {
      name: "Create",
      description: "Ability to create new records",
      icon: "✎"
    },
    {
      name: "Read",
      description: "Ability to view and access records",
      icon: "👁"
    },
    {
      name: "Update",
      description: "Ability to modify existing records",
      icon: "↻"
    },
    {
      name: "Delete",
      description: "Ability to delete records",
      icon: "✕"
    },
    {
      name: "Approve",
      description: "Ability to approve transactions",
      icon: "✓"
    },
    {
      name: "Export",
      description: "Ability to export data",
      icon: "↓"
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
          <h1 className="text-2xl font-bold text-slate-900">Roles & Permissions</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Access Control System</h2>
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                Role-Based Access Control (RBAC)
              </CardTitle>
              <CardDescription>Granular permissions and approval authorities</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                The ERP system implements a comprehensive role-based access control system that aligns with typical manufacturing and distribution business functions. This ensures appropriate access control and segregation of duties.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2">7</div>
                  <p className="text-sm text-slate-600">Core User Roles</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-blue-600 mb-2">50+</div>
                  <p className="text-sm text-slate-600">Granular Permissions</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-purple-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">Multi-level</div>
                  <p className="text-sm text-slate-600">Approval Hierarchies</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Permission Types */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Permission Types</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {permissionTypes.map((perm, idx) => (
              <Card key={idx}>
                <CardContent className="pt-6">
                  <div className="text-3xl mb-3">{perm.icon}</div>
                  <h4 className="font-semibold text-slate-900 mb-2">{perm.name}</h4>
                  <p className="text-sm text-slate-600">{perm.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* User Roles */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">User Roles & Responsibilities</h2>
          <div className="space-y-6">
            {roles.map((role, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${role.color}`}></div>
                        <CardTitle>{role.title}</CardTitle>
                      </div>
                      <CardDescription>{role.responsibilities}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-3">Example Permissions:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {role.permissions.map((perm, permIdx) => (
                        <div key={permIdx} className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                          <span className="text-slate-700 text-sm">{perm}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Access Control Features */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Access Control Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Granular Permissions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Specific actions (create, read, update, delete, approve) on specific resources (sales_plan, raw_material, purchase_invoice).
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Resource-level access control</li>
                  <li>• Action-based permissions</li>
                  <li>• Field-level visibility</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Authorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Configured based on roles, departments, and potentially transaction values.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Role-based approval limits</li>
                  <li>• Amount-based thresholds</li>
                  <li>• Multi-level hierarchies</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Department-Based Access</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Restricting user access based on their assigned department.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Department isolation</li>
                  <li>• Cross-department visibility</li>
                  <li>• Regional restrictions</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit & Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Complete tracking of user actions and access patterns.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• User activity logging</li>
                  <li>• Access history tracking</li>
                  <li>• Compliance reporting</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Segregation of Duties</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Prevents conflicts of interest by separating critical functions.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Creator vs Approver separation</li>
                  <li>• Receiver vs Payer separation</li>
                  <li>• Configurable rules</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Session Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">
                  Secure user session handling and authentication.
                </p>
                <ul className="space-y-2 text-sm text-slate-600">
                  <li>• Session timeout</li>
                  <li>• Multi-device management</li>
                  <li>• Password policies</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
