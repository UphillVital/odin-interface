# ODIN TEMPLATE ROUTER v1

## Що це
Правило ядра ODIN, яке визначає шаблон за типом завдання.

## Routing table

| task_type | template |
|---|---|
| admin | dev/V02/admin.html |
| admin_login | dev/V02/login.html |
| interface | dev/V01 або dev/V02 залежно від контексту |
| lesson | ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html |
| photo_lesson | ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html |
| issu_photo_lesson | ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html |
| ssudt_lesson | ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html |
| qa_tool | QA tool template |
| docs_package | README / MD package |
| recovery_package | recovery package |

## Hard lock for lessons
Для `lesson`, `photo_lesson`, `issu_photo_lesson`, `ssudt_lesson`:

REQUIRED:
```text
ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html
```

FORBIDDEN:
```text
dev/index.html
ODIN Interface
ODIN-ADMIN
admin.html
```

## Safe fallback
Якщо task_type не визначено:
```text
SAFE MODE → не генерувати HTML → уточнити тип завдання
```
