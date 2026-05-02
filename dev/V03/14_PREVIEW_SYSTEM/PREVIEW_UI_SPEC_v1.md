# PREVIEW UI SPEC v1

## Кнопки

- Preview / Переглянути / Vorschau
- Refresh Preview / Оновити перегляд / Vorschau aktualisieren

## Інтеграція

Preview додається в File Workspace як окрема зона після блоків Editor / Original / Diff.

## Поведінка

1. Користувач вибирає або завантажує файл.
2. Користувач змінює текст у редакторі.
3. Користувач натискає Preview.
4. Система визначає тип файлу.
5. HTML рендериться у preview iframe.
6. Інші текстові формати показуються у code preview.

## I18N

Усі назви, кнопки, статуси і підказки preview мають бути через систему мов UA / EN / DE.
