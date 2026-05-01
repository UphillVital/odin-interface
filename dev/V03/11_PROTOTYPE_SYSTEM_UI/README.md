# ODIN V03 PACKAGE 09 FIX — I18N + Assisted Mode without breaking Prototype 08

## Purpose

This package fixes Package 09 by preserving the working Package 08 structure and adding only the requested improvements.

## Fixed issues

- Restores Package 08 core zones, including OIS Core.
- Preserves the original `data-theme` theme model.
- Sets Light as the default theme.
- Adds UA/EN language switching.
- Adds contextual `?` help buttons.
- Adds modal explanations.
- Adds Assisted Mode explanation actions.
- Avoids empty folders and scripts.

## Files

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/
├─ index.html
├─ styles.css
├─ app.js
└─ README.md
```

## Integration

Unzip into the project root:

```text
C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\
```

This package updates the prototype files in:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/
```

## QA checklist

- Opens in Light theme by default.
- Theme button switches Light/Dark correctly.
- UA/EN switch updates header, tree, zones, context and buttons.
- Command Center opens by default.
- All tree zones work: Command, System Map, File Workspace, OIS Core, Manual / Help.
- `?` buttons open explanations without changing zone accidentally.
- `How to use?` opens general help.
- `Explain current zone` explains active zone.
- MASTER START opens the system start model in the main zone.

## Git

```bash
git add dev/V03/
git commit -m "Fix ODIN Interface V03 i18n assisted mode prototype"
git push origin dev
```
