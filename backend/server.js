import express from 'express';
import cors from 'cors';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const PORT = process.env.ERP_API_PORT || 5050;
const dbPath = path.join(__dirname, 'data', 'planning.json');

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => res.json({ ok: true }));

app.get('/api/planning', async (_req, res) => {
  try {
    const raw = await fs.readFile(dbPath, 'utf8');
    res.json({ data: JSON.parse(raw) });
  } catch (e) {
    res.status(500).json({ error: 'failed_to_read', details: String(e) });
  }
});

app.put('/api/planning', async (req, res) => {
  try {
    await fs.writeFile(dbPath, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'failed_to_write', details: String(e) });
  }
});

app.listen(PORT, () => {
  console.log(`ERP API listening on ${PORT}`);
});
