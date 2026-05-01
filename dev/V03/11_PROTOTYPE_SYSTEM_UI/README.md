# ODIN V03 PACKAGE 09 — I18N + Assisted Mode + Light Default

## Purpose

This package updates the first ODIN V03 prototype after user review.

## Changes

- Light theme is now the default.
- Dark theme remains available.
- Ukrainian and English are available immediately.
- Assisted Mode is visible as a right-side explanation panel.
- Help popups and contextual hint buttons are added.
- Work zones now explain their purpose and next step.
- MASTER START now opens a clear explanatory modal.

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

Open:

```text
dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html
```

## QA checklist

- Page opens in Light theme by default.
- Dark theme button switches to dark.
- UA/EN buttons switch language.
- Left navigation switches work zones.
- Question-mark hints open popups.
- "How to use?" opens a help popup.
- "Explain current zone" explains the active zone.
- MASTER START opens a system explanation popup.

## Git

```bash
git add dev/V03/
git commit -m "Add ODIN Interface V03 i18n assisted mode prototype"
git push origin dev
```
