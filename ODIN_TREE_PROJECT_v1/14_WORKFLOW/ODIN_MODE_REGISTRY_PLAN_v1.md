# ODIN MODE REGISTRY PLAN v1

## 1. Призначення

MODE REGISTRY — це центральний список режимів створення уроків і запуску engine.

Він не генерує урок сам.

---

## 2. Головна схема

UI
→ MODE REGISTRY
→ smart_router.js
→ content_engine.js
→ lesson_generator.js
→ viewer.js / output

---

## 3. Основні режими

### MODE_TEST

Ціль:

швидко перевірити, що engine працює.

---

### MODE_TOPIC

Ціль:

створити урок з теми.

---

### MODE_PRO

Ціль:

створити розширений урок з повною структурою.

---

### MODE_TEMPLATE_STRICT

Ціль:

генерувати урок строго під TEMPLATE_BASE / ІШ.

---

### MODE_PHOTO

Статус:

резерв.

Ціль:

урок по фото в майбутньому.

---

## 4. Поля режиму

Кожен mode має містити:

- id
- name
- description
- input_type
- quality_level
- template_policy
- qa_policy
- export_policy
- status
- engine_target
- router_action

---

## 5. Приклад MODE_PRO

id: MODE_PRO

name: PRO Lesson

input_type: topic/content

quality_level: PRO

template_policy: strict

qa_policy: full

export_policy: html_ready

status: active

engine_target: lesson_generator

router_action: GENERATE_LESSON_PRO

---

## 6. Що MODE REGISTRY не робить

[RULE]
Не створює новий generator.

[RULE]
Не створює новий pipeline.

[RULE]
Не замінює content_engine.js.

[RULE]
Не замінює lesson_generator.js.

[RULE]
Не обходить smart_router.js.

---

## 7. Зв’язок зі STATE

Після V03.5.1:

MODE_SELECTED
→ ODIN_STATE оновлюється
→ smart_router отримує дію
→ engine виконує

---

## 8. Зв’язок з TASK CENTER

MODE REGISTRY має передавати TASK CENTER:

- який mode обраний
- який stage запущено
- який status
- які QA / export правила

---

## 9. UI

В інтерфейсі mode registry має показувати:

- список modes
- активний mode
- опис
- status
- кнопки запуску
- tooltip / popup з поясненням

Можна використовувати стиль TEMPLATE_BASE_v1:

- круглі кнопки
- іконки
- tooltip
- popup пояснення

---

## 10. Порядок реалізації

1. Провести state audit.
2. Визначити, як mode пише в state.
3. Підключити mode до smart_router.
4. Не чіпати engine.
5. Протестувати MODE_TEST.
6. Потім MODE_TOPIC.
7. Потім MODE_PRO.
