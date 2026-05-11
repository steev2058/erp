import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Database, Zap, Users, BarChart3, Settings, Workflow, Search, Download } from "lucide-react";
import { useState } from "react";
import { exportPageToPDF } from "@/lib/exportPDF";

export default function Home() {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    await exportPageToPDF({ filename: "ERP-Home", title: "ERP Phase 1 Home" });
    setIsExporting(false);
  };

  const sections = [
    {
      title: "System Architecture",
      description: "Modular monolith design with scalable components and clear module boundaries",
      icon: Zap,
      href: "/architecture",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "ERP Modules",
      description: "Complete breakdown of all system modules from sales to purchasing",
      icon: Settings,
      href: "/modules",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Database Schema",
      description: "Entity-relationship diagrams and core database entities",
      icon: Database,
      href: "/database",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Approval Workflows",
      description: "State machine-based approval processes and workflow management",
      icon: Workflow,
      href: "/workflows",
      color: "from-orange-500 to-orange-600"
    },
    {
      title: "Roles & Permissions",
      description: "User roles, permissions, and access control specifications",
      icon: Users,
      href: "/roles-permissions",
      color: "from-pink-500 to-pink-600"
    },
    {
      title: "Reports & Dashboards",
      description: "Comprehensive reporting and KPI dashboard specifications",
      icon: BarChart3,
      href: "/reports",
      color: "from-cyan-500 to-cyan-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">ERP</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900">ERP Phase 1</h1>
              <p className="text-xs text-slate-500">System Specification</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#overview" className="text-sm text-slate-600 hover:text-slate-900 transition">Overview</a>
            <a href="#modules" className="text-sm text-slate-600 hover:text-slate-900 transition">Modules</a>
            <a href="#roadmap" className="text-sm text-slate-600 hover:text-slate-900 transition">Roadmap</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-2 hidden md:flex">
              <Search className="w-4 h-4" />
              <span className="text-xs text-slate-500">Cmd+K</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport} disabled={isExporting} className="gap-2">
              <Download className="w-4 h-4" />
              {isExporting ? "Exporting..." : "Export"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Manufacturing ERP System
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Phase 1 Specification
            </span>
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            A comprehensive, interactive system specification for a modern ERP platform designed specifically for manufacturing and distribution businesses. Covers the complete operational cycle from sales planning to management reporting.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/modules">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Explore Modules <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <Link href="/architecture">
              <Button size="lg" variant="outline">
                View Architecture
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
            <p className="text-slate-600">Core Modules</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="text-3xl font-bold text-purple-600 mb-2">50+</div>
            <p className="text-slate-600">Database Entities</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-slate-200">
            <div className="text-3xl font-bold text-green-600 mb-2">7</div>
            <p className="text-slate-600">User Roles</p>
          </div>
        </div>
      </section>

      {/* Modules Grid */}
      <section id="modules" className="container mx-auto px-4 py-16">
        <h3 className="text-3xl font-bold text-slate-900 mb-12">System Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link key={section.href} href={section.href}>
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${section.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{section.title}</CardTitle>
                    <CardDescription>{section.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="ghost" className="w-full justify-between group-hover:bg-blue-50">
                      Learn More
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Roadmap Preview */}
      <section id="roadmap" className="container mx-auto px-4 py-16 bg-white rounded-xl my-12 border border-slate-200">
        <h3 className="text-3xl font-bold text-slate-900 mb-8">Development Roadmap</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">7 Development Sprints</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">1.</span>
                <span className="text-slate-600">Infrastructure & Core Master Data</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">2.</span>
                <span className="text-slate-600">Sales Planning & BOM</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 font-bold">3.</span>
                <span className="text-slate-600">Production Planning & Material Requirements</span>
              </li>
            </ul>
          </div>
          <div>
            <Link href="/roadmap">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                View Full Roadmap <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-white mb-4">Documentation</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/architecture" className="hover:text-white transition">Architecture</Link></li>
                <li><Link href="/modules" className="hover:text-white transition">Modules</Link></li>
                <li><Link href="/database" className="hover:text-white transition">Database</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">System</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/workflows" className="hover:text-white transition">Workflows</Link></li>
                <li><Link href="/roles-permissions" className="hover:text-white transition">Roles</Link></li>
                <li><Link href="/reports" className="hover:text-white transition">Reports</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Planning</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/roadmap" className="hover:text-white transition">Roadmap</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">About</h4>
              <p className="text-sm">ERP Phase 1 System Specification for manufacturing and distribution businesses.</p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-sm text-center">
            <p>&copy; 2025 ERP System Specification. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
