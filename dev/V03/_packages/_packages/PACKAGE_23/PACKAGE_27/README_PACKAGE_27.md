# PACKAGE 27 — ODIN UI Matrix + Global Shell

## Мета

Привести головний інтерфейс, Commit Builder і State Workspace до єдиної ODIN UI Matrix.

## Що змінено

- `index.html` отримує системні переходи у меню шестерні.
- `commit_builder.html` використовує той самий header / layout / settings menu, що і `index.html`.
- `state_workspace.html` використовує той самий header / layout / settings menu, що і `index.html`.
- Додано `odin_matrix_shell.js` для службових сторінок.
- Оновлено `styles.css` для єдиного меню й службових блоків.
- Додано системні правила UI Matrix.

## Що не змінюється

- Основна логіка File Workspace.
- Preview UI.
- Workflow.
- State registry.

## Тест

1. Відкрити `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`.
2. Натиснути шестерню.
3. Перевірити переходи на Commit Builder і State Workspace.
4. Відкрити `commit_builder.html` і перевірити, що шапка та меню такі самі.
5. Відкрити `state_workspace.html` і перевірити, що шапка та меню такі самі.
6. Перевірити UA / EN / DE.
7. Перевірити Light / Dark.

## QA

Пакет приймається тільки якщо всі три сторінки виглядають як одна система.
