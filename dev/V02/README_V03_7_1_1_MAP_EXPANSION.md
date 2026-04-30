# ODIN V03.7.1.1 — MAP EXPANSION

## Що це

Розширення File Control Map.

Після тесту V03.7.1 було видно:

```text
Total Files: 182
Mapped: 68
Unmapped: 114
```

Проблема була в тому, що карта розуміла здебільшого README / MANIFEST / STATUS, але не розуміла основні системні файли ODIN.

---

## Що робить пакет

Розширює правила `file_control_map.js`, щоб ODIN розкладав файли по системних шарах:

```text
00 CORE SYSTEM
01 ODIN INTERFACE SYSTEM
02 MODULE SYSTEM
03 HEADER LOCK
04 QA SYSTEM
05 LESSON SYSTEM
06 ISSU / SSUDT
07 UNIFIED LESSON TEMPLATE
08 HIGHLIGHT SYSTEM
09 TRANSLATION SYSTEM
10 AUDIO / VOICE SYSTEM
11 EXPORT SYSTEM
12 GIT DEPLOYMENT
13 TEAM SYSTEM
14 WORKFLOW SYSTEM
15 PACKAGES SYSTEM
16 RULES SYSTEM
ODIN ROOT FILES
DEV V02 RUNTIME UI
DOCS / STATUS / PACKAGE HISTORY
```

---

## Що НЕ робить

```text
не видаляє файли
не пише файли
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

2. Знайти:

```text
File Control Map Expanded
```

3. Натиснути:

```text
REFRESH MAP
```

4. Очікувано:

```text
Mapped має значно зрости
Unmapped має значно зменшитись
```

---

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Expand V03.7.1 file control map rules"
git push origin dev
