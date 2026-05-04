# README_v03_66_0 — Stable Workflow Lock v1

## Призначення пакету

Цей пакет додає Stable Workflow Lock у Control Center.

## Що додається

- `Stable Workflow Lock v1`;
- `Build Stable Lock`;
- `Copy Stable Lock`;
- статуси:
  - `STABLE_WORKFLOW_LOCKED`;
  - `STABLE_WORKFLOW_LOCK_BLOCKED`;
- lockedStandard для Control Center ↔ File Workspace closed loop.

## Правило

Stable Workflow Lock дозволений тільки якщо:

```text
Workflow Stabilization = STABILIZATION_READY
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_66_0.md` | `README_v03_66_0.md` |
| `CHANGELOG_v03_66_0.md` | `CHANGELOG_v03_66_0.md` |
| `MANIFEST_v03_66_0.md` | `MANIFEST_v03_66_0.md` |
| `QA_REPORT_v03_66_0.md` | `QA_REPORT_v03_66_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_66_0.md CHANGELOG_v03_66_0.md MANIFEST_v03_66_0.md QA_REPORT_v03_66_0.md
git commit -m "ODIN V03.66.0 — додано Stable Workflow Lock"
git push origin feature/odin-interface-v03
```
