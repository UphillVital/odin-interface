# README_v03_154D_0 — UI/Data Model Sync Lock v1

## Призначення пакету

Цей пакет фіксує UI/Data Model Sync як стабільний read-only enforced шар.

## Що додається

- `dev/V03/odin_ui_data_model_sync_lock_v03_154D.json`;
- UI-блок `UI/Data Model Sync Lock v1`;
- кнопки:
  - `Build Sync Lock`;
  - `Copy Sync Lock`.

## Архітектурне значення

Після цього пакету:

```text
UI = display + controlled triggers
Data Model = ACTIVE_SOURCE_OF_TRUTH
Adapter = RUNTIME_LAYER
Sync Mode = READ_ONLY_ENFORCED
```

UI більше не має права бути власним джерелом істини або писати у Data Model без окремого approved write-capable шару.

## Зафіксовано

- UI не пише Data Model JSON.
- UI не видаляє Data Model файли.
- UI не обходить active Data Model.
- UI читає runtime state через sync layer.
- Усі sync targets мають `writeAllowed=false`.
- Runtime replacement можливий тільки через окремий QA-approved package.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `UI/Data Model Sync Lock v1`.
3. Натиснути `Build Sync Lock`.
4. Очікувано:
   - `Status = UI_DATA_MODEL_SYNC_LOCKED`;
   - `Sync Mode = READ_ONLY_ENFORCED`;
   - `Targets = 3`.
5. У JSON перевірити:
   - `dataModel = ACTIVE_SOURCE_OF_TRUTH`;
   - `adapter = RUNTIME_LAYER`;
   - `syncMode = READ_ONLY_ENFORCED`.
6. Перевірити `lockedTargets`:
   - кожен target має `writeAllowed=false`.
7. Перевірити `blockedActions`:
   - `write data model files from UI`;
   - `delete data model files`;
   - `execute git`;
   - `bypass Data Model`;
   - `replace runtime without QA`;
   - `use invalid packages 120–123`;
   - `change writeAllowed to true without new QA gate`.
8. Якщо блок `UI/Data Model Sync QA Gate` присутній — натиснути `Run Sync QA`.
9. Очікувано:
   - `UI_DATA_MODEL_SYNC_QA_PASSED`;
   - `Failed = 0`.
10. Якщо будь-який пункт не сходиться — зупинка, не переходити до 155D, повернення до 152D/153D.

## Заборонено

- write data model files from UI;
- delete data model files;
- execute git;
- bypass Data Model;
- replace runtime without QA;
- use invalid packages 120–123;
- change `writeAllowed` to `true` without new QA gate.

## Наступний крок

```text
PACKAGE 155D — Runtime Interaction Layer v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json` | `dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json` |
| `dev/V03/odin_ui_data_model_sync_qa_gate_v03_153D.json` | `dev/V03/odin_ui_data_model_sync_qa_gate_v03_153D.json` |
| `dev/V03/odin_ui_data_model_sync_lock_v03_154D.json` | `dev/V03/odin_ui_data_model_sync_lock_v03_154D.json` |
| `README_v03_154D_0.md` | `README_v03_154D_0.md` |
| `CHANGELOG_v03_154D_0.md` | `CHANGELOG_v03_154D_0.md` |
| `MANIFEST_v03_154D_0.md` | `MANIFEST_v03_154D_0.md` |
| `QA_REPORT_v03_154D_0.md` | `QA_REPORT_v03_154D_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_ui_to_data_model_sync_layer_v03_152D.json dev/V03/odin_ui_data_model_sync_qa_gate_v03_153D.json dev/V03/odin_ui_data_model_sync_lock_v03_154D.json README_v03_154D_0.md CHANGELOG_v03_154D_0.md MANIFEST_v03_154D_0.md QA_REPORT_v03_154D_0.md
git commit -m "ODIN V03.154D — зафіксовано UI/Data Model Sync Lock"
git push origin feature/odin-interface-v03
```
