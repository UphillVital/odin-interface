# ODIN V03 — MASTER START Work Zone Flow v1

## Purpose
Defines how the `ODIN SYSTEM — MASTER START` button interacts with Work Zones.

---

## Button Role

`ODIN SYSTEM — MASTER START` is the primary system action.

It opens the Master Start Zone.

---

## Master Start Flow

```text
Click MASTER START
→ activate Master Start Zone
→ choose ODIN product/system variant
→ check context readiness
→ generate correct MASTER START package
→ preview pipeline
→ run/prepare output
→ handoff to QA/File Workspace/Package
```

---

## Required UI Blocks

1. Product selector
2. Variant selector
3. Context checklist
4. Start package preview
5. Pipeline preview
6. Run button
7. Result/output area

---

## Product Examples

- ODIN Core
- ODIN Interface
- OIS
- Deutsch Trainer
- Lesson System
- Recovery / Rebirth Package
- Experimental Module

---

## Safety Rules

MASTER START must not:
- overwrite stable files without approval
- generate fake readiness
- skip QA
- ignore missing context
