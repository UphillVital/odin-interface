# ODIN V03 QA SYSTEM v1

## Purpose
QA SYSTEM verifies that each package preserves the stable ODIN V03 baseline.

## QA Gates

### Gate 1 — Structure
- Required files exist
- No empty folders are included
- No duplicate root structures are introduced

### Gate 2 — UI Baseline
- Prototype opens from `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`
- Light theme is default
- Dark theme remains available
- UA/EN remains available

### Gate 3 — Interaction
- MASTER START works
- Left navigation works
- System Map opens zones
- Assisted Mode displays helpful explanations

### Gate 4 — Safety
- No stable module is removed silently
- Existing behavior is preserved unless migration is declared
- Any breaking change is blocked until approved

## QA Result States
- `QA_PENDING`
- `QA_PASSED`
- `QA_FAILED`
- `QA_PASSED_WITH_WARNINGS`

## Export Rule
If QA fails, export/package promotion is blocked.
