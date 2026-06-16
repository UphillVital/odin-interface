# ODIN ROUTER GLOBAL FIX v1

## Проблема

Після V03.5.2 Router Adapter показував:

```text
ERROR: ODIN_SMART_ROUTER not found
```

Але при цьому engine частково запускався і урок генерувався.

---

## Причина

`smart_router.js` оголошує:

```js
const ODIN_SMART_ROUTER = {...}
function autoSelect(){...}
```

але Router Adapter перевіряє:

```js
window.ODIN_SMART_ROUTER
```

Тому router існував у файлі, але не був доступний як глобальний `window`-обʼєкт.

---

## Рішення

Додано:

```text
dev\V02\router_global_fix.js
```

Файл експортує:

```js
window.ODIN_SMART_ROUTER = ODIN_SMART_ROUTER;
window.autoSelect = autoSelect;
```

---

## Архітектура після fix

```text
MODE
→ EVENT BUS
→ ODIN_STATE
→ ODIN_ROUTER_ADAPTER
→ window.ODIN_SMART_ROUTER / autoSelect
→ content_engine.js
→ lesson_generator.js
```

---

## Правило

[RULE]
Не переписувати `smart_router.js`, якщо проблему можна вирішити через безпечний adapter/fix-шар.

[RULE]
Engine-файли не чіпати:
- content_engine.js
- lesson_generator.js

---

## Наступний тест

Натиснути `MODE TEST` у `dev/V02/index.html`.

Очікувано:

```text
ERROR: ODIN_SMART_ROUTER not found
```

більше не зʼявляється.
