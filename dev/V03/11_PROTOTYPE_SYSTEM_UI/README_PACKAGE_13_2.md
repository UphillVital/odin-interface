# PACKAGE 13.2 — Restore Contextual Help System

## Purpose
Restore the accepted ODIN explanation model:
- local `?` hints near interface elements;
- small tooltip explanations;
- right-side Assisted Mode panel;
- no full-screen Help modal;
- no automatic Help popup on page reload.

## Integration
Extract into the repository root:

`C:\Users\Vitalii\OneDrive\Документы\GitHub\odin-interface\`

Test:

`dev/V03/11_PROTOTYPE_SYSTEM_UI/index.html`

## QA Checklist
- Page reload does not open any Help modal.
- `?` hints show local tooltip explanations.
- Right panel changes explanation when switching zones.
- UA/EN toggle works.
- Light theme is default, Dark theme remains available.
- Projects context works with File Workspace.
