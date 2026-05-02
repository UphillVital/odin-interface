# README_v03_31_3 — ODIN PACKAGE 31.3 FULL PAGE RECOVERY

## Призначення

Цей пакет повністю відновлює робочі сторінки Інтерфейсу ОДІН без ручного редагування коду:

- `dev/V03/commit_builder.html`
- `dev/V03/state_workspace.html`
- `dev/V03/_templates/odin_page_template.html`
- `dev/V03/_page_scripts/commit_builder.js`
- `dev/V03/_page_scripts/state_workspace.js`

Пакет виправляє проблему, коли сторінки мали правильний дизайн, але були просто копіями еталону без власного функціонального наповнення.

## База відновлення

Поточна стабільна точка:

```text
V03.27.2 — GLOBAL UI MATRIX RESTORE
```

Перед встановленням бажано перевірити:

```powershell
git status
```

## Корінь локального репозиторію

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

## Точна карта розміщення кожного файлу

| Файл з пакету | Куди покласти у репозиторії |
|---|---|
| `README_v03_31_3.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\README_v03_31_3.md` |
| `CHANGELOG_v03_31_3.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\CHANGELOG_v03_31_3.md` |
| `MANIFEST_v03_31_3.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\MANIFEST_v03_31_3.md` |
| `QA_REPORT_v03_31_3.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\QA_REPORT_v03_31_3.md` |
| `dev/V03/commit_builder.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\commit_builder.html` |
| `dev/V03/state_workspace.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\state_workspace.html` |
| `dev/V03/_templates/odin_page_template.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\odin_page_template.html` |
| `dev/V03/_templates/TEMPLATE_RULES.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\TEMPLATE_RULES.md` |
| `dev/V03/_page_scripts/commit_builder.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\commit_builder.js` |
| `dev/V03/_page_scripts/state_workspace.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\state_workspace.js` |
| `dev/V03/_maintenance/cleanup_v03_31_3.ps1` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_maintenance\cleanup_v03_31_3.ps1` |

## Важливо: що не класти в еталонну папку

Папка нижче є тільки еталоном дизайну:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/
```

У ній не повинно бути робочих сторінок:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.html
dev/V03/11_PROTOTYPE_SYSTEM_UI/state_workspace.html
dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.css
dev/V03/11_PROTOTYPE_SYSTEM_UI/commit_builder.js
```

## Cleanup без ручного редагування коду

Якщо ці зайві файли ще є, запусти з кореня репозиторію:

```powershell
powershell -ExecutionPolicy Bypass -File dev\V03\_maintenance\cleanup_v03_31_3.ps1
```

## Перевірка після встановлення

Відкрити:

```text
http://127.0.0.1:5500/dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html
http://127.0.0.1:5500/dev/V03/commit_builder.html
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Очікування:

- усі сторінки мають однаковий shell-дизайн;
- `commit_builder.html` показує Commit Builder і генерує Git-команди;
- `state_workspace.html` показує стан системи, checkpoint і QA-блок;
- робочі сторінки не лежать у `11_PROTOTYPE_SYSTEM_UI/`.

## Git-команди для фіксації

```bash
git add dev/V03/ README_v03_31_3.md CHANGELOG_v03_31_3.md MANIFEST_v03_31_3.md QA_REPORT_v03_31_3.md
git commit -m "ODIN V03.31.3 — відновлено робочі сторінки та зафіксовано шаблон Інтерфейсу"
git push origin feature/odin-interface-v03
```

## Відкат

Якщо після встановлення щось не так:

```powershell
git restore dev/
git clean -fd dev/
Remove-Item README_v03_31_3.md, CHANGELOG_v03_31_3.md, MANIFEST_v03_31_3.md, QA_REPORT_v03_31_3.md -ErrorAction SilentlyContinue
git status
```
