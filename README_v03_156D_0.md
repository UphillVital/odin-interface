# README_v03_156D_0 — Runtime Interaction QA Gate v1

## Призначення пакету

Додає QA Gate для Runtime Interaction Layer 155D.

## Що додається

- `dev/V03/odin_runtime_interaction_qa_gate_v03_156D.json`;
- UI-блок `Runtime Interaction QA Gate v1`;
- кнопки:
  - `Run Runtime Interaction QA`;
  - `Copy Runtime Interaction QA Report`;
  - `Copy QA Gate JSON`.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Runtime Interaction QA Gate v1`.
3. Натиснути `Run Runtime Interaction QA`.
4. Очікувано:
   - `Status = RUNTIME_INTERACTION_QA_PASSED`;
   - `Failed = 0`.
5. У QA Report перевірити:
   - `Interaction mode = CONTROLLED_ACTIONS_THROUGH_DATA_MODEL`;
   - `sourceOfTruth = ACTIVE_DATA_MODEL`;
   - `adapter = RUNTIME_LAYER`.
6. Перевірити interaction types:
   - `View runtime state` → `allowed=true`, `writesData=false`;
   - `Copy runtime report` → `allowed=true`, `writesData=false`;
   - `Request controlled action` → `allowed=true`, `requiresQa=true`, `writesData=false`;
   - `Execute direct write` → `allowed=false`, `writesData=true`.
7. Перевірити blocked actions:
   - direct data model mutation;
   - direct JSON file write from UI;
   - delete data model files;
   - execute git;
   - bypass runtime interaction layer;
   - bypass active Data Model;
   - enable write action without QA gate.
8. Якщо `Failed > 0` — не переходити до 157D.
9. Якщо direct WRITE дозволений — зупинка, повернення до 155D.

## Статуси

```text
RUNTIME_INTERACTION_QA_PASSED
RUNTIME_INTERACTION_QA_FAILED
```

## Наступний крок

```text
PACKAGE 157D — Runtime Interaction Lock v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_runtime_interaction_layer_v03_155D.json dev/V03/odin_runtime_interaction_qa_gate_v03_156D.json README_v03_156D_0.md CHANGELOG_v03_156D_0.md MANIFEST_v03_156D_0.md QA_REPORT_v03_156D_0.md
git commit -m "ODIN V03.156D — додано QA Gate для Runtime Interaction Layer"
git push origin feature/odin-interface-v03
```
