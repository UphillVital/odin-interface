# ODIN_ADMIN_V02_8_FULL_TREE_INDEX_PACKAGE_v1

## Що це
Пакет повного індексу дерева ODIN для ODIN-ADMIN.

## Куди класти
Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

## Що замінити
Цей пакет містить готові:

```text
odin_file_index.js
odin_tree_data.js
```

Після розпаковки ODIN-ADMIN зліва має бачити всі файли зі списку `ODIN_TREE_PROJECT_v1`.

## Перевірка
1. Відкрий `dev/V02/index.html`
2. Увійди: `ODIN`
3. Зліва перевір групу `07 TEMPLATE`
4. Там має бути:
```text
TEMPLATE_RULES.md
TEMPLATE_BASE_v1.html
TEMPLATE_STRUCTURE.md
```

## Git
```bash
git add dev/V02/
git commit -m "v3.52 add full ODIN tree file index"
git push origin dev
```
