import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type PlanRow = {
  group: string;
  item: string;
  avg?: number;
  planned: number;
  approved?: number;
};

const monthlySalesSeed: PlanRow[] = [
  { group: "حليب", item: "حليب سادة", avg: 1200, planned: 1200 },
  { group: "حليب", item: "حليب منكه", avg: 760, planned: 760 },
  { group: "لبن", item: "لبن عائلي", avg: 540, planned: 540 },
  { group: "أجبان", item: "لبنة", avg: 430, planned: 430 },
];

const emergencySalesSeed: PlanRow[] = [
  { group: "حليب", item: "حليب سادة", planned: 200 },
  { group: "حليب", item: "حليب منكه", planned: 150 },
  { group: "لبن", item: "لبن عائلي", planned: 100 },
];

const monthlyProductionSeed: PlanRow[] = [
  { group: "حليب", item: "حليب سادة", avg: 1500, planned: 1500, approved: 1500 },
  { group: "حليب", item: "حليب منكه", avg: 900, planned: 900, approved: 900 },
  { group: "لبن", item: "لبن عائلي", avg: 700, planned: 700, approved: 700 },
];

function NumberInput({ value, onChange, disabled = false }: { value: number; onChange: (v: number) => void; disabled?: boolean }) {
  return (
    <input
      type="number"
      value={value}
      disabled={disabled}
      onChange={(e) => onChange(Number(e.target.value || 0))}
      className="w-full rounded-md border border-slate-300 px-2 py-1 text-sm disabled:bg-slate-100"
    />
  );
}

function StatusBadge({ approved }: { approved: boolean }) {
  return (
    <span className={`rounded-full px-3 py-1 text-xs font-medium ${approved ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
      {approved ? "معتمد" : "بانتظار الموافقة"}
    </span>
  );
}

export default function ExcelPlans() {
  const [month, setMonth] = useState("2026-05");

  const [monthlyRows, setMonthlyRows] = useState(monthlySalesSeed);
  const [monthlyApproved, setMonthlyApproved] = useState(false);

  const [emergencyRows, setEmergencyRows] = useState(emergencySalesSeed);
  const [emergencyApproved, setEmergencyApproved] = useState(false);

  const [productionRows, setProductionRows] = useState(monthlyProductionSeed);
  const [productionApproved, setProductionApproved] = useState(false);

  const monthlyTotal = useMemo(() => monthlyRows.reduce((s, r) => s + r.planned, 0), [monthlyRows]);
  const emergencyTotal = useMemo(() => emergencyRows.reduce((s, r) => s + r.planned, 0), [emergencyRows]);
  const productionTotal = useMemo(() => productionRows.reduce((s, r) => s + (r.approved ?? 0), 0), [productionRows]);

  return (
    <div dir="rtl" className="min-h-screen bg-slate-50">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white">
        <div className="container mx-auto flex items-center justify-between py-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">واجهات التخطيط من ملف الإكسل</h1>
            <p className="text-sm text-slate-500">خطة البيع الشهرية + الطارئة + خطة التصنيع الشهرية</p>
          </div>
          <div className="flex items-center gap-2">
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="rounded-md border border-slate-300 px-3 py-2 text-sm" />
            <Link href="/">
              <Button variant="outline" size="sm"><ArrowLeft className="ml-2 h-4 w-4" /> الرجوع</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto space-y-6 py-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>خطة البيع الشهرية</CardTitle>
                <CardDescription>القيمة الافتراضية تأتي من معدل البيع السابق (Avg Sales) ويمكن تعديلها قبل الموافقة.</CardDescription>
              </div>
              <StatusBadge approved={monthlyApproved} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2">المجموعة</th><th className="border p-2">المادة</th><th className="border p-2">معدل كمية البيع</th><th className="border p-2">كمية الخطة</th><th className="border p-2">موافقة الإدارة</th>
                  </tr>
                </thead>
                <tbody>
                  {monthlyRows.map((row, idx) => (
                    <tr key={`${row.item}-${idx}`}>
                      <td className="border p-2">{row.group}</td>
                      <td className="border p-2">{row.item}</td>
                      <td className="border p-2">{row.avg}</td>
                      <td className="border p-2"><NumberInput value={row.planned} disabled={monthlyApproved} onChange={(v) => setMonthlyRows((prev) => prev.map((r, i) => (i === idx ? { ...r, planned: v } : r)))} /></td>
                      <td className="border p-2 text-center">{monthlyApproved ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">الإجمالي: {monthlyTotal}</span>
              <Button onClick={() => setMonthlyApproved(true)} disabled={monthlyApproved}>موافقة على الكل</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>خطة البيع الطارئة</CardTitle>
                <CardDescription>خطة سريعة للطلبات المفاجئة، تُقفل تلقائيًا بعد موافقة الإدارة.</CardDescription>
              </div>
              <StatusBadge approved={emergencyApproved} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2">المجموعة</th><th className="border p-2">المادة</th><th className="border p-2">كمية الخطة</th><th className="border p-2">موافقة الإدارة</th>
                  </tr>
                </thead>
                <tbody>
                  {emergencyRows.map((row, idx) => (
                    <tr key={`${row.item}-${idx}`}>
                      <td className="border p-2">{row.group}</td>
                      <td className="border p-2">{row.item}</td>
                      <td className="border p-2"><NumberInput value={row.planned} disabled={emergencyApproved} onChange={(v) => setEmergencyRows((prev) => prev.map((r, i) => (i === idx ? { ...r, planned: v } : r)))} /></td>
                      <td className="border p-2 text-center">{emergencyApproved ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">الإجمالي: {emergencyTotal}</span>
              <Button onClick={() => setEmergencyApproved(true)} disabled={emergencyApproved}>موافقة على الكل</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle>خطة التصنيع الشهرية</CardTitle>
                <CardDescription>القيمة الافتراضية تأتي من View (Avg Sales-Inventory). الكمية المعتمدة قابلة للتعديل قبل الإغلاق.</CardDescription>
              </div>
              <StatusBadge approved={productionApproved} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700">
                    <th className="border p-2">المجموعة</th><th className="border p-2">المادة</th><th className="border p-2">الكمية المفترضة</th><th className="border p-2">الكمية المعتمدة</th><th className="border p-2">موافقة الإدارة</th>
                  </tr>
                </thead>
                <tbody>
                  {productionRows.map((row, idx) => (
                    <tr key={`${row.item}-${idx}`}>
                      <td className="border p-2">{row.group}</td>
                      <td className="border p-2">{row.item}</td>
                      <td className="border p-2">{row.planned}</td>
                      <td className="border p-2"><NumberInput value={row.approved ?? row.planned} disabled={productionApproved} onChange={(v) => setProductionRows((prev) => prev.map((r, i) => (i === idx ? { ...r, approved: v } : r)))} /></td>
                      <td className="border p-2 text-center">{productionApproved ? "✓" : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="font-semibold text-slate-700">الإجمالي المعتمد: {productionTotal}</span>
              <Button onClick={() => setProductionApproved(true)} disabled={productionApproved}>موافقة على الكل</Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
