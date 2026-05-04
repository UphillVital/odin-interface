# README_v03_150C_0 — System Mode Switch v1

## Призначення пакету

Цей пакет переводить ODIN у новий системний режим після завершення C-line activation cycle.

## Новий стан

```text
SYSTEM_MODE = NORMAL_OPERATION
ACTIVATION_STATE = COMPLETED
DATA_MODEL = ACTIVE_SOURCE_OF_TRUTH
ADAPTER = RUNTIME_LAYER
NEXT_LINE = D-LINE
```

## Що додається

- `dev/V03/odin_system_mode_switch_v03_150C.json`;
- UI-блок `System Mode — NORMAL OPERATION`;
- кнопки:
  - `View System State`;
  - `Copy System Mode JSON`.

## Дозволено після 150C

- normal operation;
- post-activation development;
- new module planning;
- runtime validation;
- UI to Data Model synchronization planning;
- performance optimization.

## Заборонено після 150C

- repeat activation without reset;
- return to pre-activation without reset;
- bypass active Data Model;
- use invalid packages 120–123;
- unsafe destructive operations;
- automatic rollback without manual decision.

## Наступна лінія

```text
D-LINE — Development after activation
```

## Наступний пакет

```text
PACKAGE 151D — Data Model Runtime Validation v1
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `dev/V03/odin_activation_completion_lock_v03_149C.json` | `dev/V03/odin_activation_completion_lock_v03_149C.json` |
| `dev/V03/odin_system_mode_switch_v03_150C.json` | `dev/V03/odin_system_mode_switch_v03_150C.json` |
| `README_v03_150C_0.md` | `README_v03_150C_0.md` |
| `CHANGELOG_v03_150C_0.md` | `CHANGELOG_v03_150C_0.md` |
| `MANIFEST_v03_150C_0.md` | `MANIFEST_v03_150C_0.md` |
| `QA_REPORT_v03_150C_0.md` | `QA_REPORT_v03_150C_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html dev/V03/odin_activation_completion_lock_v03_149C.json dev/V03/odin_system_mode_switch_v03_150C.json README_v03_150C_0.md CHANGELOG_v03_150C_0.md MANIFEST_v03_150C_0.md QA_REPORT_v03_150C_0.md
git commit -m "ODIN V03.150C — переведено систему в NORMAL_OPERATION"
git push origin feature/odin-interface-v03
```
