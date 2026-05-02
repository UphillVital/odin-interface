# LAYOUT_LOCK.md

## Core Layout Lock

Поточний базовий layout ODIN V03 фіксується як основа:

```text
Fixed Header
Left Navigation Column
Center Work Area
Right Assisted Panel
```

## Header

- Header закріплений.
- Header не повинен зміщуватись при прокрутці.
- Header містить тільки системно важливі елементи.
- Тема і мова керуються через Quick Settings.

## Columns

Кожна з трьох основних колонок має власну прокрутку:

- Left Navigation — структура / карта / проєкти.
- Center Work Area — активна робоча зона.
- Right Assisted Panel — пояснення, підказки, next action.

## Resize

Блоки можуть розтягуватись у межах шаблону, але не повинні ламати загальну структуру сторінки.

## Sticky Action Area

У центральній зоні action-блоки мають залишатись доступними, коли верхні інформаційні блоки прокручуються.
