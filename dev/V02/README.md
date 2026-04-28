# ODIN_ADMIN_V03_1_SESSION_MANAGER_FULL_PACKAGE_v1

## Що це

FULL-пакет V03.1 Session Manager.

Цей пакет готовий до встановлення без ручного редагування коду.

## Куди класти

Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

Повний шлях:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02\
```

## Що замінює / додає

```text
index.html
viewer.js
session.js
README.md
PACKAGE_MANIFEST_V03_1_SESSION_MANAGER_FULL_v1.md
PACKAGE_STATUS_V03_1_SESSION_MANAGER_FULL_v1.json
```

## Як перевірити

1. Відкрий:

```text
dev/V02/index.html
```

2. Зліва вибери файл, наприклад:

```text
TEMPLATE_RULES.md
```

3. Натисни:

```text
ANALYZE
QA
USE
```

4. Справа в панелі SESSION має зʼявитись вибраний файл.

5. Перезавантаж сторінку — session має зберегтись.

## Очікуваний результат

```text
TREE → VIEW → ACTION → SESSION
```

## Важливо

Для локального відкриття файлів через `fetch` краще запускати через VS Code Live Server.

## Git

```bash
git add dev/V02/
git commit -m "v3.55 add ODIN V03.1 session manager full package"
git push origin dev
```
