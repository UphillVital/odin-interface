# README_v03_59_0 — Documentation Draft Generator v1

## Призначення пакету

Цей пакет додає Documentation Draft Generator у File Workspace.

## Що додається

- `Build Docs Drafts`;
- `Copy Docs Drafts`;
- draft для:
  - README;
  - CHANGELOG;
  - MANIFEST;
  - QA_REPORT.

## Правило безпеки

Documentation Draft Generator v1 не створює файли автоматично.  
Він тільки формує JSON з текстами документації для ручної перевірки.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_59_0.md` | `README_v03_59_0.md` |
| `CHANGELOG_v03_59_0.md` | `CHANGELOG_v03_59_0.md` |
| `MANIFEST_v03_59_0.md` | `MANIFEST_v03_59_0.md` |
| `QA_REPORT_v03_59_0.md` | `QA_REPORT_v03_59_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- Build Docs Drafts формує JSON;
- Copy Docs Drafts копіює JSON;
- без COMMIT_READY статус DOCS_BLOCKED;
- після повного gate-flow статус DOCS_READY.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_59_0.md CHANGELOG_v03_59_0.md MANIFEST_v03_59_0.md QA_REPORT_v03_59_0.md
git commit -m "ODIN V03.59.0 — додано Documentation Draft Generator у File Workspace"
git push origin feature/odin-interface-v03
```
