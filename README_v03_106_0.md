# README_v03_106_0 — Quick Settings / Language Switch Regression Gate v1

## Призначення пакету

Цей пакет додає regression gate для Quick Settings, перемикача мов і Master Start.

## Що додається

- `Run Regression Gate`;
- `Copy Regression Gate`;
- перевірки:
  - Quick Settings marker;
  - language switch marker;
  - Master Start visible action;
  - Master Start Registry;
  - Master Start Final Lock;
  - Quick Settings QA;
  - UI Matrix marker;
  - no auto restore;
  - no auto git;
  - V03.100 stable base marker.

## Навіщо

Це захист від повторення дефекту, коли у Quick Settings зникає перемикач мов або системні дії перестають відповідати ODIN UI Matrix.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_106_0.md` | `README_v03_106_0.md` |
| `CHANGELOG_v03_106_0.md` | `CHANGELOG_v03_106_0.md` |
| `MANIFEST_v03_106_0.md` | `MANIFEST_v03_106_0.md` |
| `QA_REPORT_v03_106_0.md` | `QA_REPORT_v03_106_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_106_0.md CHANGELOG_v03_106_0.md MANIFEST_v03_106_0.md QA_REPORT_v03_106_0.md
git commit -m "ODIN V03.106.0 — додано Regression Gate для Quick Settings та перемикача мов"
git push origin feature/odin-interface-v03
```
