# README_v03_51_0 — File Change Plan v1

## Призначення пакету

Цей пакет додає у File Workspace структурований план зміни файлу.

## Що додається

- `File Change Plan v1`;
- `Preview Change Plan`;
- `Copy Change Plan`;
- план містить:
  - target;
  - scope;
  - expectedResult;
  - forbidden actions;
  - riskAssessment;
  - qaChecklist;
  - approvalGate.

## Правило безпеки

File Change Plan v1 не редагує файли.  
Це тільки план. Реальне редагування можливе лише після approval gate.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_51_0.md` | `README_v03_51_0.md` |
| `CHANGELOG_v03_51_0.md` | `CHANGELOG_v03_51_0.md` |
| `MANIFEST_v03_51_0.md` | `MANIFEST_v03_51_0.md` |
| `QA_REPORT_v03_51_0.md` | `QA_REPORT_v03_51_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Перевірити:
- `Preview Change Plan` заповнює textarea;
- `Copy Change Plan` копіює JSON;
- після завантаження Bridge JSON план оновлюється;
- approvalGate = WAITING_APPROVAL.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_51_0.md CHANGELOG_v03_51_0.md MANIFEST_v03_51_0.md QA_REPORT_v03_51_0.md
git commit -m "ODIN V03.51.0 — додано File Change Plan у File Workspace"
git push origin feature/odin-interface-v03
```
