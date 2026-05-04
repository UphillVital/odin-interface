# README_v03_155D_0 — Runtime Interaction Layer v1

## Призначення пакету

Додає runtime interaction layer після UI/Data Model Sync Lock.

## Що додається

- `dev/V03/odin_runtime_interaction_layer_v03_155D.json`;
- UI-блок `Runtime Interaction Layer v1`;
- кнопки `Build Runtime Interaction Layer` і `Copy Runtime Interaction Layer`.

## Архітектурне значення

```text
UI EVENT → Runtime Interaction Layer → Data Model / Adapter rules
```

UI отримує контрольований канал взаємодій, але без прямого запису в Data Model.

## Дозволено

- read runtime state;
- copy runtime report;
- request controlled action.

## Заборонено

- direct data model mutation;
- direct JSON file write from UI;
- delete data model files;
- execute git;
- bypass runtime interaction layer;
- bypass active Data Model;
- enable write action without QA gate.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Runtime Interaction Layer v1`.
3. Натиснути `Build Runtime Interaction Layer`.
4. Очікувано:
   - `Status = RUNTIME_INTERACTION_LAYER_READY`;
   - `Mode = CONTROLLED_ACTIONS_THROUGH_DATA_MODEL`;
   - `Interaction types = 4`.
5. У JSON перевірити:
   - `sourceOfTruth = ACTIVE_DATA_MODEL`;
   - `adapter = RUNTIME_LAYER`.
6. У `interactionTypes` перевірити:
   - `View runtime state` → `allowed=true`, `writesData=false`;
   - `Copy runtime report` → `allowed=true`, `writesData=false`;
   - `Request controlled action` → `allowed=true`, `requiresQa=true`, `writesData=false`;
   - `Execute direct write` → `allowed=false`, `writesData=true`.
7. Якщо `Execute direct write` має `allowed=true` — зупинитись і повернутись до 154D.

## Наступний крок

```text
PACKAGE 156D — Runtime Interaction QA Gate v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_runtime_interaction_layer_v03_155D.json README_v03_155D_0.md CHANGELOG_v03_155D_0.md MANIFEST_v03_155D_0.md QA_REPORT_v03_155D_0.md
git commit -m "ODIN V03.155D — додано Runtime Interaction Layer"
git push origin feature/odin-interface-v03
```
