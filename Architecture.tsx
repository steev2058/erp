import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, Database, Code2, Zap, Download } from "lucide-react";
import { exportSectionToPDF } from "@/lib/exportPDF";
import { useState } from "react";

export default function Architecture() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await exportSectionToPDF("arch-content", { filename: "Architecture", title: "System Architecture" });
    setIsExporting(false);
  };

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
            <h1 className="text-2xl font-bold text-slate-900">System Architecture</h1>
          </div>
          <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting} className="gap-2">
            <Download className="w-4 h-4" />
            {isExporting ? "Exporting..." : "Export PDF"}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12" id="arch-content">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Architectural Pattern</h2>
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                Modular Monolith
              </CardTitle>
              <CardDescription>Scalable, maintainable, and future-proof architecture</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                The ERP system employs a Modular Monolith architecture, which provides the best balance between simplicity and scalability for Phase 1 development. This approach allows for a single deployment unit while maintaining clear module boundaries and high cohesion.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Single Deployment</h4>
                  <p className="text-sm text-slate-600">Simplified deployment and operations for Phase 1</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Clear Boundaries</h4>
                  <p className="text-sm text-slate-600">Independent modules with low coupling</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-slate-900 mb-2">Microservices Ready</h4>
                  <p className="text-sm text-slate-600">Easy migration path for future scaling</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Technology Stack</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-purple-600" />
                  Backend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900">Node.js / NestJS</h4>
                  <p className="text-sm text-slate-600 mt-2">Modern, scalable, and efficient for API development. NestJS provides a structured, enterprise-grade framework.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  Frontend
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900">React 19</h4>
                  <p className="text-sm text-slate-600 mt-2">Highly popular, component-based, and excellent for building complex, interactive user interfaces.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="w-5 h-5 text-green-600" />
                  Database
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900">PostgreSQL</h4>
                  <p className="text-sm text-slate-600 mt-2">Robust, open-source, and highly extensible, suitable for complex ERP data models and analytical queries.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-orange-600" />
                  Reports
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900">SQL Views + PDF/Excel Export</h4>
                  <p className="text-sm text-slate-600 mt-2">Leverages the power of SQL for data aggregation and standard formats for easy sharing and analysis.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Module Structure */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Module Structure</h2>
          <div className="bg-white rounded-lg border border-slate-200 p-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center flex-shrink-0 font-bold">1</div>
                <div>
                  <h4 className="font-semibold text-slate-900">User Management & Permissions</h4>
                  <p className="text-sm text-slate-600 mt-1">Authentication, authorization, roles, and access control</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center flex-shrink-0 font-bold">2</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Master Data</h4>
                  <p className="text-sm text-slate-600 mt-1">Products, materials, customers, suppliers, warehouses, and other foundational data</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center flex-shrink-0 font-bold">3</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Sales Module</h4>
                  <p className="text-sm text-slate-600 mt-1">Sales planning, targets, invoicing, and performance tracking</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center flex-shrink-0 font-bold">4</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Production Module</h4>
                  <p className="text-sm text-slate-600 mt-1">Production planning, BOMs, and material requirements calculation</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-cyan-600 text-white flex items-center justify-center flex-shrink-0 font-bold">5</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Inventory / Warehouse</h4>
                  <p className="text-sm text-slate-600 mt-1">Stock management, movements, and warehouse operations</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center flex-shrink-0 font-bold">6</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Purchasing Module</h4>
                  <p className="text-sm text-slate-600 mt-1">Purchase planning, requests, invoicing, and goods receipt</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center flex-shrink-0 font-bold">7</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Approval Workflow</h4>
                  <p className="text-sm text-slate-600 mt-1">Centralized, configurable approval system using state machine pattern</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center flex-shrink-0 font-bold">8</div>
                <div>
                  <h4 className="font-semibold text-slate-900">Reports & Dashboards</h4>
                  <p className="text-sm text-slate-600 mt-1">Comprehensive reporting and KPI dashboards for management</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Principles */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Architectural Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">High Cohesion</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Each module contains all related functionality, making it self-contained and easy to understand.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Low Coupling</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">Modules communicate through well-defined interfaces, minimizing dependencies and enabling independent development.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Scalability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">The architecture supports growth from Phase 1 to future phases, with a clear path to microservices if needed.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Auditability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">All transactions are tracked with created_by and approved_by fields, ensuring complete audit trails.</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
