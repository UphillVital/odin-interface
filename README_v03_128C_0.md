# README_v03_128C_0 — Data Model Adapter Plan v1

## Призначення пакету

Цей пакет додає план adapter-layer між Data Model і UI.

## Важливо

Adapter Plan є тільки планом read-only preview.

```text
READ_ONLY_PREVIEW_PLAN
SOURCE_OF_TRUTH_NOT_ACTIVE
```

## Що додається

- `dev/V03/odin_data_model_adapter_plan_v03_128C.json`;
- `Build Adapter Plan`;
- `Copy Adapter Plan`;
- `Copy Adapter Summary`.

## Adapter layers

- Data Loader;
- Record Normalizer;
- UI Preview Renderer;
- Safety Guard.

## Дозволено

- load data model JSON as text/reference;
- preview normalized records in memory;
- copy adapter preview report;
- compare data model shape against current UI concepts.

## Заборонено

- activate data model as source of truth;
- replace Control Center runtime logic;
- write normalized records to files;
- delete legacy structures;
- execute git;
- use invalid packages 120–123.

## Наступний крок

```text
PACKAGE 129C — Data Model Adapter Plan QA Gate v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_data_model_adapter_plan_v03_128C.json` | `dev/V03/odin_data_model_adapter_plan_v03_128C.json` |
| `README_v03_128C_0.md` | `README_v03_128C_0.md` |
| `CHANGELOG_v03_128C_0.md` | `CHANGELOG_v03_128C_0.md` |
| `MANIFEST_v03_128C_0.md` | `MANIFEST_v03_128C_0.md` |
| `QA_REPORT_v03_128C_0.md` | `QA_REPORT_v03_128C_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_data_model_hardening_router_v03_120C.json dev/V03/odin_unified_data_model_schema_v03_121C.json dev/V03/odin_data_model_schema_validator_v03_122C.json dev/V03/odin_data_model_registry_migration_map_v03_123C.json dev/V03/odin_data_model_migration_gate_v03_124C.json dev/V03/odin_data_model_stable_base_lock_v03_125C.json dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json dev/V03/odin_source_of_truth_candidate_qa_gate_v03_127C.json dev/V03/odin_data_model_adapter_plan_v03_128C.json README_v03_128C_0.md CHANGELOG_v03_128C_0.md MANIFEST_v03_128C_0.md QA_REPORT_v03_128C_0.md
git commit -m "ODIN V03.128C — додано Data Model Adapter Plan"
git push origin feature/odin-interface-v03
```
