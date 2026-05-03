# README_v03_34_0 — ODIN Control Center Filters v1

## Призначення пакету

Цей пакет додає до Control Center фільтри перегляду поверх існуючої JSON-моделі.

## Що додається

- пошук по всіх ключових полях запису;
- фільтр за статусом;
- фільтр за пріоритетом;
- фільтр за категорією;
- кнопка скидання фільтрів;
- лічильник видимих записів.

## Що НЕ змінюється

- `dev/V03/_data/control_center_dataset_v1.json` не змінюється;
- Data Model v1 не змінюється;
- логіка JSON-завантаження збережена.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_34_0.md` | `README_v03_34_0.md` |
| `CHANGELOG_v03_34_0.md` | `CHANGELOG_v03_34_0.md` |
| `MANIFEST_v03_34_0.md` | `MANIFEST_v03_34_0.md` |
| `QA_REPORT_v03_34_0.md` | `QA_REPORT_v03_34_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- JSON підключено;
- з’явився блок `Фільтри / Views`;
- пошук працює;
- фільтр Status працює;
- фільтр Priority працює;
- фільтр Category працює;
- кнопка `Скинути` працює;
- Quick Settings містить мовний перемикач UA / EN / DE.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_34_0.md CHANGELOG_v03_34_0.md MANIFEST_v03_34_0.md QA_REPORT_v03_34_0.md
git commit -m "ODIN V03.34.0 — додано фільтри перегляду для Control Center"
git push origin feature/odin-interface-v03
```
