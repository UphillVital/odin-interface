# README_v03_84_0 — Snapshot Restore Audit Trail v1

## Призначення пакету

Цей пакет додає журнал аудиту для імпорту/відновлення ODIN State Snapshot.

## Що додається

- `Snapshot Restore Audit`;
- `Copy Restore Audit`;
- `Clear Restore Audit`;
- audit записує:
  - `RESTORE_IMPORTED`;
  - `RESTORE_BLOCKED`;
  - `RESTORE_FAILED`;
- час події;
- причина;
- runtime/queue/archive summary.

## Правило

Restore Audit не виконує дії.  
Він тільки фіксує історію спроб відновлення.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_84_0.md` | `README_v03_84_0.md` |
| `CHANGELOG_v03_84_0.md` | `CHANGELOG_v03_84_0.md` |
| `MANIFEST_v03_84_0.md` | `MANIFEST_v03_84_0.md` |
| `QA_REPORT_v03_84_0.md` | `QA_REPORT_v03_84_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_84_0.md CHANGELOG_v03_84_0.md MANIFEST_v03_84_0.md QA_REPORT_v03_84_0.md
git commit -m "ODIN V03.84.0 — додано Snapshot Restore Audit Trail"
git push origin feature/odin-interface-v03
```
