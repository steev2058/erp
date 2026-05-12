import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, AlertTriangle, Factory, TrendingUp, Save, Sparkles } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlanningData, savePlanningData, type PlanRow, type PlanningPayload } from "@/lib/planningApi";

function NumberInput({ value, onChange, disabled = false }: { value: number; onChange: (v: number) => void; disabled?: boolean }) {
  return <input type="number" value={value} disabled={disabled} onChange={(e) => onChange(Number(e.target.value || 0))} className="w-full rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm shadow-sm disabled:bg-slate-100" />;
}

function StatusBadge({ approved }: { approved: boolean }) {
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${approved ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{approved ? "معتمد" : "قيد المراجعة"}</span>;
}

export default function ExcelPlans() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [month, setMonth] = useState("2026-05");

  const [monthlyRows, setMonthlyRows] = useState<PlanRow[]>([]);
  const [emergencyRows, setEmergencyRows] = useState<PlanRow[]>([]);
  const [productionRows, setProductionRows] = useState<PlanRow[]>([]);

  const [monthlyApproved, setMonthlyApproved] = useState(false);
  const [emergencyApproved, setEmergencyApproved] = useState(false);
  const [productionApproved, setProductionApproved] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await getPlanningData();
      setMonth(data.month);
      setMonthlyRows(data.monthly);
      setEmergencyRows(data.emergency);
      setProductionRows(data.production);
      setMonthlyApproved(data.status.monthlyApproved);
      setEmergencyApproved(data.status.emergencyApproved);
      setProductionApproved(data.status.productionApproved);
      setLoading(false);
    })();
  }, []);

  const monthlyTotal = useMemo(() => monthlyRows.reduce((s, r) => s + r.planned, 0), [monthlyRows]);
  const emergencyTotal = useMemo(() => emergencyRows.reduce((s, r) => s + r.planned, 0), [emergencyRows]);
  const productionTotal = useMemo(() => productionRows.reduce((s, r) => s + (r.approved ?? 0), 0), [productionRows]);
  const shortageRisk = useMemo(() => Math.max(0, monthlyTotal + emergencyTotal - productionTotal), [monthlyTotal, emergencyTotal, productionTotal]);

  const comparisonData = useMemo(() => [
    { name: "البيع الشهري", value: monthlyTotal },
    { name: "البيع الطارئ", value: emergencyTotal },
    { name: "التصنيع المعتمد", value: productionTotal }
  ], [monthlyTotal, emergencyTotal, productionTotal]);

  const mixData = useMemo(() => {
    const grouped = new Map<string, number>();
    productionRows.forEach((r) => grouped.set(r.group, (grouped.get(r.group) || 0) + (r.approved ?? 0)));
    return Array.from(grouped.entries()).map(([name, value]) => ({ name, value }));
  }, [productionRows]);

  const saveAll = async () => {
    setSaving(true);
    const payload: PlanningPayload = {
      month,
      status: { monthlyApproved, emergencyApproved, productionApproved },
      monthly: monthlyRows,
      emergency: emergencyRows,
      production: productionRows,
    };
    await savePlanningData(payload);
    setSaving(false);
  };

  if (loading) return <div dir="rtl" className="min-h-screen flex items-center justify-center text-slate-500">جاري تحميل لوحة التخطيط...</div>;

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 py-4">
          <div>
            <h1 className="text-2xl font-bold flex items-center gap-2"><Sparkles className="h-5 w-5 text-cyan-300"/>Hana ERP Planning Command Center</h1>
            <p className="text-sm text-slate-300">تصميم احترافي شامل + تحليلات فورية بأسلوب Power BI</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-sm" />
            <Button onClick={saveAll} className="gap-2"><Save className="h-4 w-4"/>{saving ? "جارٍ الحفظ..." : "حفظ التحديثات"}</Button>
            <Link href="/docs"><Button variant="outline" size="sm"><ArrowLeft className="ml-2 h-4 w-4"/>التوثيق</Button></Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-6 py-6">
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="bg-slate-900/70 border-slate-700"><CardContent className="pt-6"><p className="text-slate-300 text-sm">إجمالي البيع الشهري</p><p className="text-3xl font-bold text-cyan-300">{monthlyTotal}</p></CardContent></Card>
          <Card className="bg-slate-900/70 border-slate-700"><CardContent className="pt-6"><p className="text-slate-300 text-sm">إجمالي البيع الطارئ</p><p className="text-3xl font-bold text-indigo-300">{emergencyTotal}</p></CardContent></Card>
          <Card className="bg-slate-900/70 border-slate-700"><CardContent className="pt-6"><p className="text-slate-300 text-sm">إجمالي التصنيع المعتمد</p><p className="text-3xl font-bold text-emerald-300">{productionTotal}</p></CardContent></Card>
          <Card className="bg-slate-900/70 border-slate-700"><CardContent className="pt-6"><p className="text-slate-300 text-sm">مؤشر خطر العجز</p><p className={`text-3xl font-bold ${shortageRisk > 0 ? "text-rose-300" : "text-emerald-300"}`}>{shortageRisk}</p></CardContent></Card>
        </section>

        <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2 bg-slate-900/70 border-slate-700">
            <CardHeader><CardTitle className="text-slate-100 flex items-center gap-2"><TrendingUp className="h-5 w-5 text-cyan-300"/>مقارنة مؤشرات التخطيط</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" stroke="#cbd5e1" />
                  <YAxis stroke="#cbd5e1" />
                  <Tooltip />
                  <Bar dataKey="value" radius={[8, 8, 0, 0]} fill="#22d3ee" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="bg-slate-900/70 border-slate-700">
            <CardHeader><CardTitle className="text-slate-100 flex items-center gap-2"><Factory className="h-5 w-5 text-emerald-300"/>Mix التصنيع</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={mixData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {mixData.map((_, i) => <Cell key={i} fill={["#22d3ee", "#818cf8", "#34d399", "#f59e0b"][i % 4]} />)}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </section>

        <PlanCard title="خطة البيع الشهرية" description="القيم الافتراضية من Avg Sales" approved={monthlyApproved} onApprove={() => setMonthlyApproved(true)} total={monthlyTotal}>
          <TableMonthly rows={monthlyRows} locked={monthlyApproved} onChange={setMonthlyRows} />
        </PlanCard>

        <PlanCard title="خطة البيع الطارئة" description="طلب مفاجئ - موافقة سريعة" approved={emergencyApproved} onApprove={() => setEmergencyApproved(true)} total={emergencyTotal}>
          <TableEmergency rows={emergencyRows} locked={emergencyApproved} onChange={setEmergencyRows} />
        </PlanCard>

        <PlanCard title="خطة التصنيع الشهرية" description="القيم الافتراضية من Avg Sales - Inventory" approved={productionApproved} onApprove={() => setProductionApproved(true)} total={productionTotal}>
          <TableProduction rows={productionRows} locked={productionApproved} onChange={setProductionRows} />
        </PlanCard>

        <Card className="bg-slate-900/70 border-slate-700">
          <CardContent className="py-4 text-sm text-slate-300 flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-amber-300"/>المرحلة الجاية: ربط live مع SQL Views وWorkflow approvals متعدد المستويات.</CardContent>
        </Card>
      </main>
    </div>
  );
}

function PlanCard({ title, description, approved, onApprove, total, children }: { title: string; description: string; approved: boolean; onApprove: () => void; total: number; children: React.ReactNode }) {
  return (
    <Card className="bg-slate-900/70 border-slate-700">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <div><CardTitle className="text-slate-100">{title}</CardTitle><CardDescription>{description}</CardDescription></div>
          <StatusBadge approved={approved} />
        </div>
      </CardHeader>
      <CardContent>
        {children}
        <div className="mt-4 flex items-center justify-between">
          <span className="font-semibold text-slate-200">الإجمالي: {total}</span>
          <Button onClick={onApprove} disabled={approved} className="gap-2"><CheckCircle2 className="h-4 w-4"/>موافقة على الكل</Button>
        </div>
      </CardContent>
    </Card>
  );
}

function TableMonthly({ rows, onChange, locked }: { rows: PlanRow[]; onChange: (r: PlanRow[]) => void; locked: boolean }) {
  return <BaseTable headers={["المجموعة", "المادة", "معدل كمية البيع", "كمية الخطة"]} rows={rows.map((r, i) => [r.group, r.item, String(r.avg ?? 0), <NumberInput key={i} value={r.planned} disabled={locked} onChange={(v) => onChange(rows.map((x, j) => j === i ? { ...x, planned: v } : x))} />])} />;
}

function TableEmergency({ rows, onChange, locked }: { rows: PlanRow[]; onChange: (r: PlanRow[]) => void; locked: boolean }) {
  return <BaseTable headers={["المجموعة", "المادة", "كمية الخطة"]} rows={rows.map((r, i) => [r.group, r.item, <NumberInput key={i} value={r.planned} disabled={locked} onChange={(v) => onChange(rows.map((x, j) => j === i ? { ...x, planned: v } : x))} />])} />;
}

function TableProduction({ rows, onChange, locked }: { rows: PlanRow[]; onChange: (r: PlanRow[]) => void; locked: boolean }) {
  return <BaseTable headers={["المجموعة", "المادة", "الكمية المفترضة", "الكمية المعتمدة"]} rows={rows.map((r, i) => [r.group, r.item, String(r.planned), <NumberInput key={i} value={r.approved ?? r.planned} disabled={locked} onChange={(v) => onChange(rows.map((x, j) => j === i ? { ...x, approved: v } : x))} />])} />;
}

function BaseTable({ headers, rows }: { headers: string[]; rows: (string | React.ReactNode)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-slate-800 text-slate-200">{headers.map((h) => <th key={h} className="border border-slate-700 p-2">{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => <tr key={i} className="bg-slate-900/40">{r.map((c, j) => <td key={j} className="border border-slate-700 p-2">{c}</td>)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}
