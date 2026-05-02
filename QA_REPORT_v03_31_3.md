# QA_REPORT_v03_31_3

## Package delivery QA

PASS — немає `PACKAGE_DOCS/`.
PASS — немає дубльованої документації.
PASS — немає зламаних назв типу `HANGELOG.md`, `ADME.md`, `EADME.md`, `ANGELOG.md`.
PASS — усі документи пакету версійні.
PASS — README містить точний шлях для кожного файлу.

## Architecture QA

PASS — еталон дизайну лишається `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`.
PASS — робочі сторінки створені в `dev/V03/`.
PASS — робочі сторінки не додаються в `dev/V03/11_PROTOTYPE_SYSTEM_UI/`.
PASS — шаблон сторінки створено в `dev/V03/_templates/`.
PASS — сторінкові скрипти ізольовано в `dev/V03/_page_scripts/`.

## Page QA

PASS — `commit_builder.html` створений і підключає `_page_scripts/commit_builder.js`.
PASS — `state_workspace.html` створений і підключає `_page_scripts/state_workspace.js`.
PASS — обидві сторінки підключають `11_PROTOTYPE_SYSTEM_UI/styles.css`.
PASS — обидві сторінки підключають `11_PROTOTYPE_SYSTEM_UI/app.js`.

## Manual QA після встановлення

1. Відкрити `http://127.0.0.1:5500/dev/V03/commit_builder.html`.
2. Переконатися, що видно Commit Builder і Git-команди.
3. Відкрити `http://127.0.0.1:5500/dev/V03/state_workspace.html`.
4. Переконатися, що видно State Workspace, checkpoint і QA-блок.
5. Переконатися, що дизайн збігається з еталоном.
6. Виконати `dir dev\V03\11_PROTOTYPE_SYSTEM_UI` і перевірити, що там немає робочих сторінок.
