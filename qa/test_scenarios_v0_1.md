# QA Test Scenarios v0.1

## A) Lock-After-Approval
1. Create Monthly Sales Plan in draft
2. Submit for approval
3. Approve full
4. Verify status becomes locked
5. Try editing any qty -> must fail (UI + API)

## B) Line-Level Approval
1. Create plan with multiple lines
2. Submit pending
3. Approve single line
4. Verify line status approved while others pending
5. Final full approval locks document

## C) Immutable Stock Movement
1. Post rep delivery note
2. Verify stock movement row created
3. Attempt direct stock balance edit (without movement) -> must be blocked
4. Reverse via proper movement document only

## D) Emergency Plan Flow
1. Create emergency request
2. Submit urgent approval
3. Approve full
4. Verify lock + downstream trigger to production/purchasing

## E) Permissions
1. Sales rep tries approval endpoint -> denied
2. Production manager approves production line -> allowed
3. Admin full approves all docs -> allowed

## F) Traceability
1. Execute approvals on sample entities
2. Verify `approvals_log` captures actor/time/action/entity
3. Verify report can reconstruct audit trail
