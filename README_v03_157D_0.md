# README_v03_157D_0 — Runtime Interaction Lock v1

## Призначення пакету

Фіксує Runtime Interaction Layer як стабільний контрольований шар.

## Що додається

- `dev/V03/odin_runtime_interaction_lock_v03_157D.json`;
- UI-блок `Runtime Interaction Lock v1`;
- кнопки:
  - `Build Runtime Interaction Lock`;
  - `Copy Runtime Interaction Lock`.

## Зафіксована архітектура

```text
UI EVENT → Runtime Interaction Layer → Data Model / Adapter rules
```

## Дозволено

- READ: `View runtime state`;
- COPY: `Copy runtime report`;
- REQUEST: `Request controlled action`, але тільки як контрольований запит із QA.

## Заборонено

- direct WRITE;
- direct data model mutation;
- direct JSON file write from UI;
- delete data model files;
- execute git;
- bypass runtime interaction layer;
- bypass active Data Model;
- enable write action without QA gate.

## Що тестувати

1. Відкрити `dev/V03/control_center.html` через Live Server.
2. Знайти блок `Runtime Interaction Lock v1`.
3. Натиснути `Build Runtime Interaction Lock`.
4. Очікувано:
   - `Status = RUNTIME_INTERACTION_LOCKED`;
   - `Mode = CONTROLLED_ACTIONS_THROUGH_DATA_MODEL_LOCKED`;
   - `Locked interactions = 4`.
5. У JSON перевірити:
   - `sourceOfTruth = ACTIVE_DATA_MODEL`;
   - `adapter = RUNTIME_LAYER`.
6. У `lockedInteractions` перевірити:
   - `View runtime state` → `allowed=true`, `writesData=false`;
   - `Copy runtime report` → `allowed=true`, `writesData=false`;
   - `Request controlled action` → `allowed=true`, `requiresQa=true`, `writesData=false`;
   - `Execute direct write` → `allowed=false`, `writesData=true`.
7. У `blockedActions` перевірити:
   - direct data model mutation;
   - direct JSON file write from UI;
   - delete data model files;
   - execute git;
   - bypass runtime interaction layer;
   - bypass active Data Model;
   - enable write action without QA gate.
8. Якщо direct WRITE дозволений — зупинка, повернення до 155D/156D.

## Наступний крок

```text
PACKAGE 158D — Controlled Action Request Layer v1
```

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_runtime_interaction_layer_v03_155D.json dev/V03/odin_runtime_interaction_qa_gate_v03_156D.json dev/V03/odin_runtime_interaction_lock_v03_157D.json README_v03_157D_0.md CHANGELOG_v03_157D_0.md MANIFEST_v03_157D_0.md QA_REPORT_v03_157D_0.md
git commit -m "ODIN V03.157D — зафіксовано Runtime Interaction Lock"
git push origin feature/odin-interface-v03
```
