# UI TEMPLATE COMPLIANCE QA — v26.1

## Статус
Обовʼязкова перевірка для кожної сторінки Інтерфейсу ОДІН.

## Головне правило
Службова сторінка приймається тільки тоді, коли вона 1:1 відповідає головному ODIN Interface Shell.

## Обовʼязкові елементи
- Той самий fixed header.
- Логотип ODIN у шапці.
- Ті самі кольори light/dark тем.
- Кнопка Quick Settings у правому верхньому кутку.
- Popup-меню шестерні.
- У popup-меню є переходи на:
  - головний інтерфейс;
  - Commit Builder;
  - State Workspace.
- UA / EN / DE працюють у службових сторінках.
- Light / Dark перемикаються та зберігаються.
- Ліва колонка, центральна зона, права assisted panel.
- Footer/status-bar відповідає ODIN UI.

## Автотригер
IF сторінка має окремий header, інші кольори або відсутнє меню шестерні
THEN QA_FAILED
AND corrective package required before next feature.

## Заборонено
- Окремий локальний дизайн сторінки.
- Header без логотипу ODIN.
- Header без Quick Settings.
- Меню без переходів до службових сторінок.
- Частково схожий, але не ідентичний shell.
