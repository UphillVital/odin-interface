# README_v03_127C_0 — Source-of-Truth Candidate QA Gate v1

## Призначення пакету

Цей пакет додає QA Gate для Data Model Source-of-Truth Candidate.

## Що додається

- `dev/V03/odin_source_of_truth_candidate_qa_gate_v03_127C.json`;
- `Run Candidate QA`;
- `Copy Candidate QA Report`;
- `Copy Candidate QA Gate JSON`.

## Що перевіряється

- candidate status ready;
- candidate-only mode;
- stable lock ready;
- candidate scope;
- activation requirements;
- read-only safety;
- no automatic migration;
- no automatic write;
- no automatic git;
- no UI replacement;
- invalid branch blocked.

## Статуси

```text
SOURCE_OF_TRUTH_CANDIDATE_QA_PASSED
SOURCE_OF_TRUTH_CANDIDATE_QA_FAILED
```

## Важливо

Навіть якщо QA passed — source-of-truth НЕ активується автоматично.

## Наступний крок

```text
PACKAGE 128C — Data Model Adapter Plan v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_source_of_truth_candidate_qa_gate_v03_127C.json` | `dev/V03/odin_source_of_truth_candidate_qa_gate_v03_127C.json` |
| `README_v03_127C_0.md` | `README_v03_127C_0.md` |
| `CHANGELOG_v03_127C_0.md` | `CHANGELOG_v03_127C_0.md` |
| `MANIFEST_v03_127C_0.md` | `MANIFEST_v03_127C_0.md` |
| `QA_REPORT_v03_127C_0.md` | `QA_REPORT_v03_127C_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_data_model_hardening_router_v03_120C.json dev/V03/odin_unified_data_model_schema_v03_121C.json dev/V03/odin_data_model_schema_validator_v03_122C.json dev/V03/odin_data_model_registry_migration_map_v03_123C.json dev/V03/odin_data_model_migration_gate_v03_124C.json dev/V03/odin_data_model_stable_base_lock_v03_125C.json dev/V03/odin_data_model_source_of_truth_candidate_v03_126C.json dev/V03/odin_source_of_truth_candidate_qa_gate_v03_127C.json README_v03_127C_0.md CHANGELOG_v03_127C_0.md MANIFEST_v03_127C_0.md QA_REPORT_v03_127C_0.md
git commit -m "ODIN V03.127C — додано QA Gate для Source-of-Truth Candidate"
git push origin feature/odin-interface-v03
```
