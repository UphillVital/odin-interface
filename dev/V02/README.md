# ODIN_ADMIN_V02_6_STABILIZATION_PACKAGE_v1

## Що це
Пакет стабілізації ODIN-ADMIN V02.6.

## Мета
Не додавати нові великі функції, а перевірити і зафіксувати поточний повний pipeline:

```text
READ → QA → CONTROL → PACKAGE → EXPORT → DOWNLOAD
```

## Куди класти
Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

Повний шлях:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02\
```

## Що додає
- STABILIZATION_CHECKLIST_V02_6_v1.md
- STABILIZATION_TEST_PLAN_V02_6_v1.md
- STABILIZATION_STATUS_V02_6_v1.json
- STABILIZATION_REPORT_TEMPLATE_V02_6_v1.md
- README.md

## Як виконати стабілізацію
1. Відкрити `dev/V02/index.html`.
2. Увійти через пароль `ODIN`.
3. Пройти checklist.
4. Заповнити stabilization report.
5. Якщо все OK — зафіксувати V02.6 як stable base.
6. Якщо є помилки — не йти в V03, спочатку FIX.

## Git
```bash
git add dev/V02/
git commit -m "v3.50 add ODIN-ADMIN V02.6 stabilization package"
git push origin dev
```
