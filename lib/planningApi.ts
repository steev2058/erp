export type PlanRow = {
  id: string;
  group: string;
  item: string;
  avg?: number;
  planned: number;
  approved?: number;
};

export type PlanningPayload = {
  month: string;
  status: {
    monthlyApproved: boolean;
    emergencyApproved: boolean;
    productionApproved: boolean;
  };
  monthly: PlanRow[];
  emergency: PlanRow[];
  production: PlanRow[];
};

const fallback: PlanningPayload = {
  month: "2026-05",
  status: { monthlyApproved: false, emergencyApproved: false, productionApproved: false },
  monthly: [
    { id: "m1", group: "حليب", item: "حليب سادة", avg: 1200, planned: 1200 },
    { id: "m2", group: "حليب", item: "حليب منكه", avg: 760, planned: 760 },
    { id: "m3", group: "لبن", item: "لبن عائلي", avg: 540, planned: 540 },
    { id: "m4", group: "أجبان", item: "لبنة", avg: 430, planned: 430 }
  ],
  emergency: [
    { id: "e1", group: "حليب", item: "حليب سادة", planned: 200 },
    { id: "e2", group: "حليب", item: "حليب منكه", planned: 150 },
    { id: "e3", group: "لبن", item: "لبن عائلي", planned: 100 }
  ],
  production: [
    { id: "p1", group: "حليب", item: "حليب سادة", planned: 1500, approved: 1500 },
    { id: "p2", group: "حليب", item: "حليب منكه", planned: 900, approved: 900 },
    { id: "p3", group: "لبن", item: "لبن عائلي", planned: 700, approved: 700 }
  ]
};

async function req(path: string, init?: RequestInit) {
  const res = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export async function getPlanningData(): Promise<PlanningPayload> {
  try {
    const data = await req("/api/planning");
    return data?.data ?? fallback;
  } catch {
    return fallback;
  }
}

export async function savePlanningData(payload: PlanningPayload): Promise<void> {
  try {
    await req("/api/planning", { method: "PUT", body: JSON.stringify(payload) });
  } catch {
    // silent fallback for static preview
  }
}
