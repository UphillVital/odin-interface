# README_v03_31_4 — ODIN PACKAGE 31.4 FIX CSS/JS PATHS FULL

## Призначення

Цей пакет виправляє помилку, через яку сторінки `commit_builder.html` і `state_workspace.html` відкривалися без стилів.

Причина помилки: сторінки підключали неактуальний шлях:

```html
17_UI_CORE/odin_ui_core.css
17_UI_CORE/odin_ui_core.js
```

Правильний шлях для робочих сторінок у `dev/V03/`:

```html
11_PROTOTYPE_SYSTEM_UI/styles.css
11_PROTOTYPE_SYSTEM_UI/app.js
```

## Корінь локального репозиторію

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

## Точна карта розміщення кожного файлу

| Файл з пакету | Куди покласти у репозиторії |
|---|---|
| `README_v03_31_4.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\README_v03_31_4.md` |
| `CHANGELOG_v03_31_4.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\CHANGELOG_v03_31_4.md` |
| `MANIFEST_v03_31_4.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\MANIFEST_v03_31_4.md` |
| `QA_REPORT_v03_31_4.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\QA_REPORT_v03_31_4.md` |
| `dev/V03/commit_builder.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\commit_builder.html` |
| `dev/V03/state_workspace.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\state_workspace.html` |
| `dev/V03/_templates/odin_page_template.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\odin_page_template.html` |
| `dev/V03/_templates/TEMPLATE_RULES.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\TEMPLATE_RULES.md` |
| `dev/V03/_page_scripts/commit_builder.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\commit_builder.js` |
| `dev/V03/_page_scripts/state_workspace.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\state_workspace.js` |
| `dev/V03/_maintenance/cleanup_v03_31_4.ps1` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_maintenance\cleanup_v03_31_4.ps1` |

## Після копіювання пакету

Запусти cleanup з кореня репозиторію:

```powershell
powershell -ExecutionPolicy Bypass -File dev\V03\_maintenance\cleanup_v03_31_4.ps1
```

## Тест

Відкрити:

```text
http://127.0.0.1:5500/dev/V03/commit_builder.html
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Очікування:

- сторінки мають стилі;
- дизайн відповідає еталону `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`;
- `commit_builder.html` показує Commit Builder і кнопку копіювання команд;
- `state_workspace.html` показує State Workspace і стан системи;
- у `dev/V03/11_PROTOTYPE_SYSTEM_UI/` немає `commit_builder.html` і `state_workspace.html`.

## Git-команди

```bash
git add dev/V03/commit_builder.html dev/V03/state_workspace.html dev/V03/_templates/ dev/V03/_page_scripts/ dev/V03/_maintenance/ README_v03_31_4.md CHANGELOG_v03_31_4.md MANIFEST_v03_31_4.md QA_REPORT_v03_31_4.md
git commit -m "ODIN V03.31.4 — виправлено шляхи CSS/JS для сторінок Інтерфейсу ОДІН"
git push origin feature/odin-interface-v03
```

## Відкат

```powershell
git restore dev/
git clean -fd dev/
Remove-Item README_v03_31_4.md, CHANGELOG_v03_31_4.md, MANIFEST_v03_31_4.md, QA_REPORT_v03_31_4.md -ErrorAction SilentlyContinue
git status
```
