# TEST SCENARIO — ODIN V05.0 SYNC MAP

## Ціль

Перевірити, що перед наступним кодом команда правильно розуміє архітектуру:

```text
dev\V02 = інтерфейс
ODIN_TREE_PROJECT_v1 = база ODIN
V05 = міст між ними
```

---

## Перевірка 1 — файл покладено правильно

Файл має бути тут:

```text
ODIN_TREE_PROJECT_v1\00_CORE\ODIN_V05_0_SYNC_MAP_FOR_V02_AND_ODIN_TREE.md
```

---

## Перевірка 2 — база не змінена випадково

Не повинні бути змінені:

```text
dev\V02\index.html
dev\V02\src\
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_BASE_v1.html
```

---

## Перевірка 3 — правильне джерело шаблону

Єдиний шаблон уроку:

```text
ODIN_TREE_PROJECT_v1\07_UNIFIED_LESSON_TEMPLATE\TEMPLATE_BASE_v1.html
```

Якщо в `dev\V02` зʼявився другий `TEMPLATE_BASE_v1.html` — це помилка архітектури.

---

## Перевірка 4 — наступний пакет

Наступний пакет не може просто малювати свій HTML.

Він має бути:

```text
V05.3_REAL_TEMPLATE_CONNECT
```

І працювати з базою ODIN.

---

## Очікуваний результат

Після V05.0 команда має одну синхронну логіку:

```text
V02 не замінює ODIN_TREE_PROJECT_v1.
V02 підключається до ODIN_TREE_PROJECT_v1.
V05 — execution bridge між ними.
```
