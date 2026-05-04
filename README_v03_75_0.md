# README_v03_75_0 — Action Queue Status Controls v1

## Призначення пакету

Цей пакет додає керування статусами задач у Action Queue.

## Що додається

- статусні кнопки для кожної задачі:
  - `In Progress`;
  - `Done`;
  - `Blocked`;
  - `Review`;
- `updated` timestamp;
- збереження статусів у `localStorage`.

## Правило

Status Controls не виконують задачу автоматично.  
Вони тільки фіксують ручний стан task item.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_75_0.md` | `README_v03_75_0.md` |
| `CHANGELOG_v03_75_0.md` | `CHANGELOG_v03_75_0.md` |
| `MANIFEST_v03_75_0.md` | `MANIFEST_v03_75_0.md` |
| `QA_REPORT_v03_75_0.md` | `QA_REPORT_v03_75_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_75_0.md CHANGELOG_v03_75_0.md MANIFEST_v03_75_0.md QA_REPORT_v03_75_0.md
git commit -m "ODIN V03.75.0 — додано статуси задач у Action Queue"
git push origin feature/odin-interface-v03
```
