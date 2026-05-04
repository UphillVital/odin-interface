# README_v03_105_0 — Control Center / File Workspace Alignment Audit v1

## Призначення пакету

Цей пакет додає аудит узгодженості Control Center і File Workspace.

## Що додається

- `Run Workspace Alignment Audit`;
- `Copy Alignment Audit`;
- перевірки:
  - Control Center marker;
  - File Workspace marker;
  - shared layout markers;
  - shared buttons;
  - runtime/import textarea;
  - decision log;
  - integration bridge;
  - no-auto-write safety;
  - V03.100 checkpoint marker.

## Правило

Alignment Audit не змінює UI автоматично.  
Він тільки фіксує, чи сторінки виглядають і працюють як одна система.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_105_0.md` | `README_v03_105_0.md` |
| `CHANGELOG_v03_105_0.md` | `CHANGELOG_v03_105_0.md` |
| `MANIFEST_v03_105_0.md` | `MANIFEST_v03_105_0.md` |
| `QA_REPORT_v03_105_0.md` | `QA_REPORT_v03_105_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_105_0.md CHANGELOG_v03_105_0.md MANIFEST_v03_105_0.md QA_REPORT_v03_105_0.md
git commit -m "ODIN V03.105.0 — додано аудит узгодженості Control Center і File Workspace"
git push origin feature/odin-interface-v03
```
