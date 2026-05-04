# README_v03_108_0 — Cleanup Consolidation Router v1

## Призначення пакету

Цей пакет запускає другий next-layer маршрут після V03.100: Cleanup Consolidation.

## Що додається

- `Build Cleanup Consolidation Router`;
- `Copy Cleanup Router`;
- маршрути cleanup:
  - Temporary Page Review;
  - File Workspace Consolidation;
  - Registry Data Consolidation;
  - Documentation Set Hygiene;
  - Standalone Pollution Guard.

## Правило

Cleanup Router нічого не видаляє автоматично.  
Він тільки готує контрольовані рішення: що інтегрувати, що залишити, що видалити пізніше.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/state_workspace.html` | `dev/V03/state_workspace.html` |
| `README_v03_108_0.md` | `README_v03_108_0.md` |
| `CHANGELOG_v03_108_0.md` | `CHANGELOG_v03_108_0.md` |
| `MANIFEST_v03_108_0.md` | `MANIFEST_v03_108_0.md` |
| `QA_REPORT_v03_108_0.md` | `QA_REPORT_v03_108_0.md` |

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/state_workspace.html README_v03_108_0.md CHANGELOG_v03_108_0.md MANIFEST_v03_108_0.md QA_REPORT_v03_108_0.md
git commit -m "ODIN V03.108.0 — додано Cleanup Consolidation Router"
git push origin feature/odin-interface-v03
```
