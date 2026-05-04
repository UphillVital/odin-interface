# README_v03_74_0 — ODIN Action Queue / Next Task Board v1

## Призначення пакету

Цей пакет додає Action Queue / Next Task Board у Control Center.

## Що додається

- `ODIN Action Queue / Next Task Board v1`;
- `Build Action Queue`;
- `Copy Action Queue`;
- `Clear Action Queue`;
- збереження черги у `localStorage`;
- task item містить:
  - sourceRoute;
  - title;
  - action;
  - priority;
  - status;
  - gateRule;
  - nextPrompt.

## Правило

Action Queue не виконує задачі автоматично.  
Вона тільки перетворює route у керований task item.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_74_0.md` | `README_v03_74_0.md` |
| `CHANGELOG_v03_74_0.md` | `CHANGELOG_v03_74_0.md` |
| `MANIFEST_v03_74_0.md` | `MANIFEST_v03_74_0.md` |
| `QA_REPORT_v03_74_0.md` | `QA_REPORT_v03_74_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_74_0.md CHANGELOG_v03_74_0.md MANIFEST_v03_74_0.md QA_REPORT_v03_74_0.md
git commit -m "ODIN V03.74.0 — додано Action Queue та Next Task Board"
git push origin feature/odin-interface-v03
```
