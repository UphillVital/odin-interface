# UI TEMPLATE COMPLIANCE QA — ODIN V03

## Призначення
Цей документ фіксує автоматичну перевірку відповідності службових сторінок єдиному шаблону Інтерфейсу ОДІН.

## Причина
Виявлено рецидив старої помилки: окремі службові сторінки (`Commit Builder`, `State Workspace`) мали власну шапку без Quick Settings і не відповідали UI Design System Lock.

## Обовʼязковий стандарт
Кожна сторінка ODIN Interface повинна мати:

- fixed header;
- єдину ODIN-шапку;
- Quick Settings у правому верхньому кутку;
- перемикання Light / Dark;
- перемикання UA / EN / DE;
- триколонкову логіку: navigation / workspace / assisted panel;
- contextual help;
- спільний стиль, без локального дизайну.

## Автотригер

```text
IF page header/layout != main ODIN template
THEN package = QA_FAILED
AND fix required before acceptance
```

## Перевірено в PACKAGE 26

- `commit_builder.html` приведено до єдиного шаблону.
- `state_workspace.html` приведено до єдиного шаблону.
- Додано спільні `odin_shared_ui.css` і `odin_shared_ui.js` для службових сторінок.
- Quick Settings працює в обох службових сторінках.
- UA / EN / DE і Light / Dark працюють у спільній shell-логіці.

## Заборона
Не створювати нові службові сторінки зі своїм окремим header/layout без проходження UI Template Compliance QA.
