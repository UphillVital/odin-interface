# README_v03_61_0 — System Lock Checkpoint v1

## Призначення пакету

Цей пакет додає System Lock Checkpoint у File Workspace.

## Що додається

- `Build System Lock`;
- `Copy System Lock`;
- checkpoint зі статусами:
  - `SYSTEM_LOCK_READY`;
  - `SYSTEM_LOCK_BLOCKED`;
- blocked gates summary;
- lockSummary;
- safety flags;
- nextAllowedStep.

## Правило безпеки

System Lock Checkpoint не змінює файли.  
Він тільки фіксує контрольний стан системи після Final Manifest.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_61_0.md` | `README_v03_61_0.md` |
| `CHANGELOG_v03_61_0.md` | `CHANGELOG_v03_61_0.md` |
| `MANIFEST_v03_61_0.md` | `MANIFEST_v03_61_0.md` |
| `QA_REPORT_v03_61_0.md` | `QA_REPORT_v03_61_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- Build System Lock формує JSON;
- без повного gate-flow статус SYSTEM_LOCK_BLOCKED;
- після повного gate-flow статус SYSTEM_LOCK_READY;
- Copy System Lock копіює JSON.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_61_0.md CHANGELOG_v03_61_0.md MANIFEST_v03_61_0.md QA_REPORT_v03_61_0.md
git commit -m "ODIN V03.61.0 — додано System Lock Checkpoint у File Workspace"
git push origin feature/odin-interface-v03
```
