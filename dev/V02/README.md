# ODIN_ADMIN_V02_6_REAL_EXPORT_PACKAGE_v1

## Що це
Пакет оновлення ODIN-ADMIN V02.6: Real Export System.

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
- `odin_export_system.js`
- Export System блок у `admin.html`
- кнопки:
  - PREPARE EXPORT
  - DOWNLOAD README
  - DOWNLOAD MANIFEST
  - DOWNLOAD STATUS
  - DOWNLOAD EXPORT HTML
- формує downloadable файли через browser Blob
- лог export-дій

## Важливо
Це front-end export. Браузер створює файли для скачування, але не записує їх автоматично в repo.
Після скачування файл треба вручну покласти у потрібну папку repo і зробити Git push.

## Як перевірити
1. Відкрити `dev/V02/index.html`
2. Увійти паролем `ODIN`
3. Вибрати вузол зліва
4. Натиснути `PACKAGE`
5. Натиснути `EXPORT`
6. У блоці Export System натиснути `PREPARE EXPORT`
7. Завантажити README / MANIFEST / STATUS / EXPORT HTML

## Git
```bash
git add dev/V02/
git commit -m "v3.49 add ODIN-ADMIN V02.6 real export system"
git push origin dev
```
