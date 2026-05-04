# README_v03_63_0 — Control Center Import Result v1

## Призначення пакету

Цей пакет підсилює імпорт Integration Summary у Control Center.

## Що додається

- `Import Action`;
- автоматична оцінка імпортованого результату:
  - `READY_FOR_NEXT_STEP`;
  - `NEEDS_REVIEW`;
- запис у Decision History після імпорту;
- Copy Integration Result тепер копіює:
  - integrationResult;
  - importAction.

## Правило безпеки

Import Result не змінює файли.  
Він тільки перетворює результат File Workspace у керований стан Control Center.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_63_0.md` | `README_v03_63_0.md` |
| `CHANGELOG_v03_63_0.md` | `CHANGELOG_v03_63_0.md` |
| `MANIFEST_v03_63_0.md` | `MANIFEST_v03_63_0.md` |
| `QA_REPORT_v03_63_0.md` | `QA_REPORT_v03_63_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- вставити Integration Summary;
- Import Action показує READY_FOR_NEXT_STEP або NEEDS_REVIEW;
- Decision History отримує запис INTEGRATION_RESULT;
- Copy Integration Result копіює result + action.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_63_0.md CHANGELOG_v03_63_0.md MANIFEST_v03_63_0.md QA_REPORT_v03_63_0.md
git commit -m "ODIN V03.63.0 — додано Import Result Action у Control Center"
git push origin feature/odin-interface-v03
```
