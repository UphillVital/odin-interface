# ODIN V03 PACKAGE 23 — Advanced Commit Builder + Package Storage Standard

## Призначення пакету

Цей пакет обʼєднує два попередні пакети, які ще не були встановлені у проєкт:

1. `ODIN_V03_PACKAGE_23_ADVANCED_COMMIT_BUILDER`
2. `ODIN_V03_PACKAGE_23_1_PACKAGE_STORAGE_STANDARD`

Тепер їх потрібно інтегрувати як **один чистий пакет**, без дублювання службових файлів у корені `dev/V03`.

---

## Що реалізує пакет

### 1. Advanced Commit Builder

Додає окрему тестову сторінку:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.html
```

Функції:

- формування повного набору Git-команд;
- commit-повідомлення українською за стандартом ODIN;
- автоматичне формування tag;
- автоматичне формування запису для `CHANGELOG.md`;
- QA-попередження, якщо workflow ще не `Approved`;
- підтримка UA / EN / DE;
- підтримка Light / Dark.

> Важливо: Commit Builder **не виконує Git-команди автоматично**. Він тільки генерує правильний текст, який користувач копіює і запускає самостійно.

---

### 2. Package Storage Standard

Фіксує стандарт зберігання службових файлів пакетів:

```text
dev/V03/_packages/PACKAGE_<NUMBER>/
```

Для цього пакету службові файли лежать тут:

```text
dev/V03/_packages/PACKAGE_23/
```

Туди входить:

- README пакету;
- changelog-entry;
- QA-звіт;
- manifest пакету.

---

## Куди розпаковувати

Розпакувати ZIP у корінь проєкту:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\
```

Після розпакування у проєкті мають зʼявитися файли в `dev/V03/...`.

---

## Що тестувати

1. Відкрити:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.html
```

2. Перевірити:

- перемикання UA / EN / DE;
- перемикання Light / Dark;
- генерацію Git-команд;
- генерацію tag;
- генерацію changelog;
- QA-попередження при workflow `Review`, `Changed`, `Editing`;
- копіювання команд і changelog.

---

## Правило якості

Цей пакет:

- не змінює основний `index.html`;
- не ламає поточний V03 UI;
- не додає порожніх папок;
- не кладе службові файли в корінь `dev/V03`;
- не виконує Git автоматично.
