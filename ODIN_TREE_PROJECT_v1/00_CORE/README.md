# ODIN V05.0 — SYNC MAP PACKAGE

## Що це

Це безпечний пакет синхронізації між:

```text
dev\V02
```

і

```text
ODIN_TREE_PROJECT_v1
```

Пакет потрібен, щоб не будувати паралельну систему в `dev\V02`.

---

## Куди класти

Розпакувати файл:

```text
ODIN_V05_0_SYNC_MAP_FOR_V02_AND_ODIN_TREE.md
```

сюди:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\ODIN_TREE_PROJECT_v1\00_CORE\
```

Розпакувати файл:

```text
test_scenario.md
```

сюди:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\ODIN_TREE_PROJECT_v1\00_CORE\
```

Можна також покласти весь пакет у тимчасову папку і вручну перенести тільки ці два `.md` файли в `00_CORE`.

---

## Що НЕ робити

Не класти цей пакет у `dev\V02`.

Не змінювати `dev\V02\index.html`.

Не змінювати `dev\V02\src`.

Не впроваджувати старий V05.3.1 пакет.

---

## Навіщо це потрібно

Цей документ фіксує:

- `dev\V02` = друга версія інтерфейсу ODIN;
- `ODIN_TREE_PROJECT_v1` = основа ODIN;
- де лежить справжній шаблон;
- де lesson engine;
- де QA;
- де export;
- що V05 має бути мостом, а не новою системою.

---

## Після встановлення

Відкрити файл:

```text
ODIN_TREE_PROJECT_v1\00_CORE\ODIN_V05_0_SYNC_MAP_FOR_V02_AND_ODIN_TREE.md
```

Перевірити, що логіка відповідає системі.

Після цього можна робити наступний пакет:

```text
V05.3_REAL_TEMPLATE_CONNECT
```

---

## Git

git add ODIN_TREE_PROJECT_v1/
git commit -m "V05.0 add sync map for V02 and ODIN tree"
git push origin dev
