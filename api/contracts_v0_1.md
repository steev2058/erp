# API Contracts v0.1 (Mandatory 3 Screens)

## 1) Monthly Sales Plan
### GET /api/sales/monthly-plan
Query: `month=YYYY-MM`
Response:
- rows: [{id, productId, productName, avgSalesQty, plannedQty, status}]
- status: draft|pending|approved|locked

### POST /api/sales/monthly-plan
Body:
- month
- lines: [{productId, plannedQty}]
Action: save draft

### POST /api/sales/monthly-plan/{id}/submit
Action: draft -> pending

### POST /api/sales/monthly-plan/{id}/approve
Body: {mode: "line"|"full", lineIds?:[]}
Action: pending -> approved -> locked

---

## 2) Emergency Sales Plan
### GET /api/sales/emergency-plan
Query: `from=YYYY-MM-DD&to=YYYY-MM-DD`
Response:
- rows: [{id, requestDate, productId, productName, emergencyQty, reason, status}]

### POST /api/sales/emergency-plan
Body:
- requestDate
- lines: [{productId, emergencyQty, reason}]
Action: save draft

### POST /api/sales/emergency-plan/{id}/submit
Action: draft -> pending

### POST /api/sales/emergency-plan/{id}/approve
Body: {mode:"full"}
Action: pending -> approved -> locked

---

## 3) Monthly Production Plan
### GET /api/production/monthly-plan
Query: `month=YYYY-MM`
Response:
- rows: [{id, productId, productName, suggestedQty, approvedQty, status}]

### POST /api/production/monthly-plan/generate
Body:
- month
Action: generate from approved sales plan - finished stock

### POST /api/production/monthly-plan/{id}
Body:
- lines: [{lineId, approvedQty}]
Action: save draft edits

### POST /api/production/monthly-plan/{id}/submit
Action: draft -> pending

### POST /api/production/monthly-plan/{id}/approve
Body: {mode:"full"|"line", lineIds?:[]}
Action: pending -> approved -> locked

---

## Common Rules (As-Is)
- Locked record is read-only.
- Approval actions are logged in `approvals_log`.
- Any stock impact must create `stock_movements` record.
- Permission checks required on every endpoint.
