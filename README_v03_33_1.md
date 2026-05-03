# README_v03_33_1 — ODIN Control Center JSON Model

## Призначення пакету

Цей пакет переводить Control Center з ручного HTML-списку на структуровану JSON-модель.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `dev/V03/_data/control_center_dataset_v1.json` | `dev/V03/_data/control_center_dataset_v1.json` |
| `README_v03_33_1.md` | `README_v03_33_1.md` |
| `CHANGELOG_v03_33_1.md` | `CHANGELOG_v03_33_1.md` |
| `MANIFEST_v03_33_1.md` | `MANIFEST_v03_33_1.md` |
| `QA_REPORT_v03_33_1.md` | `QA_REPORT_v03_33_1.md` |

## Перевірка

Відкрити через Live Server:

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Очікування:
- видно лічильники TOTAL / CRITICAL / IN_REVIEW / APPROVED;
- блоки заповнені з JSON;
- повний реєстр показує записи з JSON.

## Важливо

JSON через `fetch` може не працювати при відкритті файлу напряму як `file://`.
Потрібно відкривати через VS Code Live Server.

## Git-команди

```bash
git add dev/V03/control_center.html dev/V03/_data/control_center_dataset_v1.json README_v03_33_1.md CHANGELOG_v03_33_1.md MANIFEST_v03_33_1.md QA_REPORT_v03_33_1.md
git commit -m "ODIN V03.33.1 — підключено JSON-модель даних для Control Center"
git push origin feature/odin-interface-v03
```
