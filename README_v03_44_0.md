# README_v03_44_0 — Rule Validation Matrix v1

## Призначення пакету

Цей пакет додає матрицю валідації правил у Control Center.

## Що додається

- блок `Rule Validation Matrix`;
- перевірка required fields;
- перевірка allowed actions;
- перевірка duplicate IDs;
- статуси правил:
  - `VALID`
  - `WARNING`
  - `INVALID`
- `Copy Validation Report`.

## Що НЕ змінюється

- Control Center dataset не змінюється;
- Rules JSON не змінюється;
- реального редагування файлів немає.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_44_0.md` | `README_v03_44_0.md` |
| `CHANGELOG_v03_44_0.md` | `CHANGELOG_v03_44_0.md` |
| `MANIFEST_v03_44_0.md` | `MANIFEST_v03_44_0.md` |
| `QA_REPORT_v03_44_0.md` | `QA_REPORT_v03_44_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є блок Rule Validation Matrix;
- стандартні правила VALID;
- додай правило з невідомим action → INVALID;
- Disable правило → WARNING;
- Copy Validation Report копіює звіт.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_44_0.md CHANGELOG_v03_44_0.md MANIFEST_v03_44_0.md QA_REPORT_v03_44_0.md
git commit -m "ODIN V03.44.0 — додано Rule Validation Matrix для Control Center"
git push origin feature/odin-interface-v03
```
