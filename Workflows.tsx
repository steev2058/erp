import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, Clock, XCircle, AlertCircle } from "lucide-react";

export default function Workflows() {
  const statuses = [
    { name: "Draft", icon: AlertCircle, color: "text-slate-500", bg: "bg-slate-100" },
    { name: "Pending Approval", icon: Clock, color: "text-orange-500", bg: "bg-orange-100" },
    { name: "Approved", icon: CheckCircle2, color: "text-green-500", bg: "bg-green-100" },
    { name: "Rejected", icon: XCircle, color: "text-red-500", bg: "bg-red-100" },
    { name: "Cancelled", icon: XCircle, color: "text-slate-500", bg: "bg-slate-100" },
    { name: "Completed", icon: CheckCircle2, color: "text-blue-500", bg: "bg-blue-100" }
  ];

  const workflows = [
    {
      title: "Sales Plan Approval",
      description: "Workflow for approving long-term and monthly sales plans",
      steps: [
        "Sales Manager creates a sales plan (Draft)",
        "Plan is submitted for approval (Pending Approval)",
        "Director reviews and approves or rejects",
        "If approved, plan becomes active (Approved)",
        "Plan can be completed when period ends (Completed)"
      ]
    },
    {
      title: "Production Plan Approval",
      description: "Workflow for approving production plans and programs",
      steps: [
        "Production Manager creates production plan (Draft)",
        "Plan is submitted for approval (Pending Approval)",
        "Production Director reviews and approves",
        "Approved plan drives material requirements (Approved)",
        "Plan is marked completed when production finishes (Completed)"
      ]
    },
    {
      title: "Purchase Request Approval",
      description: "Workflow for approving purchase requests",
      steps: [
        "Warehouse Manager creates purchase request (Draft)",
        "Request is submitted for approval (Pending Approval)",
        "Purchasing Manager reviews and approves",
        "Approved request generates purchase order (Approved)",
        "Request is completed when goods are received (Completed)"
      ]
    },
    {
      title: "Sales Invoice Approval",
      description: "Workflow for approving sales invoices",
      steps: [
        "Sales Representative creates invoice (Draft)",
        "Invoice is submitted for approval (Pending Approval)",
        "Sales Manager reviews and approves",
        "Approved invoice reduces stock (Approved)",
        "Invoice is marked completed when payment received (Completed)"
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
          <h1 className="text-2xl font-bold text-slate-900">Approval Workflows</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Overview */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Centralized Approval System</h2>
          <Card className="border-2 border-indigo-200 bg-indigo-50">
            <CardHeader>
              <CardTitle>State Machine-Based Workflow</CardTitle>
              <CardDescription>Robust, auditable approval processes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-slate-700">
                The ERP system implements a centralized, configurable approval workflow using a state machine pattern. This ensures that all critical business transactions go through proper authorization before affecting system state.
              </p>
              <div className="mt-6">
                <h4 className="font-semibold text-slate-900 mb-4">Scope of Approval Workflows:</h4>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-700">Sales Plans (Long-term, Monthly, Emergency)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-700">Production Plans and Programs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-700">Purchase Plans and Requests</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-700">Goods Receipts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600"></span>
                    <span className="text-slate-700">Sales Invoices (if required)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Statuses */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Workflow Statuses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {statuses.map((status) => {
              const Icon = status.icon;
              return (
                <Card key={status.name}>
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`p-2 rounded-lg ${status.bg}`}>
                        <Icon className={`w-5 h-5 ${status.color}`} />
                      </div>
                      <h4 className="font-semibold text-slate-900">{status.name}</h4>
                    </div>
                    <p className="text-sm text-slate-600">
                      {status.name === "Draft" && "Document created but not submitted for approval"}
                      {status.name === "Pending Approval" && "Document submitted and awaiting approver review"}
                      {status.name === "Approved" && "Document approved and ready for execution"}
                      {status.name === "Rejected" && "Document rejected by approver, can be revised"}
                      {status.name === "Cancelled" && "Document cancelled and no longer active"}
                      {status.name === "Completed" && "Document execution completed"}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Workflow Examples */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Workflow Examples</h2>
          <div className="space-y-6">
            {workflows.map((workflow, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{workflow.title}</CardTitle>
                  <CardDescription>{workflow.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {workflow.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 font-semibold text-sm">
                          {stepIdx + 1}
                        </div>
                        <p className="text-slate-700 pt-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Multi-Level Approval</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Support for multi-level approval hierarchies based on user roles and transaction amounts.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Audit Trail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Complete tracking of all approval steps including approver, timestamp, and comments.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">State Machine Pattern</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Robust workflow management ensuring valid state transitions and preventing invalid operations.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Rejection & Revision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Rejected documents can be revised and resubmitted, maintaining a complete history of changes.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Approval Authorities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Configurable approval authorities based on roles, departments, and transaction values.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notifications</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Automatic notifications to approvers and document creators about workflow status changes.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
}
