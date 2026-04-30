# ODIN V03.7 — FILE CONTROL B

## Що це

Пакет додає в `admin.html` розділ:

```text
File Control B
```

ODIN тепер:

```text
бачить файли
пропонує зміни
генерує git-команди
```

---

## Важливо

Це ще НЕ File Interaction Map.

Карта взаємодії файлів буде наступним кроком:

```text
V03.7.1 — FILE CONTROL MAP
```

---

## Що змінюється

У `dev\V02` додається:

```text
file_control.js
```

Оновлюється:

```text
admin.html
```

Додаються документи:

```text
README_V03_7_FILE_CONTROL_B.md
test_scenario_V03_7_FILE_CONTROL_B.md
PACKAGE_MANIFEST_V03_7_FILE_CONTROL_B.md
```

У БАЗУ додається:

```text
ODIN_TREE_PROJECT_v1\14_WORKFLOW\ODIN_V03_7_FILE_CONTROL_B_FIXATION_v1.md
```

---

## Що НЕ робить цей пакет

```text
не записує файли напряму
не видаляє файли
не робить автоматичний commit
не змінює engine
```

---

## Як тестувати

1. Відкрити:

```text
http://127.0.0.1:5500/dev/V02/admin.html
```

2. Знайти блок:

```text
File Control B
```

3. Натиснути:

```text
REFRESH FILES
```

4. Вибрати 1–2 файли.

5. Натиснути:

```text
PROPOSE UPDATE
```

6. Перевірити, що зʼявились Git-команди.

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V03.7 file control proposal and git commands"
git push origin dev
