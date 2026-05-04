# README_v03_65_0 — Workflow Stabilization Checkpoint v1

## Призначення пакету

Цей пакет додає стабілізаційний checkpoint для замкненого workflow.

## Що додається

- `Workflow Stabilization Checkpoint v1`;
- `Build Stabilization Checkpoint`;
- `Copy Stabilization Report`;
- статуси:
  - `STABILIZATION_READY`;
  - `STABILIZATION_NEEDS_REVIEW`;
- перевірки:
  - closed loop;
  - runtime;
  - rules;
  - decisions;
  - integration result;
  - import action;
  - no-auto-write policy;
  - manual gates.

## Правило безпеки

Checkpoint не змінює файли і не виконує git.  
Він тільки фіксує стабільність workflow.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_65_0.md` | `README_v03_65_0.md` |
| `CHANGELOG_v03_65_0.md` | `CHANGELOG_v03_65_0.md` |
| `MANIFEST_v03_65_0.md` | `MANIFEST_v03_65_0.md` |
| `QA_REPORT_v03_65_0.md` | `QA_REPORT_v03_65_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_65_0.md CHANGELOG_v03_65_0.md MANIFEST_v03_65_0.md QA_REPORT_v03_65_0.md
git commit -m "ODIN V03.65.0 — додано Workflow Stabilization Checkpoint"
git push origin feature/odin-interface-v03
```
