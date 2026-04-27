# ODIN_ADMIN_V02_4_TEMPLATE_CONTROL_PACKAGE_v1

## Що це
Пакет оновлення ODIN-ADMIN V02.4: Template Control System.

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
- `odin_template_control.js`
- Template Control блок у `admin.html`
- кнопки:
  - ROUTE CHECK
  - LESSON LOCK
  - ADMIN LOCK
  - ROUTER QA
- контроль task_type → template
- hard lock для lesson/photo_lesson/ISSU/SSUDT
- лог результатів

## Як перевірити
1. Відкрити `dev/V02/index.html`
2. Увійти паролем `ODIN`
3. Вибрати `Template Router`
4. Натиснути `OPEN`
5. Натиснути `QA CHECK`
6. У блоці `Template Control` натиснути `ROUTE CHECK`
7. Перевірити, що lesson/photo_lesson веде до `TEMPLATE_BASE_v1.html`

## Git
```bash
git add dev/V02/
git commit -m "v3.47 add ODIN-ADMIN V02.4 template control system"
git push origin dev
```
