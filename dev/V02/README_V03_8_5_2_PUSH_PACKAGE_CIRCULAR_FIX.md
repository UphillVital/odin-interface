# ODIN V03.8.5.2 — PUSH PACKAGE CIRCULAR FIX

## Fixes

- Removes circular reference from snapshot/odin_state before saving push_package.
- Treats auto_push_allowed=false as expected/pass via auto_push_disabled=true.
- Detects placeholder/no-path git commands as not ready.
- Saves compact push_package summary to state to avoid recursive payload.

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.8.5.2 push package circular snapshot"
git push origin dev
