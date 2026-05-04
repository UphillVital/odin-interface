# README_v03_45_0 — Auto Decision v1

## Призначення пакету

Цей пакет додає рекомендаційний шар Auto Decision у Control Center.

## Що додається

- `Auto Decision Board`;
- рішення для кожного запису:
  - `ALLOW`
  - `BLOCK`
  - `REVIEW`
  - `RETRY`
- Decision Log;
- `Copy Decision Report`;
- Decision у картках записів;
- Decision у повному реєстрі.

## Логіка v1

```text
INVALID rules → REVIEW
Entry BLOCKED → BLOCK
Entry not VALID → BLOCK або REVIEW для CRITICAL
Execution FAILED → RETRY
Execution DONE → ALLOW
Entry VALID → ALLOW
```

## Що НЕ змінюється

- Control Center dataset не змінюється;
- Rules JSON не змінюється;
- реального редагування файлів немає.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_45_0.md` | `README_v03_45_0.md` |
| `CHANGELOG_v03_45_0.md` | `CHANGELOG_v03_45_0.md` |
| `MANIFEST_v03_45_0.md` | `MANIFEST_v03_45_0.md` |
| `QA_REPORT_v03_45_0.md` | `QA_REPORT_v03_45_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є Auto Decision Board;
- записи без VALID отримують BLOCK або REVIEW;
- після Validate рішення стає ALLOW;
- після Fail рішення стає RETRY;
- Copy Decision Report копіює звіт.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_45_0.md CHANGELOG_v03_45_0.md MANIFEST_v03_45_0.md QA_REPORT_v03_45_0.md
git commit -m "ODIN V03.45.0 — додано Auto Decision v1 для Control Center"
git push origin feature/odin-interface-v03
```
