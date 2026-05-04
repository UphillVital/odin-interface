# README_v03_58_0 — Commit Draft Builder v1

## Призначення пакету

Цей пакет додає Commit Draft Builder у File Workspace.

## Що додається

- `Build Commit Draft`;
- `Copy Commit Draft`;
- commit draft зі статусами:
  - `COMMIT_READY`;
  - `COMMIT_BLOCKED`;
- список файлів;
- commit message;
- git commands;
- safety flags.

## Правило безпеки

Commit Draft Builder v1 не виконує git-команди.  
Він тільки готує контрольований текстовий draft.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_58_0.md` | `README_v03_58_0.md` |
| `CHANGELOG_v03_58_0.md` | `CHANGELOG_v03_58_0.md` |
| `MANIFEST_v03_58_0.md` | `MANIFEST_v03_58_0.md` |
| `QA_REPORT_v03_58_0.md` | `QA_REPORT_v03_58_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- без EXPORT_READY → COMMIT_BLOCKED;
- після QA_PASSED → Export Ready → Build Commit Draft → COMMIT_READY;
- Copy Commit Draft копіює JSON.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_58_0.md CHANGELOG_v03_58_0.md MANIFEST_v03_58_0.md QA_REPORT_v03_58_0.md
git commit -m "ODIN V03.58.0 — додано Commit Draft Builder у File Workspace"
git push origin feature/odin-interface-v03
```
