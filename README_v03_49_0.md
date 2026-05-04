# README_v03_49_0 — File Workspace Execution Bridge v1

## Призначення пакету

Цей пакет додає структурований міст між Control Center і File Workspace.

## Що додається

- `File Workspace Execution Bridge`;
- `Bridge Package Preview`;
- `Copy Bridge Package`;
- per-record:
  - `Preview Bridge`;
  - `Copy Bridge`;
  - `File Workspace`.

## Що містить Bridge Package

- selectedRecord;
- action;
- decision;
- entryStatus;
- executionStatus;
- statePackage;
- bridgeInstruction.

## Правило безпеки

Bridge v1 не редагує файли.  
Він тільки готує структурований контекст для File Workspace.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_49_0.md` | `README_v03_49_0.md` |
| `CHANGELOG_v03_49_0.md` | `CHANGELOG_v03_49_0.md` |
| `MANIFEST_v03_49_0.md` | `MANIFEST_v03_49_0.md` |
| `QA_REPORT_v03_49_0.md` | `QA_REPORT_v03_49_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є блок `File Workspace Execution Bridge`;
- `Copy Bridge Package` копіює глобальний bridge;
- у записах є `Preview Bridge` і `Copy Bridge`;
- Bridge Package містить selectedRecord/action/decision/statePackage;
- перехід `File Workspace` збережений.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_49_0.md CHANGELOG_v03_49_0.md MANIFEST_v03_49_0.md QA_REPORT_v03_49_0.md
git commit -m "ODIN V03.49.0 — додано File Workspace Execution Bridge для Control Center"
git push origin feature/odin-interface-v03
```
