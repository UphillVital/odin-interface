# README_v03_122_0 — Data Model Schema Validator v1

## Призначення пакету

Цей пакет додає validator для `Unified Data Model Schema v1`.

## Що додається

- `dev/V03/odin_data_model_schema_validator_v1.json`;
- `Run Schema Validator`;
- `Copy Validation Report`;
- `Copy Validator JSON`;
- validation report:
  - `SCHEMA_VALID`;
  - `SCHEMA_INVALID`.

## Що перевіряється

- meta;
- coreTypes;
- module / record / gate / lock / check / action;
- unifiedRecordShape;
- safetyRules;
- migrationTargets;
- nextStep;
- required safety rules.

## Наступний крок

```text
PACKAGE 123 — Data Model Registry Migration Map v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_unified_data_model_schema_v1.json` | `dev/V03/odin_unified_data_model_schema_v1.json` |
| `dev/V03/odin_data_model_schema_validator_v1.json` | `dev/V03/odin_data_model_schema_validator_v1.json` |
| `README_v03_122_0.md` | `README_v03_122_0.md` |
| `CHANGELOG_v03_122_0.md` | `CHANGELOG_v03_122_0.md` |
| `MANIFEST_v03_122_0.md` | `MANIFEST_v03_122_0.md` |
| `QA_REPORT_v03_122_0.md` | `QA_REPORT_v03_122_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_unified_data_model_schema_v1.json dev/V03/odin_data_model_schema_validator_v1.json README_v03_122_0.md CHANGELOG_v03_122_0.md MANIFEST_v03_122_0.md QA_REPORT_v03_122_0.md
git commit -m "ODIN V03.122.0 — додано Data Model Schema Validator"
git push origin feature/odin-interface-v03
```
