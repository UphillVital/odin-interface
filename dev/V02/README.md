# ODIN_ADMIN_V04_2_LESSON_TYPES_ENGINE_FULL_PACKAGE_v1

## Що це

V04.2 Lesson Types Engine.

Цей пакет додає типи уроків:

```text
LESSON_FROM_TOPIC
LESSON_FROM_PHOTO
LESSON_REVIEW
LESSON_MIX
```

## Куди класти

Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

## Що додає / замінює

```text
index.html
v042_engine.js
README.md
PACKAGE_MANIFEST_V04_2_LESSON_TYPES_ENGINE_v1.md
PACKAGE_STATUS_V04_2_LESSON_TYPES_ENGINE_v1.json
```

## Як перевірити

1. Відкрити:

```text
dev/V02/index.html
```

2. Обрати `Lesson Type`.

3. Натиснути:

```text
ANALYZE TYPE
```

4. Натиснути:

```text
GENERATE LESSON
```

5. Перевірити, що у HTML і QA Report відображається вибраний тип уроку.

6. Натиснути:

```text
SAVE LESSON
EXPORT JSON
DOWNLOAD HTML
```

## Git

```bash
git add dev/V02/
git commit -m "v3.62 add ODIN V04.2 lesson types engine"
git push origin dev
```
