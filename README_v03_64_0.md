# README_v03_64_0 — Closed Loop Workflow v1

## Призначення пакету

Цей пакет додає у Control Center статус повного замкненого workflow.

## Цикл

```text
Control Center
→ File Workspace
→ QA / Export / System Lock
→ Integration Summary
→ Control Center Import Result
→ Closed Loop Status
```

## Що додається

- `Closed Loop Workflow v1`;
- `Refresh Closed Loop`;
- `Copy Closed Loop Report`;
- статуси:
  - `CLOSED_LOOP_READY`;
  - `CLOSED_LOOP_INCOMPLETE`;
- checkpoints:
  - runtimeState;
  - rules;
  - decisions;
  - integrationResult;
  - importAction.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_64_0.md` | `README_v03_64_0.md` |
| `CHANGELOG_v03_64_0.md` | `CHANGELOG_v03_64_0.md` |
| `MANIFEST_v03_64_0.md` | `MANIFEST_v03_64_0.md` |
| `QA_REPORT_v03_64_0.md` | `QA_REPORT_v03_64_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_64_0.md CHANGELOG_v03_64_0.md MANIFEST_v03_64_0.md QA_REPORT_v03_64_0.md
git commit -m "ODIN V03.64.0 — додано Closed Loop Workflow у Control Center"
git push origin feature/odin-interface-v03
```
