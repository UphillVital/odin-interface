# README_v03_31_5 — ODIN PACKAGE 31.5 RETURN FUNCTIONALITY

## Призначення
Пакет повертає власний функціональний контент сторінкам `commit_builder.html` і `state_workspace.html`, залишаючи спільний дизайн від еталону `dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`.

## Точна карта встановлення
Корінь репозиторію:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

| Файл з пакету | Куди покласти |
|---|---|
| `README_v03_31_5.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\README_v03_31_5.md` |
| `CHANGELOG_v03_31_5.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\CHANGELOG_v03_31_5.md` |
| `MANIFEST_v03_31_5.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\MANIFEST_v03_31_5.md` |
| `QA_REPORT_v03_31_5.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\QA_REPORT_v03_31_5.md` |
| `dev/V03/commit_builder.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\commit_builder.html` |
| `dev/V03/state_workspace.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\state_workspace.html` |
| `dev/V03/_page_scripts/commit_builder.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\commit_builder.js` |
| `dev/V03/_page_scripts/state_workspace.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\state_workspace.js` |

## Що не копіювати
Пакет не містить і не повинен містити `PACKAGE_DOCS/`, `README.md`, `CHANGELOG.md`, `HANGELOG.md`, `ADME.md`, `EADME.md`, `ANGELOG.md`.

## Тест
Відкрити:

```text
http://127.0.0.1:5500/dev/V03/commit_builder.html
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Очікування:
- стилі є;
- сторінки не є копією index;
- Commit Builder показує блок генерації Git-команд;
- State Workspace показує картки стану і QA.

## Git-команди

```bash
git add dev/V03/commit_builder.html dev/V03/state_workspace.html dev/V03/_page_scripts/commit_builder.js dev/V03/_page_scripts/state_workspace.js README_v03_31_5.md CHANGELOG_v03_31_5.md MANIFEST_v03_31_5.md QA_REPORT_v03_31_5.md
git commit -m "ODIN V03.31.5 — повернено функціональність сторінок Commit Builder і State Workspace"
git push origin feature/odin-interface-v03
```
