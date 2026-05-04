# README_v03_87_0 — Recovery Final Checkpoint v1

## Призначення пакету

Цей пакет додає фінальний checkpoint шару відновлення ODIN.

## Що додається

- `Build Recovery Final Checkpoint`;
- `Copy Recovery Final Checkpoint`;
- статуси:
  - `RECOVERY_FINAL_READY`;
  - `RECOVERY_FINAL_WAITING`;
  - `RECOVERY_FINAL_NEEDS_REVIEW`;
- checks:
  - recovery lock;
  - snapshot input;
  - integrity;
  - restore audit;
  - no automatic restore;
  - no automatic git.

## Правило

Recovery Final Checkpoint не запускає restore.  
Він тільки фіксує, чи recovery layer готовий.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_87_0.md` | `README_v03_87_0.md` |
| `CHANGELOG_v03_87_0.md` | `CHANGELOG_v03_87_0.md` |
| `MANIFEST_v03_87_0.md` | `MANIFEST_v03_87_0.md` |
| `QA_REPORT_v03_87_0.md` | `QA_REPORT_v03_87_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_87_0.md CHANGELOG_v03_87_0.md MANIFEST_v03_87_0.md QA_REPORT_v03_87_0.md
git commit -m "ODIN V03.87.0 — додано Recovery Final Checkpoint"
git push origin feature/odin-interface-v03
```
