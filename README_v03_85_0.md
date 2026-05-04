# README_v03_85_0 — Recovery Control Panel v1

## Призначення пакету

Цей пакет додає Recovery Control Panel у Control Center.

## Що додається

- `Build Recovery Panel`;
- `Copy Recovery Panel`;
- Recovery Panel показує:
  - snapshot input status;
  - integrity status;
  - restore audit count;
  - last restore;
  - allowed recovery actions;
  - blocked reason;
  - next step.

## Статуси

```text
RECOVERY_READY
RECOVERY_BLOCKED
RECOVERY_WAITING_FOR_SNAPSHOT
```

## Правило

Recovery Panel не виконує restore автоматично.  
Він тільки показує, чи дозволений restore і що треба зробити далі.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_85_0.md` | `README_v03_85_0.md` |
| `CHANGELOG_v03_85_0.md` | `CHANGELOG_v03_85_0.md` |
| `MANIFEST_v03_85_0.md` | `MANIFEST_v03_85_0.md` |
| `QA_REPORT_v03_85_0.md` | `QA_REPORT_v03_85_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_85_0.md CHANGELOG_v03_85_0.md MANIFEST_v03_85_0.md QA_REPORT_v03_85_0.md
git commit -m "ODIN V03.85.0 — додано Recovery Control Panel"
git push origin feature/odin-interface-v03
```
