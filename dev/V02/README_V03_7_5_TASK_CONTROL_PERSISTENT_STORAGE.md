# ODIN V03.7.5 — TASK CONTROL + PERSISTENT STORAGE

## Що це

Пакет додає керування backlog задачами після Review → Task integration.

ODIN тепер може:

```text
бачити task backlog
фільтрувати задачі
міняти status
міняти priority
експортувати snapshot
імпортувати snapshot
```

---

## Що НЕ робить

```text
не редагує файли проєкту
не видаляє файли
не виконує git
```

---

## Куди класти

Розпакувати у корінь репозиторію:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

---

## Як тестувати

1. Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

2. Знайти:

```text
Task Control / Persistent Storage
```

3. Натиснути:

```text
REFRESH TASK CONTROL
```

4. Перевірити:
   - Total Tasks > 0
   - задачі показуються
   - фільтри працюють
   - статуси OPEN / IN_PROGRESS / DONE / BLOCKED змінюються

5. Натиснути:

```text
EXPORT SNAPSHOT
```

6. Перевірити JSON у Persistent Snapshot.

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7.5 task control persistent storage"
git push origin dev
