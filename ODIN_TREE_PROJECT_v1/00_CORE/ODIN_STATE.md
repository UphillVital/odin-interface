# ODIN STATE

## Що це
ODIN STATE — поточний стан системи в реальному часі.

## Призначення
- показує, що зараз відбувається;
- синхронізує UI, модулі, QA і export;
- запобігає хаосу між процесами.

## Структура
- STATUS: IDLE / RUNNING / ERROR / DONE / EXPORT_READY;
- MODE: MANUAL / AUTO / STEP;
- CURRENT STEP;
- PROGRESS;
- QA STATE;
- LOGS;
- ACTIVE MODULES.

## Приклад логіки
Кнопка не має напряму міняти UI.  
Правильний цикл:

```text
button → function → ODIN_STATE → renderUI()
```

## Роль у системі
ODIN STATE = єдине джерело правди для живого інтерфейсу.

## Правило
Якщо статус є тільки текстом і не впливає на систему — це не STATE.
