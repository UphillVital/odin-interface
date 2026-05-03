# README_v03_33_0 — ODIN Control Center Dashboard

## Призначення пакету

Цей пакет додає окрему сторінку **Центр керування** в Інтерфейс ОДІН.

Ціль:
- бачити критичні питання;
- бачити проблемні питання;
- бачити поточні задачі;
- бачити затверджені рішення;
- бачити ідеї на розгляді;
- підготувати основу для майбутнього ODIN Brain / Entry Control.

## Куди класти файли

| Файл з пакету | Куди класти в репозиторії |
|---|---|
| `dev/V03/control_center.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\control_center.html` |
| `dev/V03/_maintenance/patch_control_center_nav_v03_33_0.ps1` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_maintenance\patch_control_center_nav_v03_33_0.ps1` |
| `README_v03_33_0.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\README_v03_33_0.md` |
| `CHANGELOG_v03_33_0.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\CHANGELOG_v03_33_0.md` |
| `MANIFEST_v03_33_0.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\MANIFEST_v03_33_0.md` |
| `QA_REPORT_v03_33_0.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\QA_REPORT_v03_33_0.md` |

## Після копіювання

```powershell
powershell -ExecutionPolicy Bypass -File dev\V03\_maintenance\patch_control_center_nav_v03_33_0.ps1
```

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

## Git-команди

```bash
git add dev/V03/ README_v03_33_0.md CHANGELOG_v03_33_0.md MANIFEST_v03_33_0.md QA_REPORT_v03_33_0.md
git commit -m "ODIN V03.33.0 — додано дашборд Центр керування для планування, статусів і рішень"
git push origin feature/odin-interface-v03
```
