# README_v03_33_2 — ODIN Control Center UI Matrix Fix

## Призначення пакету

Цей пакет виправляє дефект у `dev/V03/control_center.html`:

- у Quick Settings було відсутнє перемикання мов;
- тепер додано мовний блок UA / EN / DE;
- JSON-логіка не змінюється;
- файл `_data/control_center_dataset_v1.json` не дублюється в пакеті.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_33_2.md` | `README_v03_33_2.md` |
| `CHANGELOG_v03_33_2.md` | `CHANGELOG_v03_33_2.md` |
| `MANIFEST_v03_33_2.md` | `MANIFEST_v03_33_2.md` |
| `QA_REPORT_v03_33_2.md` | `QA_REPORT_v03_33_2.md` |

## Перевірка

Відкрити:

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- меню ⚙ відкривається;
- є блок `Мова`;
- є кнопки `UA / EN / DE`;
- JSON-дані як і раніше підключаються;
- сторінка не втратила стилі.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_33_2.md CHANGELOG_v03_33_2.md MANIFEST_v03_33_2.md QA_REPORT_v03_33_2.md
git commit -m "ODIN V03.33.2 — виправлено Quick Settings у Control Center та повернуто перемикач мов"
git push origin feature/odin-interface-v03
```
