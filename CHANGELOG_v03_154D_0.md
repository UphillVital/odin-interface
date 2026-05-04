# CHANGELOG_v03_154D_0

## ODIN V03.154D — UI/Data Model Sync Lock v1

### Додано
- UI/Data Model Sync Lock.
- READ_ONLY_ENFORCED sync mode.
- Enforcement rules.
- Manual testing instructions in README.

### Зафіксовано
- UI читає Data Model як active source-of-truth.
- Sync targets залишаються `writeAllowed=false`.
- Runtime replacement без QA заборонений.

### Не змінювалось
- UI не пише JSON автоматично.
- Data Model лишається active source-of-truth.
