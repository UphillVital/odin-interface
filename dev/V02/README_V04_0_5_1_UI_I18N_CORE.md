# ODIN V04.0.5.1 — UI + I18N CORE

## What this adds

- `odin_i18n.js`
- `odin_base_ui.js`
- `odin_ui.css`
- UA/EN language switch
- `ODIN_STATE.data.lang`
- Level system:
  - Level 1 — User
  - Level 2 — Control
  - Level 3 — System
- Base modern control shell

## Safety

- Does not remove old blocks.
- Does not replace engine.
- Does not execute git.
- Old V03/V04 blocks stay available.

## Test

1. Open admin.html.
2. Switch UA/EN.
3. Check labels change.
4. Switch Level 1/2/3.
5. Confirm old blocks still exist in Level 3.
6. Main action buttons should not break anything.

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Add V04.0.5.1 UI i18n core"
git push origin dev
