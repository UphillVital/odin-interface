# ODIN_ADMIN_V02_2_GITHUB_FILE_VIEWER_PACKAGE_v1

## Що це

Пакет оновлення ODIN-ADMIN V02.2: GitHub Raw File Viewer.

## Ціль

Зробити так, щоб кнопка `OPEN` могла відкривати реальний вміст файлів з GitHub repo:

```text
UphillVital/odin-interface
branch: dev
```

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
odin_file_viewer.js
odin_repo_config.js
README.md
PACKAGE_MANIFEST_V02_2_GITHUB_FILE_VIEWER_v1.md
PACKAGE_STATUS_V02_2_GITHUB_FILE_VIEWER_v1.json
```

## Як працює

1. Вибираєш вузол у дереві.
2. Натискаєш `OPEN`.
3. Якщо це файл (`.md`, `.json`, `.html`, `.js`, `.css`) — система пробує завантажити його через GitHub raw URL.
4. Якщо це папка — показує metadata.
5. Якщо GitHub raw не доступний — показує fallback preview.

## Важливо

Для реального читання файлів потрібні:
- repo доступний з браузера;
- файл вже запушений у GitHub;
- правильний branch: `dev`;
- правильний path.

## Перевірка

1. Відкрити:

```text
dev/V02/index.html
```

2. Увійти:

```text
ODIN
```

3. Вибрати, наприклад:

```text
Template Router
```

4. Натиснути:

```text
OPEN
```

5. У File Viewer має зʼявитись реальний текст файлу або fallback.

## Git

```bash
git add dev/V02/
git commit -m "v3.45 add ODIN-ADMIN V02.2 GitHub file viewer"
git push origin dev
```
