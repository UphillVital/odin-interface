# README_v03_103_0 — UI Polish / Consistency Pass Router v1

## Призначення пакету

Цей пакет запускає перший рекомендований next-layer маршрут після V03.100: UI Polish / Consistency Pass.

## Що додається

- `Build UI Polish Router`;
- `Copy UI Polish Router`;
- список UI polish задач:
  - Quick Settings consistency;
  - Language switch preservation;
  - ODIN UI Matrix compliance;
  - Control Center / File Workspace alignment;
  - Standalone pollution review.

## Правило

UI polish не змінює архітектуру.  
Він тільки готує контрольований аудит і наступний пакет перевірки.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_103_0.md` | `README_v03_103_0.md` |
| `CHANGELOG_v03_103_0.md` | `CHANGELOG_v03_103_0.md` |
| `MANIFEST_v03_103_0.md` | `MANIFEST_v03_103_0.md` |
| `QA_REPORT_v03_103_0.md` | `QA_REPORT_v03_103_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_103_0.md CHANGELOG_v03_103_0.md MANIFEST_v03_103_0.md QA_REPORT_v03_103_0.md
git commit -m "ODIN V03.103.0 — додано UI Polish Consistency Pass Router"
git push origin feature/odin-interface-v03
```
