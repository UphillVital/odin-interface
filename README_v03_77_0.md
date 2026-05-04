# README_v03_77_0 — Action Queue Summary / Metrics v1

## Призначення пакету

Цей пакет додає коротку аналітику для Action Queue.

## Що додається

- `Action Queue Metrics`;
- підрахунок задач за статусами:
  - READY_FOR_REVIEW;
  - IN_PROGRESS;
  - DONE;
  - BLOCKED;
- підрахунок за priority;
- `nextSignal`;
- filteredTotal;
- `Copy Action Queue` тепер включає metrics.

## Next Signal

```text
BLOCKED > 0        → RESOLVE_BLOCKED_TASKS
IN_PROGRESS > 0    → CONTINUE_IN_PROGRESS
READY_FOR_REVIEW>0 → REVIEW_READY_TASKS
DONE > 0           → ARCHIVE_OR_CONFIRM_DONE
empty              → QUEUE_EMPTY
```

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_77_0.md` | `README_v03_77_0.md` |
| `CHANGELOG_v03_77_0.md` | `CHANGELOG_v03_77_0.md` |
| `MANIFEST_v03_77_0.md` | `MANIFEST_v03_77_0.md` |
| `QA_REPORT_v03_77_0.md` | `QA_REPORT_v03_77_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_77_0.md CHANGELOG_v03_77_0.md MANIFEST_v03_77_0.md QA_REPORT_v03_77_0.md
git commit -m "ODIN V03.77.0 — додано метрики для Action Queue"
git push origin feature/odin-interface-v03
```
