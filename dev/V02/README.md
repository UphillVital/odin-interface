# ODIN_ADMIN_V02_3_QA_LAYER_PACKAGE_v1

## Що це
Пакет оновлення ODIN-ADMIN V02.3: QA Control Layer.

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
- `odin_qa_layer.js`
- QA Report блок у `admin.html`
- стилі QA у `style.css`
- кнопка `QA CHECK` реально аналізує вибраний вузол/файл
- PASS / WARN / FAIL
- checklist
- лог результату

## Як перевірити
1. Відкрити `dev/V02/index.html`
2. Увійти паролем `ODIN`
3. Вибрати вузол зліва
4. Натиснути `OPEN`
5. Натиснути `QA CHECK`
6. Перевірити блок `QA Control`

## Git
```bash
git add dev/V02/
git commit -m "v3.46 add ODIN-ADMIN V02.3 QA layer"
git push origin dev
```
