# README_v03_152D_0 — UI to Data Model Sync Layer v1

## Призначення пакету

Додає перший D-line sync-шар між UI та Data Model.

## Що додається

- `dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json`;
- UI-блок `UI to Data Model Sync Layer v1`;
- кнопки:
  - `Build Sync Layer`;
  - `Copy Sync Layer`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html`.
2. Переконатись, що блок `System Mode — NORMAL OPERATION` присутній.
3. Переконатись, що блок `Data Model Runtime Validation` присутній.
4. Знайти блок `UI to Data Model Sync Layer`.
5. Натиснути `Build Sync Layer`.
6. Очікувано:
   - `UI_DATA_MODEL_SYNC_LAYER_READY`;
   - `READ_RUNTIME_STATE_FROM_DATA_MODEL`;
   - `Targets: 3`.
7. Перевірити, що `writeAllowed = false` для всіх sync targets.

## Заборонено

- write data model files from UI;
- delete data model files;
- execute git;
- bypass Data Model;
- replace runtime without QA;
- use invalid packages 120–123.

## Наступний крок

```text
PACKAGE 153D — UI/Data Model Sync QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json README_v03_152D_0.md CHANGELOG_v03_152D_0.md MANIFEST_v03_152D_0.md QA_REPORT_v03_152D_0.md
git commit -m "ODIN V03.152D — додано UI to Data Model Sync Layer"
git push origin feature/odin-interface-v03
```
