# ODIN_ADMIN_V02_1_FILE_VIEWER_PACKAGE_v1

## Що це
Пакет оновлення ODIN-ADMIN V02.1: File Viewer Layer.

## Куди класти
Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

Повний шлях:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02\
```

## Що оновлює / додає

```text
admin.html
app.js
style.css
odin_tree_data.js
odin_file_viewer.js
README.md
PACKAGE_MANIFEST_V02_1_FILE_VIEWER_v1.md
PACKAGE_STATUS_V02_1_FILE_VIEWER_v1.json
```

## Що зʼявиться

- правий блок File Viewer;
- metadata вибраного вузла;
- preview для md/json/html;
- кнопка OPEN показує content preview;
- підготовка до майбутнього real fetch;
- V01 не чіпається.

## Як перевірити

1. Відкрити:

```text
dev/V02/index.html
```

2. Увійти паролем:

```text
ODIN
```

3. Вибрати пункт дерева зліва.
4. Натиснути:

```text
OPEN
```

5. Перевірити, що справа зʼявляється File Viewer preview.

## Git

```bash
git add dev/V02/
git commit -m "v3.44 add ODIN-ADMIN V02.1 file viewer layer"
git push origin dev
```
