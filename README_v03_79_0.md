# README_v03_79_0 — Action Queue Persistence Export / Import v1

## Призначення пакету

Цей пакет додає backup/restore для Action Queue.

## Що додається

- `Export Queue State`;
- `Import Queue State`;
- textarea для export/import JSON;
- переносимий state містить:
  - queue;
  - archive;
  - metrics;
  - safety flags.

## Правило

Import не виконує задачі.  
Він тільки відновлює локальний стан Action Queue / Archive у `localStorage`.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_79_0.md` | `README_v03_79_0.md` |
| `CHANGELOG_v03_79_0.md` | `CHANGELOG_v03_79_0.md` |
| `MANIFEST_v03_79_0.md` | `MANIFEST_v03_79_0.md` |
| `QA_REPORT_v03_79_0.md` | `QA_REPORT_v03_79_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_79_0.md CHANGELOG_v03_79_0.md MANIFEST_v03_79_0.md QA_REPORT_v03_79_0.md
git commit -m "ODIN V03.79.0 — додано export/import стану Action Queue"
git push origin feature/odin-interface-v03
```
