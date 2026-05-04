# README_v03_151D_0 — Data Model Runtime Validation v1

## Призначення пакету

Перший пакет D-line після System Mode Switch 150C.

Мета — перевірити, що система реально працює у новому режимі:

```text
SYSTEM_MODE = NORMAL_OPERATION
DATA_MODEL = ACTIVE_SOURCE_OF_TRUTH
ADAPTER = RUNTIME_LAYER
LINE = D-LINE
```

## Що додано

- `dev/V03/odin_data_model_runtime_validation_v03_151D.json`;
- UI-блок `Data Model Runtime Validation v1`;
- кнопки:
  - `Run Runtime Validation`;
  - `Copy Runtime Validation`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `System Mode — NORMAL OPERATION`.
3. Натиснути `View System State`.
4. Перевірити:
   - `status = SYSTEM_MODE_ACTIVE`;
   - `systemMode = NORMAL_OPERATION`;
   - `dataModel.status = ACTIVE_SOURCE_OF_TRUTH`;
   - `dataModel.adapter = RUNTIME_LAYER`;
   - `nextLine = D-LINE`.
5. Знайти блок `Data Model Runtime Validation`.
6. Натиснути `Run Runtime Validation`.
7. Очікувано:
   - `RUNTIME_VALIDATION_PASSED`;
   - `Failed = 0`.
8. Якщо є fail — не переходити до 152D.

## Наступний крок

```text
PACKAGE 152D — UI to Data Model Sync Layer v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_system_mode_switch_v03_150C.json dev/V03/odin_data_model_runtime_validation_v03_151D.json README_v03_151D_0.md CHANGELOG_v03_151D_0.md MANIFEST_v03_151D_0.md QA_REPORT_v03_151D_0.md
git commit -m "ODIN V03.151D — додано Data Model Runtime Validation"
git push origin feature/odin-interface-v03
```
