# ODIN_ADMIN_V04_4_EXPORT_SYSTEM_PRO_FULL_PACKAGE_v1

## Що це

V04.4 Export System Pro.

Цей пакет додає повний product export:

```text
lesson.html
lesson.json
qa_report.json
meta.json
README.md
```

## Куди класти

Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

## Що додає / замінює

```text
index.html
v044_engine.js
README.md
PACKAGE_MANIFEST_V04_4_EXPORT_SYSTEM_PRO_v1.md
PACKAGE_STATUS_V04_4_EXPORT_SYSTEM_PRO_v1.json
```

## Як перевірити

1. Відкрити:

```text
dev/V02/index.html
```

2. Натиснути:

```text
GENERATE LESSON
```

3. Перевірити `LIVE LESSON PREVIEW`.

4. Натиснути:

```text
EXPORT PACKAGE
```

5. Має скачати 5 файлів:

```text
lesson.html
lesson.json
qa_report.json
meta.json
README.md
```

## Важливо

Через обмеження браузера цей пакет експортує файли окремими завантаженнями.
ZIP-експорт буде наступним шаром, якщо підключати JSZip або backend.

## Git

```bash
git add dev/V02/
git commit -m "v3.65 add ODIN V04.4 export system pro"
git push origin dev
```
