# ODIN HEADER_LOCK_v1 — СОН FIX

## СОН-ВЕРДИКТ

Проблема не в CSS і не в кнопках.

Проблема:
Lesson Engine не має еталонної шапки як locked-компонента, тому він реконструює її приблизно.

Це заборонено.

## ПРАВИЛО

HEADER НЕ ГЕНЕРУЄТЬСЯ.
HEADER НЕ ПЕРЕПИСУЄТЬСЯ.
HEADER НЕ "ПОКРАЩУЄТЬСЯ".

Header береться тільки з еталонного файлу і вставляється 1:1.

## НАЗВА КОМПОНЕНТА

HEADER_LOCK_v1

## ЩО ВХОДИТЬ У LOCK

1. HTML header
2. Header CSS
3. Header JS
4. Anchor offset logic
5. Mobile behavior
6. Buttons:
   - ДОДОМУ
   - Розділи
   - UA
   - ДП
   - 💡
   - 🔊

## QA-ЛОГІКА

QA має перевіряти не просто наявність кнопок, а fingerprint locked header.

Обовʼязкові перевірки:
- HEADER_LOCK_ID присутній
- HEADER_LOCK_VERSION присутній
- HEADER_BEGIN / HEADER_END присутні
- CSS_BEGIN / CSS_END присутні
- JS_BEGIN / JS_END присутні
- forbidden reconstruction markers відсутні

## ЗАБОРОНА

Lesson Engine не має права:
- самостійно вигадувати назви кнопок;
- міняти порядок кнопок;
- міняти структуру шапки;
- замінювати ДОДОМУ на ⌂ без дозволу;
- міняти логіку popup меню;
- міняти UA / ДП / 💡.

## ПРАВИЛЬНИЙ ПРОЦЕС

1. Завантажити еталонний урок/шаблон із правильною шапкою.
2. Витягнути header → HEADER_LOCK_v1.
3. Зберегти fingerprint.
4. Вставляти header у всі уроки 1:1.
5. QA перевіряє fingerprint.

## СТАТУС

СОН визначив:
поточна шапка v1.2.1 НЕ є еталоном.
Це реконструкція, не locked header.
