# README_v03_80_0 — Action Queue Lock / Recovery Checkpoint v1

## Призначення пакету

Цей пакет додає recovery checkpoint для Action Queue.

## Що додається

- `Build Queue Recovery Checkpoint`;
- `Copy Queue Recovery Checkpoint`;
- checkpoint містить:
  - queue;
  - archive;
  - metrics;
  - checks;
  - restoreInstruction;
  - safety flags.

## Статуси

```text
QUEUE_RECOVERY_READY
QUEUE_RECOVERY_NOT_READY
```

## Правило

Recovery checkpoint не виконує задачі.  
Він тільки підтверджує, що queue/archive можна експортувати й відновити.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_80_0.md` | `README_v03_80_0.md` |
| `CHANGELOG_v03_80_0.md` | `CHANGELOG_v03_80_0.md` |
| `MANIFEST_v03_80_0.md` | `MANIFEST_v03_80_0.md` |
| `QA_REPORT_v03_80_0.md` | `QA_REPORT_v03_80_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_80_0.md CHANGELOG_v03_80_0.md MANIFEST_v03_80_0.md QA_REPORT_v03_80_0.md
git commit -m "ODIN V03.80.0 — додано recovery checkpoint для Action Queue"
git push origin feature/odin-interface-v03
```
