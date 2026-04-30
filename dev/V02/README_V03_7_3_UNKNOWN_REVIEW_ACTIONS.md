# ODIN V03.7.3 — UNKNOWN REVIEW + ACTION SYSTEM

## Що це

Пакет додає review-шар після V03.7.2 Unknown Detector.

V03.7.2 знайшов:

```text
Total Unknown = 53
Conflict = 52
Orphan = 1
```

V03.7.3 дає можливість по кожному item вибрати дію:

```text
KEEP
IGNORE
DOCUMENT
FIX_LATER
CREATE_TASK
MOVE_REVIEW
```

---

## Важливо

Пакет нічого не змінює автоматично.

```text
не видаляє файли
не редагує файли
не рухає файли
не виконує git
```

Це тільки review + action plan.

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

2. Переконатись, що Unknown Detector має результати.

3. Знайти блок:

```text
Unknown Review + Actions
```

4. Натиснути:

```text
REFRESH REVIEW
```

5. Вибрати дію для кількох item.

6. Натиснути:

```text
EXPORT REVIEW PLAN
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7.3 unknown review actions"
git push origin dev
