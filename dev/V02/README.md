# ODIN_ADMIN_V02_10_FILE_ACTIONS_FIX_PACKAGE_v1

## Що це
FIX для V02.10 File Actions.

## Проблема
На сторінці було:

```text
ODIN_TREE_DATA не знайдено
```

## Причина
`odin_tree_data.js` створює:

```js
const ODIN_TREE_DATA = ...
```

А старий `viewer.js` шукав тільки:

```js
window.ODIN_TREE_DATA
```

У браузері `const` не завжди стає властивістю `window`.

## Виправлення
Новий `viewer.js` шукає дерево так:

```js
typeof ODIN_TREE_DATA !== 'undefined'
```

## Куди класти
Розпакувати у:

```text
odin-interface/dev/V02/
```

Замінити:

```text
viewer.js
```

## Перевірка
1. Відкрий `dev/V02/index.html`
2. Зліва має зʼявитися дерево файлів
3. Клікни `TEMPLATE_RULES.md`
4. Натисни `ANALYZE`, `QA`, `USE`

## Git
```bash
git add dev/V02/
git commit -m "v3.53 fix ODIN-ADMIN V02.10 file actions tree loading"
git push origin dev
```
