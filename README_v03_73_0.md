# README_v03_73_0 — ODIN Next Action Router v1

## Призначення пакету

Цей пакет додає ODIN Next Action Router у Control Center.

## Що додається

- `ODIN Next Action Router v1`;
- `Build Next Action`;
- `Copy Next Action`;
- route map:
  - `CONTROL_SURFACE_BLOCKED` → `RESOLVE_BLOCKERS`;
  - `CONTROL_SURFACE_CONDITIONAL` → `RESOLVE_CONDITIONAL_ITEMS`;
  - `CONTROL_SURFACE_READY` → `PROCEED_TO_NEXT_ARCHITECTURE_LAYER`;
- nextPrompt.

## Правило

Router не виконує дії автоматично.  
Він тільки формує наступну дозволену дію.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_73_0.md` | `README_v03_73_0.md` |
| `CHANGELOG_v03_73_0.md` | `CHANGELOG_v03_73_0.md` |
| `MANIFEST_v03_73_0.md` | `MANIFEST_v03_73_0.md` |
| `QA_REPORT_v03_73_0.md` | `QA_REPORT_v03_73_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_73_0.md CHANGELOG_v03_73_0.md MANIFEST_v03_73_0.md QA_REPORT_v03_73_0.md
git commit -m "ODIN V03.73.0 — додано ODIN Next Action Router"
git push origin feature/odin-interface-v03
```
