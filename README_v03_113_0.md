# README_v03_113_0 — Commit Builder Integration QA Gate v1

## Призначення пакету

Цей пакет додає QA Gate для Commit Builder Integration Draft.

## Що додається

- `Run Commit Builder QA Gate`;
- `Copy Commit Builder QA Gate`;
- перевірки:
  - integration draft ready;
  - git commands are text only;
  - no automatic git;
  - no automatic staging;
  - `commit_builder.html` deletion blocked;
  - V03.100 locked base preserved;
  - target areas defined;
  - draft controls defined;
  - sample git draft exists;
  - package docs discipline preserved.

## Головне правило

Git-команди — тільки текст для копіювання.

```text
NO_EXECUTION
COPY_ONLY
NO_AUTO_STAGE
NO_DELETE
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_113_0.md` | `README_v03_113_0.md` |
| `CHANGELOG_v03_113_0.md` | `CHANGELOG_v03_113_0.md` |
| `MANIFEST_v03_113_0.md` | `MANIFEST_v03_113_0.md` |
| `QA_REPORT_v03_113_0.md` | `QA_REPORT_v03_113_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_113_0.md CHANGELOG_v03_113_0.md MANIFEST_v03_113_0.md QA_REPORT_v03_113_0.md
git commit -m "ODIN V03.113.0 — додано QA Gate для інтеграції Commit Builder"
git push origin feature/odin-interface-v03
```
