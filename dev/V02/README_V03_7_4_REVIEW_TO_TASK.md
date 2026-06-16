# ODIN V03.7.4 — REVIEW → TASK CENTER INTEGRATION

## Що це

Пакет підключає `Unknown Review + Actions` до Task Center.

Confirmed review decisions можуть перетворюватись у задачі.

---

## Що створює задачі

За замовчуванням:

```text
CREATE_TASK
FIX_LATER
```

Опційно кнопкою:

```text
GENERATE TASKS + DOCUMENT
```

також створюються задачі для:

```text
DOCUMENT
```

---

## Що НЕ робить

```text
не редагує файли
не видаляє файли
не виконує git
не робить refactor
```

Це тільки створення task backlog.

---

## Куди класти

Розпакувати в корінь репозиторію:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

---

## Як тестувати

1. Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

2. Переконатися, що `Unknown Review + Actions` має confirmed items.

3. Знайти:

```text
Review → Task Center Integration
```

4. Натиснути:

```text
GENERATE TASKS
```

5. Перевірити:

```text
Created > 0
```

6. Перейти в Task Center і натиснути refresh.

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7.4 review to task integration"
git push origin dev
