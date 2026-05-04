# README_v03_115_0 — Commit Builder Control Surface Widget v1

## Призначення пакету

Цей пакет додає перший реальний Commit Builder widget у Control Center.

## Що додається

- `Commit Builder Control Surface Widget v1`;
- поля:
  - Package version;
  - Branch;
  - Commit message;
  - Files;
- кнопки:
  - `Build Git Draft`;
  - `Copy Git Draft`;
  - `Copy Files List`;
- draft output:
  - `git add ...`;
  - `git commit -m "..."`;
  - `git push origin ...`.

## Головне правило

Widget нічого не виконує автоматично.

```text
COPY_ONLY
NO_GIT_EXECUTION
NO_AUTO_STAGE
NO_FILE_WRITE
NO_DELETE
```

## Умова дозволу

Draft дозволений тільки якщо:

```text
Commit Builder Integration Lock = COMMIT_BUILDER_INTEGRATION_LOCKED
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_115_0.md` | `README_v03_115_0.md` |
| `CHANGELOG_v03_115_0.md` | `CHANGELOG_v03_115_0.md` |
| `MANIFEST_v03_115_0.md` | `MANIFEST_v03_115_0.md` |
| `QA_REPORT_v03_115_0.md` | `QA_REPORT_v03_115_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_115_0.md CHANGELOG_v03_115_0.md MANIFEST_v03_115_0.md QA_REPORT_v03_115_0.md
git commit -m "ODIN V03.115.0 — додано Commit Builder Control Surface Widget"
git push origin feature/odin-interface-v03
```
