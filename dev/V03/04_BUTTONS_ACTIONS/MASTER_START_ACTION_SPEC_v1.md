# MASTER START ACTION SPEC v1

Element: ODIN SYSTEM — MASTER START

---

## 1. Purpose

Primary system action for launching ODIN product/system start workflows.

---

## 2. Required Flow

```text
Click MASTER START
→ Select product/system variant
→ Generate correct start package by rules
→ Preview workflow
→ Confirm launch
→ Execute workflow
→ Report result/state
```

---

## 3. Product Variants Source

The button must use a controlled ODIN product list, not hardcoded random entries.

Initial products:

- ODIN Core
- ODIN Interface
- Deutsch Trainer
- Lesson System
- OIS
- Recovery / Revival Package

---

## 4. Safety Rules

- No fake execution.
- No hidden generation.
- No export without QA where required.
- No overwrite of stable files without approval.
