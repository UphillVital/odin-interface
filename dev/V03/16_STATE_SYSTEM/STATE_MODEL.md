# STATE_MODEL.md

## Що таке State

State — це осмислена контрольна точка ODIN, яка має технічну привʼязку до Git і людський опис.

## Мінімальні поля State

- `id` — унікальний ідентифікатор;
- `version` — версія ODIN;
- `name` — коротка назва;
- `type` — checkpoint / stable / experimental;
- `status` — stable / draft / deprecated;
- `summaryUa` — короткий опис українською;
- `changesUa` — що зроблено;
- `valueUa` — що це дає;
- `contextUa` — контекст;
- `gitTag` — Git tag;
- `mdPath` — шлях до людського опису.

## Правило

State не вважається повним, якщо немає:

1. запису в `STATE_REGISTRY.json`;
2. опису в `_states/`;
3. changelog-запису;
4. Git commit + tag.
