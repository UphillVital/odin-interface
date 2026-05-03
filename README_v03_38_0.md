# README_v03_38_0 — Execution Control v1

## Призначення пакету

Цей пакет додає до Control Center перший рівень контролю виконання.

## Що додається

- Execution Status:
  - `NOT_STARTED`
  - `QUEUED`
  - `RUNNING`
  - `DONE`
  - `FAILED`
- кнопка `Run`;
- кнопка `Fail`;
- кнопка `Retry`;
- кнопка `Copy Execution`;
- Execution Log;
- колонка Execution у повному реєстрі.

## Правило

Run доступний тільки якщо Entry Status = `VALID`.

Execution Control v1 нічого не змінює у файлах. Це симуляційний контроль процесу.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_38_0.md` | `README_v03_38_0.md` |
| `CHANGELOG_v03_38_0.md` | `CHANGELOG_v03_38_0.md` |
| `MANIFEST_v03_38_0.md` | `MANIFEST_v03_38_0.md` |
| `QA_REPORT_v03_38_0.md` | `QA_REPORT_v03_38_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- Run заблокований до Validate;
- Validate робить Entry = VALID;
- після VALID Run проходить QUEUED → RUNNING → DONE;
- Fail переводить у FAILED;
- Retry доступний після FAILED;
- Copy Execution копіює execution context.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_38_0.md CHANGELOG_v03_38_0.md MANIFEST_v03_38_0.md QA_REPORT_v03_38_0.md
git commit -m "ODIN V03.38.0 — додано Execution Control v1 для керування виконанням"
git push origin feature/odin-interface-v03
```
