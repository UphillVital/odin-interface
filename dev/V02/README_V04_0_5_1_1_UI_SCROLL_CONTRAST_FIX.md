# ODIN V04.0.5.1.1 — UI SCROLL + CONTRAST FIX

## Fix

The Level buttons could cause the page to jump to the top because switching Level 1/2/3 hides or shows large blocks, changing document height.

## Implemented

- Preserve scroll position when changing UI level.
- Preserve scroll position when Show/Hide Advanced changes layout.
- Add `type="button"` to new UI buttons.
- Improve contrast in dark control shell.
- Keep all existing V03/V04 blocks unchanged.

## Test

1. Open admin.html.
2. Scroll a bit.
3. Click Level 1 / Level 2 / Level 3 repeatedly.
4. Expected: page does not jump to header/top.
5. Click Show Advanced / Hide Advanced repeatedly.
6. Expected: no unwanted jump.
7. Check text contrast in new ODIN Control Center.

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V04.0.5.1.1 UI scroll and contrast"
git push origin dev
