# ODIN_ARCHITECTURE_SEPARATION_PATCH_v1

## Що це
Пакет фіксує розділення:

```text
ODIN_TREE_PROJECT_v1 = база знань / узгоджене ядро
dev/V02 = живий веб-інтерфейс ODIN-ADMIN
```

Також додає Template Router, щоб уроки завжди використовували правильний шаблон сторінки уроку.

## Куди класти
Розпакувати всі файли у:

```text
ODIN_TREE_PROJECT_v1/00_CORE/
```

Повний шлях:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\ODIN_TREE_PROJECT_v1\00_CORE\
```

## Файли
- ODIN_ARCHITECTURE_SEPARATION_v1.md
- ODIN_TEMPLATE_ROUTER_v1.md
- ODIN_TEMPLATE_PRIORITY_POLICY_v1.md
- PACKAGE_MANIFEST_ARCHITECTURE_SEPARATION_v1.md
- PACKAGE_STATUS_ARCHITECTURE_SEPARATION_v1.json
- README.md

## Головне правило
Для уроків використовувати тільки:

```text
ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html
```

Заборонено для уроків:
- dev/index.html
- ODIN Interface
- ODIN-ADMIN
- admin.html

## Перевірка
```bash
dir ODIN_TREE_PROJECT_v1\00_CORE
```

## Git
```bash
git add ODIN_TREE_PROJECT_v1/00_CORE/
git commit -m "v3.42 add ODIN architecture separation and template router"
git push origin dev
```
