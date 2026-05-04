# README_v03_95_0 — ODIN Continuity Master Start v1

## Призначення пакету

Цей пакет додає ODIN Continuity Master Start у Control Center.

## Що додається

- `Build Master Start`;
- `Copy Master Start`;
- master-start package містить:
  - continuity final lock;
  - new chat transfer package;
  - start prompt;
  - recovery layer;
  - next action;
  - packageUse;
  - safetyRules.

## Команди

```text
ODIN SYSTEM — MASTER START
ODIN SYSTEM — CONTINUE FROM TRANSFER PACKAGE
```

## Правило

Master Start не запускає restore автоматично.  
Він тільки формує єдиний контрольний пакет запуску/продовження.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_95_0.md` | `README_v03_95_0.md` |
| `CHANGELOG_v03_95_0.md` | `CHANGELOG_v03_95_0.md` |
| `MANIFEST_v03_95_0.md` | `MANIFEST_v03_95_0.md` |
| `QA_REPORT_v03_95_0.md` | `QA_REPORT_v03_95_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_95_0.md CHANGELOG_v03_95_0.md MANIFEST_v03_95_0.md QA_REPORT_v03_95_0.md
git commit -m "ODIN V03.95.0 — додано ODIN Continuity Master Start"
git push origin feature/odin-interface-v03
```
