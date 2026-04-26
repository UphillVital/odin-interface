# EXPORT READY GATE

## Що це
Фінальний gate перед видачею файлу.

## Умови
- QA виконано;
- критичних errors немає;
- structure valid;
- translation standard valid;
- highlight / audio markers присутні або warning зафіксований;
- status stack містить EXPORT_READY.

## Статуси
- EXPORT_BLOCKED_BY_QA
- EXPORT_READY
- EXPORT_DONE

## Правило
Без EXPORT_READY файл не вважається фінальним.
