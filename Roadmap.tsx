import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Clock } from "lucide-react";

export default function Roadmap() {
  const sprints = [
    {
      number: 1,
      title: "Infrastructure & Core Master Data",
      duration: "Sprint 1",
      status: "planned",
      tasks: [
        "Setup development environment",
        "Implement User Management module",
        "Create core Master Data entities (Users, Roles, Permissions, Customers, Suppliers, Items, Units, Categories, Warehouses)",
        "Database schema setup",
        "Authentication & authorization framework"
      ]
    },
    {
      number: 2,
      title: "Sales Planning & BOM",
      duration: "Sprint 2",
      status: "planned",
      tasks: [
        "Develop Long-term and Monthly Sales Plans",
        "Implement Bill of Materials (BOM) module",
        "Create BOM management interfaces",
        "Sales plan approval workflow",
        "Basic sales reporting"
      ]
    },
    {
      number: 3,
      title: "Production Planning & Material Requirements",
      duration: "Sprint 3",
      status: "planned",
      tasks: [
        "Implement Production Plans and Programs",
        "Develop Material Requirements Calculation engine",
        "Create production approval workflows",
        "Material shortage detection",
        "Production reporting"
      ]
    },
    {
      number: 4,
      title: "Purchasing Workflow",
      duration: "Sprint 4",
      status: "planned",
      tasks: [
        "Develop Purchase Plans and Requests",
        "Implement Goods Receipt process",
        "Create purchase approval workflows",
        "Supplier management",
        "Purchase reporting"
      ]
    },
    {
      number: 5,
      title: "Core Inventory & Sales Execution",
      duration: "Sprint 5",
      status: "planned",
      tasks: [
        "Implement Raw Material and Finished Goods Stock management",
        "Develop Stock Movements tracking",
        "Create Delivery to Sales Representatives process",
        "Implement Sales Invoices",
        "Stock balance management"
      ]
    },
    {
      number: 6,
      title: "Approval Workflow & Basic Reports",
      duration: "Sprint 6",
      status: "planned",
      tasks: [
        "Integrate centralized Approval Workflow across modules",
        "Develop initial set of critical reports",
        "Create management dashboards",
        "Implement report export (PDF/Excel)",
        "Setup SQL views for reporting"
      ]
    },
    {
      number: 7,
      title: "UI/UX Refinement & Localization",
      duration: "Sprint 7",
      status: "planned",
      tasks: [
        "UI/UX polish and refinement",
        "Implement Arabic (RTL) and English (LTR) support",
        "User acceptance testing",
        "Performance optimization",
        "Security hardening"
      ]
    }
  ];

  const milestones = [
    {
      title: "Phase 1 MVP Complete",
      description: "All core modules implemented and integrated",
      date: "End of Sprint 7",
      color: "from-green-500 to-green-600"
    },
    {
      title: "User Acceptance Testing",
      description: "Stakeholder testing and feedback incorporation",
      date: "Sprints 6-7",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Production Deployment",
      description: "Phase 1 system goes live",
      date: "Post Sprint 7",
      color: "from-purple-500 to-purple-600"
    }
  ];

  const futureEnhancements = [
    "Advanced Forecasting with Machine Learning",
    "Quality Management Module",
    "Maintenance Management",
    "Financial Accounting Integration",
    "CRM Integration",
    "Supplier Relationship Management (SRM)",
    "Mobile Applications",
    "Offline Capabilities",
    "Real-time Notifications",
    "Advanced Analytics & BI"
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
          <h1 className="text-2xl font-bold text-slate-900">Development Roadmap</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Phase 1 Development Plan</h2>
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardHeader>
              <CardTitle>7 Iterative Development Sprints</CardTitle>
              <CardDescription>Comprehensive Phase 1 implementation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                Phase 1 will be delivered through 7 iterative sprints, each focusing on specific modules and features. This approach ensures regular deliverables, continuous feedback, and risk mitigation.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-blue-600 mb-2">7</div>
                  <p className="text-sm text-slate-600">Sprints</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-green-600 mb-2">8</div>
                  <p className="text-sm text-slate-600">Core Modules</p>
                </div>
                <div className="bg-white p-4 rounded-lg border border-blue-200">
                  <div className="text-2xl font-bold text-purple-600 mb-2">50+</div>
                  <p className="text-sm text-slate-600">Entities</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Sprints Timeline */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Sprint Timeline</h2>
          <div className="space-y-4">
            {sprints.map((sprint) => (
              <Card key={sprint.number} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {sprint.number}
                      </div>
                      <div>
                        <CardTitle>{sprint.title}</CardTitle>
                        <CardDescription>{sprint.duration}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-semibold text-orange-600">Planned</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {sprint.tasks.map((task, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-blue-600 font-bold mt-0.5">✓</span>
                        <span className="text-slate-700">{task}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Milestones */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {milestones.map((milestone, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${milestone.color} flex items-center justify-center`}>
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                    <CardTitle className="text-lg">{milestone.title}</CardTitle>
                  </div>
                  <CardDescription>{milestone.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-semibold text-slate-900">{milestone.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Success Criteria */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Phase 1 Success Criteria</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Functional Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">All 8 core modules fully implemented</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Complete operational cycle covered</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Approval workflows integrated</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Inventory audit trail complete</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quality Requirements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">User acceptance testing passed</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Multi-language support (Arabic/English)</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Performance benchmarks met</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-green-600 font-bold">✓</span>
                  <span className="text-slate-700">Security audit completed</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Future Enhancements */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Future Enhancements (Phase 2+)</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {futureEnhancements.map((enhancement, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                    <span className="text-blue-600 font-bold">→</span>
                    <span className="text-slate-700">{enhancement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
