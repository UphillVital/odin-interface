# README_v03_57_0 — Export Ready Package v1

## Призначення пакету

Цей пакет додає Export Ready Package Draft у File Workspace.

## Що додається

- `Build Export Ready Package`;
- `Copy Export Ready Package`;
- Export Gate:
  - якщо QA_PASSED → `EXPORT_READY`;
  - якщо QA_FAILED / NOT_RUN → `EXPORT_BLOCKED`.

## Export Ready Package містить

- implementationPackage;
- qaReport;
- requiredFiles;
- safety;
- nextStep.

## Правило безпеки

Export Ready Package не створює і не змінює файли.  
Він тільки формує готовий до експорту JSON-draft.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_57_0.md` | `README_v03_57_0.md` |
| `CHANGELOG_v03_57_0.md` | `CHANGELOG_v03_57_0.md` |
| `MANIFEST_v03_57_0.md` | `MANIFEST_v03_57_0.md` |
| `QA_REPORT_v03_57_0.md` | `QA_REPORT_v03_57_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- Build Export Ready Package без QA_PASSED → EXPORT_BLOCKED;
- Approve → Add to Queue → Build Package → Run QA Gate → Build Export Ready Package;
- при QA_PASSED статус = EXPORT_READY;
- Copy Export Ready Package копіює JSON.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_57_0.md CHANGELOG_v03_57_0.md MANIFEST_v03_57_0.md QA_REPORT_v03_57_0.md
git commit -m "ODIN V03.57.0 — додано Export Ready Package у File Workspace"
git push origin feature/odin-interface-v03
```
