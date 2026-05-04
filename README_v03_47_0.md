# README_v03_47_0 — State Package Export v1

## Призначення пакету

Цей пакет додає експорт повного стану Control Center в один переносимий JSON-пакет.

## Що входить у State Package

- meta;
- runtimeState:
  - entryState;
  - executionState;
- rules;
- validationReport;
- decisionReport;
- decisionHistory;
- summary.

## Що додається в UI

- блок `State Package Export`;
- `Preview State Package`;
- `Copy State Package`;
- preview textarea для перегляду пакету.

## Що НЕ змінюється

- Control Center dataset не змінюється;
- Rules JSON не змінюється;
- реального редагування файлів немає.

## Куди класти файли

| Файл з пакету | Куди класти |
|---|---|
| `dev/V03/control_center.html` | `dev/V03/control_center.html` |
| `README_v03_47_0.md` | `README_v03_47_0.md` |
| `CHANGELOG_v03_47_0.md` | `CHANGELOG_v03_47_0.md` |
| `MANIFEST_v03_47_0.md` | `MANIFEST_v03_47_0.md` |
| `QA_REPORT_v03_47_0.md` | `QA_REPORT_v03_47_0.md` |

## Перевірка

```text
http://127.0.0.1:5500/dev/V03/control_center.html
```

Перевірити:
- є блок `State Package Export`;
- `Preview State Package` заповнює textarea;
- `Copy State Package` копіює JSON;
- у JSON є runtimeState, rules, validation, decisions, history.

## Git-команди

```bash
git add dev/V03/control_center.html README_v03_47_0.md CHANGELOG_v03_47_0.md MANIFEST_v03_47_0.md QA_REPORT_v03_47_0.md
git commit -m "ODIN V03.47.0 — додано State Package Export для Control Center"
git push origin feature/odin-interface-v03
```
