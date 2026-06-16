# ODIN V03.7 FILE CONTROL B FIXATION v1

## Рішення

[DECISION]
V03.7 = FILE CONTROL B.

ODIN має:

- бачити файли
- пропонувати зміни
- генерувати git-команди

---

## Що це НЕ є

[FIXED]
Це ще не File Interaction Map.

[DECISION]
File Interaction Map переноситься в V03.7.1.

---

## Архітектура

admin.html
→ file_control.js
→ odin_tree_data.js / odin_file_index.js
→ selected files
→ proposed change
→ git commands

---

## Правила

[RULE]
Нічого не видаляти автоматично.

[RULE]
Нічого не записувати у файли напряму.

[RULE]
Будь-яка майбутня зміна має пройти через CONFIRM.

[RULE]
Git-команди тільки генеруються, користувач виконує їх сам.

---

## Поточні функції

- REFRESH FILES
- SELECT FILE
- PROPOSE UPDATE
- PROPOSE FIX
- PROPOSE DOCS
- PROPOSE REMOVE
- COPY GIT COMMANDS

---

## Наступний крок

V03.7.1 — FILE CONTROL MAP:

- карта взаємодії файлів
- dependencies
- unknown files
- diff planning
