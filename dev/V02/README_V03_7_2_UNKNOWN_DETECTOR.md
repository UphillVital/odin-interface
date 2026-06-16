# ODIN V03.7.2 — UNKNOWN DETECTOR

## Що це

Semantic quality layer для File Control Map.

Після V03.7.1.1 карта показала:

```text
Mapped = 182
Unmapped = 0
```

Це технічно добре, але занадто ідеально. Тому V03.7.2 шукає не просто unmapped files, а слабкі місця привʼязки.

---

## Категорії

```text
UNKNOWN_WEAK_MATCH
UNKNOWN_NO_ROLE
UNKNOWN_CONFLICT
UNKNOWN_ORPHAN
```

---

## Що робить

Показує:

```text
Total Unknown
Weak Match
No Role
Conflict
Orphan
```

і список файлів із причинами.

---

## Що НЕ робить

```text
не видаляє файли
не редагує файли
не робить diff
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

2. Знайти блок:

```text
Unknown Detector
```

3. Натиснути:

```text
RUN UNKNOWN DETECTOR
```

4. Перевірити звіт.

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7.2 semantic unknown detector"
git push origin dev
