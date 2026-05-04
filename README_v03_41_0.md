# README_v03_41_0 — Rule Engine v1

## Призначення пакету

Цей пакет додає перший Rule Engine у Control Center.

## Що додається

- блок `Rule Engine`;
- список активних правил;
- Rule Log;
- централізована перевірка Run / Fail / Retry;
- правила:
  - Run блокується без VALID;
  - Run дозволено при VALID;
  - Retry дозволено тільки після FAILED;
  - BLOCKED блокує виконання;
  - execution скидається, якщо Entry не VALID.

## Що НЕ змінюється

- JSON dataset не змінюється;
- реального редагування файлів немає;
- Runtime State працює через localStorage.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_41_0.md` | `README_v03_41_0.md` |
| `CHANGELOG_v03_41_0.md` | `CHANGELOG_v03_41_0.md` |
| `MANIFEST_v03_41_0.md` | `MANIFEST_v03_41_0.md` |
| `QA_REPORT_v03_41_0.md` | `QA_REPORT_v03_41_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є блок Rule Engine;
- Run без VALID блокується Rule Engine;
- після Validate Run працює;
- Retry без FAILED блокується;
- після Fail Retry працює;
- Rule Log оновлюється.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_41_0.md CHANGELOG_v03_41_0.md MANIFEST_v03_41_0.md QA_REPORT_v03_41_0.md
git commit -m "ODIN V03.41.0 — додано Rule Engine v1 для Control Center"
git push origin feature/odin-interface-v03
```
