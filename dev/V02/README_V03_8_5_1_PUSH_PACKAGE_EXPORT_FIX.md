# ODIN V03.8.5.1 — PUSH PACKAGE EXPORT FIX

## Що виправлено

V03.8.5 показував UI, але кнопка BUILD PUSH PACKAGE могла нічого не робити через runtime-помилку.

V03.8.5.1 робить render robust:
- try/catch
- fallback for missing state
- fallback for missing snapshot module
- visible error output instead of silent failure
- no auto-exec

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.8.5 push package export"
git push origin dev
