import { Router } from 'express';
import { requirePermission } from '../../middleware/permissions.js';
import {
  listMonthlySalesPlan,
  createMonthlySalesPlan,
  submitMonthlySalesPlan,
  approveMonthlySalesPlan
} from '../../services/monthlySalesPlan.service.js';

const router = Router();

router.get(
  '/monthly-plan',
  requirePermission('SALES', 'READ'),
  async (req, res, next) => {
    try {
      const { month } = req.query;
      const rows = await listMonthlySalesPlan(month);
      res.json({ rows, status: rows[0]?.status || 'draft' });
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/monthly-plan',
  requirePermission('SALES', 'ADD'),
  async (req, res, next) => {
    try {
      const data = await createMonthlySalesPlan(req.body);
      res.status(201).json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/monthly-plan/:id/submit',
  requirePermission('SALES', 'APPROVE'),
  async (req, res, next) => {
    try {
      const data = await submitMonthlySalesPlan(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
);

router.post(
  '/monthly-plan/:id/approve',
  requirePermission('APPROVALS', 'APPROVE'),
  async (req, res, next) => {
    try {
      const data = await approveMonthlySalesPlan(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  }
);

export default router;
