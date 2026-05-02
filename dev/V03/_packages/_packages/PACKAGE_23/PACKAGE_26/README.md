# PACKAGE 26 — UI TEMPLATE COMPLIANCE FIX

## Мета
Виправити рецидив порушення UI Design System Lock: службові сторінки `Commit Builder` і `State Workspace` повинні використовувати єдиний шаблон Інтерфейсу ОДІН.

## Що змінено

- `commit_builder.html` приведено до єдиного ODIN-шаблону.
- `state_workspace.html` приведено до єдиного ODIN-шаблону.
- Додано `odin_shared_ui.css` для єдиного shell-стилю службових сторінок.
- Додано `odin_shared_ui.js` для Quick Settings, тем і мов.
- Додано UI Template Compliance QA документ.

## Що не змінюється

- Основний `index.html` не змінюється.
- Стиль основного інтерфейсу не перебудовується.
- Git автоматично не виконується.
- Restore автоматично не виконується.

## Як тестувати

1. Відкрити:
   `dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.html`
2. Перевірити:
   - шапка має ODIN-стиль;
   - у правому кутку є Quick Settings;
   - Light / Dark перемикаються;
   - UA / EN / DE перемикаються;
   - commit-команди генеруються.
3. Відкрити:
   `dev/V03/11_PROTOTYPE_SYSTEM_UI/state_workspace.html`
4. Перевірити:
   - шапка має ODIN-стиль;
   - у правому кутку є Quick Settings;
   - State History показується;
   - Restore-команди генеруються, але не виконуються.

## Рішення
Цей пакет фіксує правило: жодна сторінка ODIN Interface не може мати власний несумісний шаблон.
