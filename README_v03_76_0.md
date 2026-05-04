# README_v03_76_0 — Action Queue Filters / Views v1

## Призначення пакету

Цей пакет додає фільтри для Action Queue.

## Що додається

- фільтр за `Task Status`;
- фільтр за `Priority`;
- фільтр за `Action`;
- `Reset Queue Filters`;
- `Copy Action Queue` тепер включає повний список і filtered view.

## Правило

Фільтри не змінюють задачі.  
Вони тільки керують переглядом.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_76_0.md` | `README_v03_76_0.md` |
| `CHANGELOG_v03_76_0.md` | `CHANGELOG_v03_76_0.md` |
| `MANIFEST_v03_76_0.md` | `MANIFEST_v03_76_0.md` |
| `QA_REPORT_v03_76_0.md` | `QA_REPORT_v03_76_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_76_0.md CHANGELOG_v03_76_0.md MANIFEST_v03_76_0.md QA_REPORT_v03_76_0.md
git commit -m "ODIN V03.76.0 — додано фільтри та перегляди для Action Queue"
git push origin feature/odin-interface-v03
```
