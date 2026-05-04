# README_v03_90_0 — New Chat Transfer Validator v1

## Призначення пакету

Цей пакет додає перевірку пакету переходу в новий чат.

## Що додається

- `Validate Transfer`;
- `Copy Transfer Validation`;
- validation report;
- transfer textarea тепер можна використовувати для перевірки вставленого JSON;
- перевірки:
  - correct transfer type;
  - recoveryLayerLock;
  - controlSurface;
  - nextAction;
  - snapshot;
  - startupInstruction;
  - mandatoryRules;
  - startCommand.

## Статуси

```text
TRANSFER_VALID
TRANSFER_INVALID
NOT_RUN
```

## Правило

New Chat Transfer використовується тільки якщо:

```text
transferValidation.status = TRANSFER_VALID
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_90_0.md` | `README_v03_90_0.md` |
| `CHANGELOG_v03_90_0.md` | `CHANGELOG_v03_90_0.md` |
| `MANIFEST_v03_90_0.md` | `MANIFEST_v03_90_0.md` |
| `QA_REPORT_v03_90_0.md` | `QA_REPORT_v03_90_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_90_0.md CHANGELOG_v03_90_0.md MANIFEST_v03_90_0.md QA_REPORT_v03_90_0.md
git commit -m "ODIN V03.90.0 — додано New Chat Transfer Validator"
git push origin feature/odin-interface-v03
```
