# ODIN_ADMIN_V02_5_PACKAGE_BUILDER_PACKAGE_v1

## Що це
Пакет оновлення ODIN-ADMIN V02.5: Package Builder System.

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
- `odin_package_builder.js`
- Package Builder блок у `admin.html`
- кнопки:
  - BUILD PACKAGE
  - COPY README
  - COPY MANIFEST
  - COPY STATUS
- генерація:
  - README.md
  - PACKAGE_MANIFEST_*.md
  - PACKAGE_STATUS_*.json
- лог результату

## Важливо
Це front-end builder. Браузер не записує файли напряму в repo.
Поки результат показується у вікні Package Builder і копіюється вручну.
Пізніше можна додати download ZIP або GitHub API.

## Як перевірити
1. Відкрити `dev/V02/index.html`
2. Увійти паролем `ODIN`
3. Вибрати вузол зліва
4. Натиснути `PACKAGE`
5. У блоці Package Builder має зʼявитись README / MANIFEST / STATUS

## Git
```bash
git add dev/V02/
git commit -m "v3.48 add ODIN-ADMIN V02.5 package builder system"
git push origin dev
```
