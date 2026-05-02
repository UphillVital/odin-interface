# README_v03_31_2 — ODIN PACKAGE 31.2 CLEAN TEMPLATE + RESTORE PAGE CONTENT

## Purpose
This package fixes the previous failure where `commit_builder.html` and `state_workspace.html` became plain copies of the etalon page and lost their own functional content.

## Recovery baseline before installing
Confirmed clean baseline:

```text
V03.27.2 — GLOBAL UI MATRIX RESTORE
```

Before installing, recommended check:

```bash
git status
```

Expected:

```text
nothing to commit, working tree clean
```

## Exact file placement map
Local repository root:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface
```

Copy every file exactly as listed:

| File from package | Must be placed here |
|---|---|
| `README_v03_31_2.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\README_v03_31_2.md` |
| `CHANGELOG_v03_31_2.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\CHANGELOG_v03_31_2.md` |
| `MANIFEST_v03_31_2.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\MANIFEST_v03_31_2.md` |
| `QA_REPORT_v03_31_2.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\QA_REPORT_v03_31_2.md` |
| `dev/V03/_templates/odin_page_template.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\odin_page_template.html` |
| `dev/V03/_templates/TEMPLATE_RULES.md` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_templates\TEMPLATE_RULES.md` |
| `dev/V03/_page_scripts/commit_builder.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\commit_builder.js` |
| `dev/V03/_page_scripts/state_workspace.js` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\_page_scripts\state_workspace.js` |
| `dev/V03/commit_builder.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\commit_builder.html` |
| `dev/V03/state_workspace.html` | `C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\dev\V03\state_workspace.html` |

## Do not copy anything else
This package intentionally does not contain:

```text
README.md
CHANGELOG.md
MANIFEST.md
QA_REPORT.md
PACKAGE_DOCS/
HANGELOG.md
ADME.md
EADME.md
ANGELOG.md
```

## Important architecture rule
`dev/V03/11_PROTOTYPE_SYSTEM_UI/` remains the design etalon folder.
Do not put working pages there.

Allowed there:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html
dev/V03/11_PROTOTYPE_SYSTEM_UI/styles.css
dev/V03/11_PROTOTYPE_SYSTEM_UI/app.js
```

Working pages stay here:

```text
dev/V03/commit_builder.html
dev/V03/state_workspace.html
```

## Test URLs
Open:

```text
http://127.0.0.1:5500/dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html
http://127.0.0.1:5500/dev/V03/commit_builder.html
http://127.0.0.1:5500/dev/V03/state_workspace.html
```

Expected:
- same design shell on all pages
- `commit_builder.html` shows Commit Builder content and generates git commands
- `state_workspace.html` shows State Workspace status/content
- no duplicate `commit_builder.html` or `state_workspace.html` inside `11_PROTOTYPE_SYSTEM_UI/`

## Git commands

```bash
git add dev/V03/ README_v03_31_2.md CHANGELOG_v03_31_2.md MANIFEST_v03_31_2.md QA_REPORT_v03_31_2.md
git commit -m "ODIN V03.31.2 — Lock page template and restore functional page content"
git push origin feature/odin-interface-v03
```

## Rollback
If anything is wrong:

```bash
git restore dev/
git clean -fd dev/
Remove-Item README_v03_31_2.md, CHANGELOG_v03_31_2.md, MANIFEST_v03_31_2.md, QA_REPORT_v03_31_2.md -ErrorAction SilentlyContinue
git status
```
