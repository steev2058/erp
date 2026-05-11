import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import authRoutes from './routes/auth';
import masterDataRoutes from './routes/master-data';
import salesRoutes from './routes/sales';
import inventoryRoutes from './routes/inventory';
import purchasingRoutes from './routes/purchasing';
import approvalsRoutes from './routes/approvals';
import reportsRoutes from './routes/reports';
import { authMiddleware } from './middleware/auth';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/master-data', authMiddleware, masterDataRoutes);
app.use('/api/sales', authMiddleware, salesRoutes);
app.use('/api/inventory', authMiddleware, inventoryRoutes);
app.use('/api/purchasing', authMiddleware, purchasingRoutes);
app.use('/api/approvals', authMiddleware, approvalsRoutes);
app.use('/api/reports', authMiddleware, reportsRoutes);

// Serve static files
const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

// SPA fallback
app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✓ ERP Server running on port ${PORT}`);
  console.log(`✓ API available at http://localhost:${PORT}/api`);
});
