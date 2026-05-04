# README_v03_153D_0 — UI/Data Model Sync QA Gate v1

## Призначення пакету

Додає QA Gate для UI to Data Model Sync Layer.

## Що тестувати

1. Відкрити `dev/V03/control_center.html`.
2. Знайти блок `UI/Data Model Sync QA Gate`.
3. Натиснути `Run Sync QA`.
4. Очікувано:
   - `UI_DATA_MODEL_SYNC_QA_PASSED`;
   - `Failed = 0`.
5. У звіті перевірити:
   - Sync mode = `READ_RUNTIME_STATE_FROM_DATA_MODEL`;
   - Data Model = `ACTIVE_SOURCE_OF_TRUTH`;
   - Adapter = `RUNTIME_LAYER`;
   - усі targets мають `writeAllowed=false`.

## Статуси

```text
UI_DATA_MODEL_SYNC_QA_PASSED
UI_DATA_MODEL_SYNC_QA_FAILED
```

## Наступний крок

```text
PACKAGE 154D — UI/Data Model Sync Lock v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json dev/V03/odin_ui_data_model_sync_qa_gate_v03_153D.json README_v03_153D_0.md CHANGELOG_v03_153D_0.md MANIFEST_v03_153D_0.md QA_REPORT_v03_153D_0.md
git commit -m "ODIN V03.153D — додано QA Gate для UI/Data Model Sync"
git push origin feature/odin-interface-v03
```
