# ODIN V03.7.1 — FILE CONTROL MAP

## Що це

Пакет додає в `admin.html` блок:

```text
File Control Map
```

Це view-only карта взаємодії файлів.

---

## Що робить

ODIN показує:

```text
- загальну кількість файлів
- скільки файлів привʼязано до груп карти
- скільки файлів потребує review
- групи взаємодії файлів
```

---

## Що НЕ робить

```text
не видаляє файли
не записує файли
не робить diff
не виконує git
```

---

## Куди класти

Розпакувати пакет у корінь репозиторію:

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
File Control Map
```

3. Натиснути:

```text
REFRESH MAP
```

4. Перевірити:

```text
Total Files > 0
Mapped > 0
Interaction Map заповнена
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7.1 file control map"
git push origin dev
