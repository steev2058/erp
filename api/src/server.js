import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import monthlyPlanRoutes from './routes/sales/monthlyPlan.routes.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/sales', monthlyPlanRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal Server Error', detail: err.message });
});

const port = Number(process.env.PORT || 8080);
app.listen(port, () => {
  console.log(`ERP HANA As-Is API running on :${port}`);
});
