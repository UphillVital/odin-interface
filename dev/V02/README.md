# ODIN_ADMIN_V02_PRO_PACKAGE_v1

## Що це
PRO-каркас ODIN-ADMIN V02.

## Куди класти
Розпакувати всі файли у:

```text
odin-interface/dev/V02/
```

Повний шлях:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V02\
```

## Що буде в папці

```text
dev/V02/
├─ index.html
├─ login.html
├─ admin.html
├─ style.css
├─ auth.js
├─ app.js
├─ odin_tree_data.js
├─ odin_admin_state.js
├─ odin_sync.js
├─ README.md
├─ PACKAGE_MANIFEST_V02_PRO_v1.md
└─ PACKAGE_STATUS_V02_PRO_v1.json
```

## Як запустити
Відкрити:

```text
dev/V02/index.html
```

Логін MVP:

```text
ODIN
```

## Що робить
- `index.html` перенаправляє на login або admin;
- `login.html` дає сторінку входу;
- `admin.html` показує ODIN-ADMIN;
- зліва дерево ODIN;
- справа керування вибраним вузлом;
- є лог, snapshot, sync;
- V01 не чіпається.

## Важливо
Це front-end PRO MVP. Пароль у front-end не є справжньою безпекою. Для реальної авторизації потрібен backend або GitHub auth.

## Git
```bash
git add dev/V02/
git commit -m "v3.43 add ODIN-ADMIN V02 PRO base"
git push origin dev
```
