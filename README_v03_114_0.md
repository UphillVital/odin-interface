# README_v03_114_0 — Commit Builder Integration Lock v1

## Призначення пакету

Цей пакет додає lock для інтеграції функцій Commit Builder.

## Що додається

- `Build Commit Builder Integration Lock`;
- `Copy Commit Builder Integration Lock`;
- locked capabilities:
  - git command draft generation as text only;
  - commit message proposal as editable text;
  - included files list draft;
  - copy-only git command output.
- blocked actions:
  - automatic git execution;
  - automatic git staging;
  - automatic file deletion;
  - `commit_builder.html` deletion in this package;
  - bypassing V03.100 locked base.

## Статуси

```text
COMMIT_BUILDER_INTEGRATION_LOCKED
COMMIT_BUILDER_INTEGRATION_LOCK_BLOCKED
```

## Головне правило

Lock дозволяє тільки контрольовану інтеграцію.  
Він не видаляє `commit_builder.html` і не виконує git.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_114_0.md` | `README_v03_114_0.md` |
| `CHANGELOG_v03_114_0.md` | `CHANGELOG_v03_114_0.md` |
| `MANIFEST_v03_114_0.md` | `MANIFEST_v03_114_0.md` |
| `QA_REPORT_v03_114_0.md` | `QA_REPORT_v03_114_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_114_0.md CHANGELOG_v03_114_0.md MANIFEST_v03_114_0.md QA_REPORT_v03_114_0.md
git commit -m "ODIN V03.114.0 — зафіксовано Commit Builder Integration Lock"
git push origin feature/odin-interface-v03
```
