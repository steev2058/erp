# UI Wireframes v0.1 (Textual)

## Screen A — Monthly Sales Plan
Sections:
1) Header Filters: [Month] [Group] [Product] [Status]
2) Data Grid Columns:
   - Product Group
   - Product
   - Avg Sales Qty (readonly)
   - Planned Qty (editable before lock)
   - Approval Status
3) Actions:
   - Save Draft
   - Submit for Approval
   - Approve Line
   - Approve All
4) Lock Banner:
   - "This record is locked after approval"

## Screen B — Emergency Sales Plan
Sections:
1) Header: [Request Date] [Sales Department]
2) Data Grid Columns:
   - Product Group
   - Product
   - Emergency Qty
   - Reason
   - Status
3) Actions:
   - Create Emergency Request
   - Compare with Ready Stock
   - Submit Urgent Approval
   - Approve All
4) Lock Banner when approved

## Screen C — Monthly Production Plan
Sections:
1) Header Filters: [Month]
2) Data Grid Columns:
   - Product Group
   - Product
   - Suggested Qty (from sales - ready stock)
   - Approved Qty (editable before lock)
   - Status
3) Actions:
   - Generate Plan
   - Save Draft
   - Submit for Approval
   - Approve Line / Approve All
4) Outputs panel:
   - Raw Material Requirement
   - Purchase Plan Trigger
   - Weekly Program Generator

## Shared UI Rules
- Arabic-first RTL layout.
- Approval status chips: Draft / Pending / Approved / Locked.
- Disabled inputs when status=Locked.
- Export buttons: Excel / PDF where applicable.
