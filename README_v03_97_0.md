# README_v03_97_0 — ODIN Master Start Button Registry v1

## Призначення пакету

Цей пакет додає реєстр системної кнопки/дії ODIN SYSTEM — MASTER START.

## Що додається

- `Build Button Registry`;
- `Copy Button Registry`;
- button registry:
  - id;
  - label;
  - command;
  - location;
  - enabled;
  - actionType;
  - output;
- launchConditions;
- safetyRules.

## Команда

```text
ODIN SYSTEM — MASTER START
```

## Правило

Кнопка вважається офіційно дозволеною тільки якщо:

```text
Master Start Final Lock = MASTER_START_FINAL_LOCKED
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_97_0.md` | `README_v03_97_0.md` |
| `CHANGELOG_v03_97_0.md` | `CHANGELOG_v03_97_0.md` |
| `MANIFEST_v03_97_0.md` | `MANIFEST_v03_97_0.md` |
| `QA_REPORT_v03_97_0.md` | `QA_REPORT_v03_97_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_97_0.md CHANGELOG_v03_97_0.md MANIFEST_v03_97_0.md QA_REPORT_v03_97_0.md
git commit -m "ODIN V03.97.0 — додано реєстр кнопки ODIN Master Start"
git push origin feature/odin-interface-v03
```
