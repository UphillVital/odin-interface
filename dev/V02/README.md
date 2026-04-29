# ODIN_ADMIN_V04_6_QA_EXPORT_FIX_PACKAGE_v1

## Що це

FIX для V04.6 UI Polish.

## Проблема

Після `QA CHECK` було:

```text
QA: FAIL
```

Після `EXPORT PACKAGE`:

```text
EXPORT BLOCKED: QA_FAILED
```

## Причина

QA перевіряла маркери надто грубо й не бачила реальні блоки уроку.

## Виправлення

Новий `v046_engine.js` має надійнішу QA-перевірку:

- TITLE_PRESENT
- GOAL_BLOCK_PRESENT
- RULE_BLOCK_PRESENT
- EXAMPLES_BLOCK_PRESENT
- RN_PRESENT
- DP_PRESENT
- SD_PRESENT
- DIALOG_PRESENT
- VOCABULARY_PRESENT
- PRACTICE_PRESENT
- HOMEWORK_PRESENT
- HIGHLIGHT_PRESENT
- QA_REPORT_PRESENT

## Куди класти

Розпакувати у:

```text
odin-interface/dev/V02/
```

Замінити:

```text
v046_engine.js
```

## Як перевірити

1. Відкрити:

```text
dev/V02/index.html
```

2. Натиснути:

```text
GENERATE LESSON
```

3. Натиснути:

```text
QA CHECK
```

Очікувано:

```text
QA: PASS
```

4. Натиснути:

```text
EXPORT PACKAGE
```

Очікувано: скачуються export-файли.

## Git

```bash
git add dev/V02/
git commit -m "v3.67 fix ODIN V04.6 QA export gate"
git push origin dev
```
