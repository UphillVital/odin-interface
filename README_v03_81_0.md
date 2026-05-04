# README_v03_81_0 — ODIN State Snapshot / Full Recovery Export v1

## Призначення пакету

Цей пакет додає повний snapshot стану ODIN Control Center для відновлення.

## Що додається

- `Build ODIN State Snapshot`;
- `Copy ODIN State Snapshot`;
- snapshot preview textarea;
- snapshot містить:
  - runtime;
  - rules;
  - decisions;
  - integration;
  - closedLoop;
  - controlSurface;
  - nextAction;
  - actionQueueRecovery;
  - actionQueueState;
  - safety flags;
  - restoreInstruction.

## Правило

Snapshot не виконує дії автоматично.  
Це тільки переносимий контрольний JSON для відновлення стану.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_81_0.md` | `README_v03_81_0.md` |
| `CHANGELOG_v03_81_0.md` | `CHANGELOG_v03_81_0.md` |
| `MANIFEST_v03_81_0.md` | `MANIFEST_v03_81_0.md` |
| `QA_REPORT_v03_81_0.md` | `QA_REPORT_v03_81_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_81_0.md CHANGELOG_v03_81_0.md MANIFEST_v03_81_0.md QA_REPORT_v03_81_0.md
git commit -m "ODIN V03.81.0 — додано повний State Snapshot для відновлення"
git push origin feature/odin-interface-v03
```
