# README_v03_99_0 — Quick Settings Master Start QA / UI Matrix Check v1

## Призначення пакету

Цей пакет додає QA-перевірку кнопки `ODIN SYSTEM — MASTER START` у Quick Settings / системній зоні Control Center.

## Що додається

- `Run Quick Settings QA`;
- `Copy Quick Settings QA`;
- перевірки:
  - Master Start button exists;
  - registry exists;
  - final lock dependency exists;
  - no automatic restore rule;
  - language switch safeguard;
  - Quick Settings marker;
  - ODIN UI Matrix marker;
  - copy result button.

## Статуси

```text
QUICK_SETTINGS_QA_PASSED
QUICK_SETTINGS_QA_FAILED
```

## Правило

Кнопка Master Start не може вважатися фінально прийнятою без QA-перевірки Quick Settings / UI Matrix.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_99_0.md` | `README_v03_99_0.md` |
| `CHANGELOG_v03_99_0.md` | `CHANGELOG_v03_99_0.md` |
| `MANIFEST_v03_99_0.md` | `MANIFEST_v03_99_0.md` |
| `QA_REPORT_v03_99_0.md` | `QA_REPORT_v03_99_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_99_0.md CHANGELOG_v03_99_0.md MANIFEST_v03_99_0.md QA_REPORT_v03_99_0.md
git commit -m "ODIN V03.99.0 — додано QA кнопки Master Start у Quick Settings"
git push origin feature/odin-interface-v03
```
