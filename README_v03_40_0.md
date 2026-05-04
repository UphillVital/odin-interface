# README_v03_40_0 — Runtime Import / Restore v1

## Призначення пакету

Цей пакет додає імпорт і відновлення Runtime State для Control Center.

## Що додається

- поле для вставки Runtime State JSON;
- кнопка `Import Runtime State`;
- перевірка JSON перед імпортом;
- відновлення `entryState`;
- відновлення `executionState`;
- лог результату імпорту.

## Що НЕ змінюється

- JSON dataset не змінюється;
- Data Model v1 не змінюється;
- реального редагування файлів немає.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_40_0.md` | `README_v03_40_0.md` |
| `CHANGELOG_v03_40_0.md` | `CHANGELOG_v03_40_0.md` |
| `MANIFEST_v03_40_0.md` | `MANIFEST_v03_40_0.md` |
| `QA_REPORT_v03_40_0.md` | `QA_REPORT_v03_40_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- `Copy Runtime State` копіює JSON;
- `Очистити Runtime State` очищує стани;
- вставити скопійований JSON у поле;
- `Import Runtime State` відновлює Entry/Execution;
- некоректний JSON блокується.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_40_0.md CHANGELOG_v03_40_0.md MANIFEST_v03_40_0.md QA_REPORT_v03_40_0.md
git commit -m "ODIN V03.40.0 — додано імпорт і відновлення Runtime State для Control Center"
git push origin feature/odin-interface-v03
```
