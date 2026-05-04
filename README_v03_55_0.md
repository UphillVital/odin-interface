# README_v03_55_0 — Implementation Package Builder v1

## Призначення пакету

Цей пакет додає Implementation Package Builder у File Workspace.

## Що додається

- `Build Implementation Package`;
- `Copy Implementation Package`;
- preview textarea;
- Implementation Package Draft містить:
  - sourceQueueItem;
  - target;
  - approvalStatus;
  - allowedToImplement;
  - proposedChanges;
  - documentationDraft;
  - qaGate;
  - gitDraft.

## Правило безпеки

Implementation Package Builder v1 не редагує файли.  
Він створює тільки draft-пакет для майбутньої реалізації.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_55_0.md` | `README_v03_55_0.md` |
| `CHANGELOG_v03_55_0.md` | `CHANGELOG_v03_55_0.md` |
| `MANIFEST_v03_55_0.md` | `MANIFEST_v03_55_0.md` |
| `QA_REPORT_v03_55_0.md` | `QA_REPORT_v03_55_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- без queue package має статус DRAFT_WITHOUT_QUEUE;
- Approve → Add to Queue → Build Implementation Package;
- allowedToImplement = true тільки якщо є APPROVED + queue item;
- Copy Implementation Package копіює JSON.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_55_0.md CHANGELOG_v03_55_0.md MANIFEST_v03_55_0.md QA_REPORT_v03_55_0.md
git commit -m "ODIN V03.55.0 — додано Implementation Package Builder у File Workspace"
git push origin feature/odin-interface-v03
```
