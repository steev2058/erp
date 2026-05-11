import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, BarChart3, TrendingUp, Package, Truck, Users } from "lucide-react";

export default function Reports() {
  const reportCategories = [
    {
      title: "Sales Reports",
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      reports: [
        "Monthly Sales - Overview of sales performance by period",
        "Sales by Representative - Individual performance metrics",
        "Target vs Actual Sales - Comparison of planned vs achieved",
        "Sales Trend Analysis - Historical trends and forecasts",
        "Customer Sales History - Sales by customer over time"
      ]
    },
    {
      title: "Inventory Reports",
      icon: Package,
      color: "from-cyan-500 to-cyan-600",
      reports: [
        "Finished Goods Stock - Current inventory levels",
        "Raw Material Stock - Material inventory status",
        "Stock Shortages - Items below minimum levels",
        "Representative Car Stock - Inventory in rep vehicles",
        "Stock Movement History - Complete transaction log",
        "Stock Valuation - Inventory value by item"
      ]
    },
    {
      title: "Production Reports",
      icon: BarChart3,
      color: "from-orange-500 to-orange-600",
      reports: [
        "Production Programs - Status and progress",
        "Material Requirements - Overview of material needs",
        "Production Schedule - Timeline and milestones",
        "BOM Utilization - Material usage vs requirements",
        "Production Efficiency - Output vs planned capacity"
      ]
    },
    {
      title: "Purchasing Reports",
      icon: Truck,
      color: "from-pink-500 to-pink-600",
      reports: [
        "Purchase Requests - Status of outstanding requests",
        "Purchase Invoices - Supplier invoice overview",
        "Goods Received - Records of incoming goods",
        "Supplier Performance - Delivery and quality metrics",
        "Purchase Spend - Spending by supplier and category"
      ]
    },
    {
      title: "User & Approval Reports",
      icon: Users,
      color: "from-purple-500 to-purple-600",
      reports: [
        "Approval Workflow Status - Pending and completed approvals",
        "User Activity Log - User actions and transactions",
        "Approval Audit Trail - Complete approval history",
        "Department Performance - Metrics by department",
        "Role-Based Access Report - User permissions overview"
      ]
    }
  ];

  const dashboards = [
    {
      title: "Management Overview Dashboard",
      description: "Consolidated view of key performance indicators across all modules",
      kpis: [
        "Total Monthly Sales",
        "Production Completion Rate",
        "Inventory Turnover",
        "Stock Shortage Count",
        "Pending Approvals",
        "Supplier On-Time Delivery Rate"
      ]
    },
    {
      title: "Sales Manager Dashboard",
      description: "Sales-focused metrics and performance tracking",
      kpis: [
        "Sales vs Target",
        "Representative Performance",
        "Monthly Sales Trend",
        "Top Customers",
        "Sales by Region",
        "Pending Sales Approvals"
      ]
    },
    {
      title: "Production Manager Dashboard",
      description: "Production planning and execution metrics",
      kpis: [
        "Production Schedule Status",
        "Material Requirements vs Available",
        "Production Efficiency",
        "Pending Production Approvals",
        "BOM Utilization",
        "Production Bottlenecks"
      ]
    },
    {
      title: "Warehouse Manager Dashboard",
      description: "Inventory and warehouse operations metrics",
      kpis: [
        "Stock Levels by Category",
        "Stock Shortages",
        "Inventory Movements",
        "Warehouse Utilization",
        "Goods Receipt Status",
        "Delivery to Reps Status"
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
          <h1 className="text-2xl font-bold text-slate-900">Reports & Dashboards</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Reporting & Analytics</h2>
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-red-600" />
                Comprehensive Reporting System
              </CardTitle>
              <CardDescription>SQL Views + PDF/Excel Export</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                The ERP system provides comprehensive reporting and dashboard capabilities for management insights. All reports are generated using SQL views for efficiency and accuracy, with export options to PDF and Excel formats.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-red-600 mb-2">20+</div>
                  <p className="text-sm text-slate-600">Standard Reports</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-orange-600 mb-2">5</div>
                  <p className="text-sm text-slate-600">Role-Based Dashboards</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="text-2xl font-bold text-yellow-600 mb-2">Real-time</div>
                  <p className="text-sm text-slate-600">Data Updates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Report Categories */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Report Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reportCategories.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Card key={idx} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {category.reports.map((report, reportIdx) => (
                        <li key={reportIdx} className="flex items-start gap-2">
                          <span className="text-blue-600 font-semibold mt-0.5">•</span>
                          <span className="text-slate-700 text-sm">{report}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Dashboards */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Role-Based Dashboards</h2>
          <div className="space-y-6">
            {dashboards.map((dashboard, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{dashboard.title}</CardTitle>
                  <CardDescription>{dashboard.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {dashboard.kpis.map((kpi, kpiIdx) => (
                      <div key={kpiIdx} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                        <p className="text-sm font-semibold text-slate-900">{kpi}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Export & Distribution */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Export & Distribution</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Export Formats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                  <span className="text-slate-700">PDF - Professional formatted reports</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-600"></span>
                  <span className="text-slate-700">Excel - Spreadsheet format for analysis</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                  <span className="text-slate-700">CSV - Data interchange format</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scheduling & Distribution</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                  <span className="text-slate-700">Scheduled Reports - Automated generation</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                  <span className="text-slate-700">Email Distribution - Automatic delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-600"></span>
                  <span className="text-slate-700">Dashboard Sharing - Role-based access</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
