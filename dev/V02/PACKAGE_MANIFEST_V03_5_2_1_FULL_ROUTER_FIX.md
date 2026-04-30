# PACKAGE MANIFEST — ODIN V03.5.2.1 FULL ROUTER FIX

## Target

```text
dev\V02\
ODIN_TREE_PROJECT_v1\14_WORKFLOW\
```

## Purpose

Виправити глобальну доступність `ODIN_SMART_ROUTER` для Router Adapter без ручного редагування.

## Runtime files

- dev\V02\index.html
- dev\V02\router_global_fix.js
- dev\V02\README_V03_5_2_1_FULL_ROUTER_FIX.md
- dev\V02\test_scenario_V03_5_2_1_FULL_ROUTER_FIX.md
- dev\V02\PACKAGE_MANIFEST_V03_5_2_1_FULL_ROUTER_FIX.md

## Base fixation

- ODIN_TREE_PROJECT_v1\14_WORKFLOW\ODIN_ROUTER_GLOBAL_FIX_v1.md

## Does not modify

- smart_router.js
- content_engine.js
- lesson_generator.js
- session.js
- viewer.js

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.5.2 router globals for mode adapter"
git push origin dev
