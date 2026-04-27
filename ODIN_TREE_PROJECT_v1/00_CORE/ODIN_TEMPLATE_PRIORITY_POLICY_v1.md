# ODIN TEMPLATE PRIORITY POLICY v1

## Пріоритети

1. HARD LOCK
2. TASK TYPE
3. MODE
4. SOURCE
5. USER INSTRUCTION

## Правило
Команда користувача застосовується тільки якщо не порушує hard lock.

## Конфлікт
Якщо task_type=lesson, але система бере ODIN Interface:

```text
RESULT: BLOCKED
ACTION: use TEMPLATE_BASE_v1.html
```

## Головне правило
Lesson output завжди використовує Lesson Page Template.
Admin output завжди використовує Admin Template.
Interface output завжди використовує Interface Template.
