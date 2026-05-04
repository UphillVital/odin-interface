# README_v03_78_0 — Action Queue Archive / Done Review v1

## Призначення пакету

Цей пакет додає архів завершених задач для Action Queue.

## Що додається

- `Archive Done`;
- `Copy Archive`;
- окремий `actionArchive` у localStorage;
- archive report;
- archivedTotal у метриках;
- DONE tasks переносяться з queue в archive.

## Правило

Archive не видаляє історію.  
Він переносить DONE tasks у контрольований archive list.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_78_0.md` | `README_v03_78_0.md` |
| `CHANGELOG_v03_78_0.md` | `CHANGELOG_v03_78_0.md` |
| `MANIFEST_v03_78_0.md` | `MANIFEST_v03_78_0.md` |
| `QA_REPORT_v03_78_0.md` | `QA_REPORT_v03_78_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_78_0.md CHANGELOG_v03_78_0.md MANIFEST_v03_78_0.md QA_REPORT_v03_78_0.md
git commit -m "ODIN V03.78.0 — додано архів завершених задач Action Queue"
git push origin feature/odin-interface-v03
```
