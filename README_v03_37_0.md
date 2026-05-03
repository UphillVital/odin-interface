# README_v03_37_0 — Entry Control System v1

## Призначення пакету

Цей пакет додає до Control Center перший Gate-рівень контролю входу для дій.

## Що додається

- Entry Status для кожного запису:
  - `NOT_CHECKED`
  - `VALID`
  - `INVALID`
  - `BLOCKED`
- кнопка `Validate`;
- кнопка `Approve`;
- кнопка `Block`;
- блокування `Execute v1`, якщо Entry Status не `VALID`;
- Entry Log;
- колонка Entry у повному реєстрі.

## Важливо

Entry Control v1 поки не зберігає статуси після перезавантаження сторінки.
Це безпечний UI-рівень контролю без зміни JSON.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_37_0.md` | `README_v03_37_0.md` |
| `CHANGELOG_v03_37_0.md` | `CHANGELOG_v03_37_0.md` |
| `MANIFEST_v03_37_0.md` | `MANIFEST_v03_37_0.md` |
| `QA_REPORT_v03_37_0.md` | `QA_REPORT_v03_37_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- у записах є ENTRY CONTROL;
- Execute v1 заблокований до Validate;
- Validate робить запис VALID;
- після VALID Execute v1 працює як симуляція;
- Block переводить запис у BLOCKED;
- Copy Action містить Entry Status.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_37_0.md CHANGELOG_v03_37_0.md MANIFEST_v03_37_0.md QA_REPORT_v03_37_0.md
git commit -m "ODIN V03.37.0 — додано Entry Control Gate для дій Control Center"
git push origin feature/odin-interface-v03
```
