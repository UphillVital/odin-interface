# README_v03_35_0 — Control Center ↔ File Workspace Link

## Призначення пакету

Цей пакет додає перший зв’язок між Control Center і розділом роботи з файлами.

## Логіка

Control Center відповідає за: `ЩО / ЧОМУ / СТАТУС / РІШЕННЯ`

File Workspace відповідає за: `ДЕ / ЯК / ЯКИЙ ФАЙЛ / ЯКА ЗМІНА`

## Що додається

- кнопка `Перейти до File Workspace` у кожному записі;
- кнопка `Скопіювати контекст зміни`;
- контекст зміни формується з JSON-запису;
- JSON dataset не змінюється.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_35_0.md` | `README_v03_35_0.md` |
| `CHANGELOG_v03_35_0.md` | `CHANGELOG_v03_35_0.md` |
| `MANIFEST_v03_35_0.md` | `MANIFEST_v03_35_0.md` |
| `QA_REPORT_v03_35_0.md` | `QA_REPORT_v03_35_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_35_0.md CHANGELOG_v03_35_0.md MANIFEST_v03_35_0.md QA_REPORT_v03_35_0.md
git commit -m "ODIN V03.35.0 — додано зв’язок Control Center з File Workspace"
git push origin feature/odin-interface-v03
```
