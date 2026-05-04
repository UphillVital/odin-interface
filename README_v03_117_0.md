# README_v03_117_0 — Commit Builder Widget Lock v1

## Призначення пакету

Цей пакет додає lock для Commit Builder Control Surface Widget.

## Що додається

- `Build Commit Widget Lock`;
- `Copy Commit Widget Lock`;
- locked capabilities:
  - Build git add/commit/push draft as text;
  - Copy git draft;
  - Copy files list;
  - Edit package version / branch / commit message / files.
- blocked actions:
  - git execution;
  - git staging;
  - file write;
  - file deletion;
  - commit_builder.html deletion;
  - bypassing Commit Builder Integration Lock.

## Статуси

```text
COMMIT_WIDGET_LOCKED
COMMIT_WIDGET_LOCK_BLOCKED
```

## Головне правило

Commit Builder Widget дозволений тільки як safe copy-only control.

```text
COPY_ONLY
NO_GIT_EXECUTION
NO_AUTO_STAGE
NO_FILE_WRITE
NO_DELETE
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_117_0.md` | `README_v03_117_0.md` |
| `CHANGELOG_v03_117_0.md` | `CHANGELOG_v03_117_0.md` |
| `MANIFEST_v03_117_0.md` | `MANIFEST_v03_117_0.md` |
| `QA_REPORT_v03_117_0.md` | `QA_REPORT_v03_117_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_117_0.md CHANGELOG_v03_117_0.md MANIFEST_v03_117_0.md QA_REPORT_v03_117_0.md
git commit -m "ODIN V03.117.0 — зафіксовано Commit Builder Widget Lock"
git push origin feature/odin-interface-v03
```
