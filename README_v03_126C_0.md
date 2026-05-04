# README_v03_126C_0 — Data Model Source-of-Truth Candidate v1

## Призначення пакету

Цей пакет позначає stable-base Data Model як кандидата на майбутнє джерело істини.

## Важливо

Це ще НЕ активний source-of-truth.

```text
CANDIDATE_ONLY_NOT_ACTIVE
```

## Що додається

- `dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json`;
- `Build Source-of-Truth Candidate`;
- `Copy Candidate JSON`.

## Заборонено

- switch UI to data-model-only mode;
- replace current Control Center runtime logic;
- auto-migrate existing registry data;
- auto-write generated data files;
- auto-delete legacy structures;
- use invalid packages 120–123.

## Умови майбутньої активації

- Source-of-Truth Candidate QA must pass.
- Data Model Adapter Plan must exist.
- Read-only adapter preview must be built first.
- No UI overwrite is allowed.
- Manual approval required before source-of-truth activation.

## Наступний крок

```text
PACKAGE 127C — Source-of-Truth Candidate QA Gate v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json` | `dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json` |
| `README_v03_126C_0.md` | `README_v03_126C_0.md` |
| `CHANGELOG_v03_126C_0.md` | `CHANGELOG_v03_126C_0.md` |
| `MANIFEST_v03_126C_0.md` | `MANIFEST_v03_126C_0.md` |
| `QA_REPORT_v03_126C_0.md` | `QA_REPORT_v03_126C_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_data_model_hardening_router_v03_120C.json dev/V03/odin_unified_data_model_schema_v03_121C.json dev/V03/odin_data_model_schema_validator_v03_122C.json dev/V03/odin_data_model_registry_migration_map_v03_123C.json dev/V03/odin_data_model_migration_gate_v03_124C.json dev/V03/odin_data_model_stable_base_lock_v03_125C.json dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json README_v03_126C_0.md CHANGELOG_v03_126C_0.md MANIFEST_v03_126C_0.md QA_REPORT_v03_126C_0.md
git commit -m "ODIN V03.126C — додано Data Model Source-of-Truth Candidate"
git push origin feature/odin-interface-v03
```
