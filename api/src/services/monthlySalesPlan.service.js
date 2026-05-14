import { getDb, sql } from '../config/db.js';

export async function listMonthlySalesPlan(month) {
  const db = await getDb();
  const result = await db
    .request()
    .input('month', sql.Date, new Date(`${month}-01`))
    .query(`
      SELECT p.id, p.product_id AS productId, pr.name_ar AS productName,
             p.avg_sales_qty AS avgSalesQty, p.planned_qty AS plannedQty, p.status
      FROM sales_monthly_plans p
      JOIN products pr ON pr.id = p.product_id
      WHERE FORMAT(p.plan_month, 'yyyy-MM') = @month
      ORDER BY pr.name_ar
    `);

  return result.recordset;
}

export async function createMonthlySalesPlan({ month, lines, userId = 1 }) {
  const db = await getDb();

  for (const line of lines) {
    await db
      .request()
      .input('planMonth', sql.Date, new Date(`${month}-01`))
      .input('productId', sql.Int, line.productId)
      .input('plannedQty', sql.Decimal(18, 3), line.plannedQty)
      .input('userId', sql.Int, userId)
      .query(`
        INSERT INTO sales_monthly_plans
        (plan_month, product_id, avg_sales_qty, planned_qty, status, created_by)
        VALUES
        (@planMonth, @productId, 0, @plannedQty, 'draft', @userId)
      `);
  }

  return { ok: true };
}

export async function submitMonthlySalesPlan(id) {
  const db = await getDb();
  await db.request().input('id', sql.BigInt, id).query(`
    UPDATE sales_monthly_plans
    SET status = 'pending'
    WHERE id = @id AND status = 'draft'
  `);
  return { ok: true };
}

export async function approveMonthlySalesPlan(id, { mode = 'full', lineIds = [] }, userId = 1) {
  const db = await getDb();

  if (mode === 'line' && lineIds.length) {
    for (const lineId of lineIds) {
      await db.request()
        .input('lineId', sql.BigInt, lineId)
        .input('userId', sql.Int, userId)
        .query(`
          UPDATE sales_monthly_plans
          SET status = 'approved', approved_by = @userId, approved_at = SYSDATETIME()
          WHERE id = @lineId AND status = 'pending'
        `);
    }
  } else {
    await db.request()
      .input('id', sql.BigInt, id)
      .input('userId', sql.Int, userId)
      .query(`
        UPDATE sales_monthly_plans
        SET status = 'locked', approved_by = @userId, approved_at = SYSDATETIME()
        WHERE id = @id AND status IN ('pending','approved')
      `);
  }

  await db.request()
    .input('entityType', sql.NVarChar(50), 'SALES_MONTHLY_PLAN')
    .input('entityId', sql.BigInt, id)
    .input('action', sql.NVarChar(20), mode === 'line' ? 'approve_line' : 'approve_full')
    .input('actorUserId', sql.Int, userId)
    .query(`
      INSERT INTO approvals_log (entity_type, entity_id, action, actor_user_id)
      VALUES (@entityType, @entityId, @action, @actorUserId)
    `);

  return { ok: true };
}
