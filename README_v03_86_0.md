# README_v03_86_0 — Recovery Lock / Restore Readiness v1

## Призначення пакету

Цей пакет додає Recovery Lock / Restore Readiness у Control Center.

## Що додається

- `Build Recovery Lock`;
- `Copy Recovery Lock`;
- статуси:
  - `RESTORE_READY_LOCKED`;
  - `RESTORE_LOCK_BLOCKED`;
- readiness summary:
  - snapshotInput;
  - integrityStatus;
  - importAllowed;
  - restoreAuditCount;
- blockedReason;
- restoreRule.

## Правило

Restore дозволений тільки якщо:

```text
Recovery Panel = RECOVERY_READY
Snapshot Integrity = SNAPSHOT_VALID
Import allowed = true
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_86_0.md` | `README_v03_86_0.md` |
| `CHANGELOG_v03_86_0.md` | `CHANGELOG_v03_86_0.md` |
| `MANIFEST_v03_86_0.md` | `MANIFEST_v03_86_0.md` |
| `QA_REPORT_v03_86_0.md` | `QA_REPORT_v03_86_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_86_0.md CHANGELOG_v03_86_0.md MANIFEST_v03_86_0.md QA_REPORT_v03_86_0.md
git commit -m "ODIN V03.86.0 — додано Recovery Lock та Restore Readiness"
git push origin feature/odin-interface-v03
```
