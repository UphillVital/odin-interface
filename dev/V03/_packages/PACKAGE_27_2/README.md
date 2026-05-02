# PACKAGE 27.2 — GLOBAL ODIN UI MATRIX RESTORE

## Призначення
Пакет реально застосовує єдину UI Matrix до службових сторінок Інтерфейсу ОДІН.

## Що змінює
- Додає `odin_global_matrix.css`.
- Додає `odin_global_matrix.js`.
- Оновлює `commit_builder.html`.
- Оновлює `state_workspace.html`.
- Додає системний документ `GLOBAL_ODIN_UI_MATRIX_RESTORE.md`.

## Очікуваний результат
Commit Builder і State Workspace повинні мати:
- той самий тип шапки;
- той самий логотип;
- ту саму кнопку шестерні;
- те саме popup-меню;
- першу колонку з кнопками як у головній сторінці;
- однакову поведінку Light/Dark та UA/EN/DE.

## Важливо
Цей пакет не є новою функцією. Це corrective system-fix після виявлення розходження дизайну службових сторінок.
