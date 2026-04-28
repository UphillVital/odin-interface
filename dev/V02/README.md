# ODIN_ADMIN_V02_7_AUTO_TREE_PACKAGE_v1

## Що це
AUTO TREE генератор для ODIN-ADMIN V02.

## Куди класти
Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

## Як користуватись
1. Відкрити:
```text
dev/V02/auto_tree.html
```

2. Натиснути:
```text
GENERATE TREE
```

3. Натиснути:
```text
DOWNLOAD odin_tree_data.js
```

4. Замінити файл:
```text
dev/V02/odin_tree_data.js
```

5. Оновити ODIN-ADMIN.

## Важливо
Браузер не може сам просканувати локальну папку без backend.
Тому v1 працює через файл:
```text
odin_file_index.js
```

## Git
```bash
git add dev/V02/
git commit -m "v3.51 add ODIN-ADMIN V02.7 auto tree generator"
git push origin dev
```
