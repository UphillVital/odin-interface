# README_v03_104_0 — UI Matrix Audit v1

## Призначення пакету

Цей пакет додає UI Matrix Audit для Control Center / File Workspace.

## Що додається

- `Run UI Matrix Audit`;
- `Copy UI Matrix Audit`;
- перевірки:
  - Quick Settings marker;
  - language switch marker;
  - Master Start action;
  - Master Start gating;
  - Control Surface;
  - Recovery Layer;
  - Continuity Layer;
  - Action Queue;
  - no auto-git;
  - no auto-restore;
  - README / CHANGELOG / MANIFEST / QA discipline.

## Правило

UI Matrix Audit не змінює UI.  
Він тільки фіксує, що треба виправити перед polish/lock.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_104_0.md` | `README_v03_104_0.md` |
| `CHANGELOG_v03_104_0.md` | `CHANGELOG_v03_104_0.md` |
| `MANIFEST_v03_104_0.md` | `MANIFEST_v03_104_0.md` |
| `QA_REPORT_v03_104_0.md` | `QA_REPORT_v03_104_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_104_0.md CHANGELOG_v03_104_0.md MANIFEST_v03_104_0.md QA_REPORT_v03_104_0.md
git commit -m "ODIN V03.104.0 — додано UI Matrix Audit"
git push origin feature/odin-interface-v03
```
