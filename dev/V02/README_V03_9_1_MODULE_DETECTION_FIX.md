# ODIN V03.9.1 — MODULE DETECTION FIX

## Fix

V03.9 marked runtime/index modules as UNKNOWN on admin.html.

V03.9.1 separates module scopes:

- ADMIN
- RUNTIME
- SHARED
- ADMIN_RUNTIME_BRIDGE

New statuses:

- LOADED
- PARTIAL
- ADMIN_ONLY
- RUNTIME_ONLY
- NOT_REQUIRED_HERE
- MISSING

Runtime modules not loaded on admin.html are not treated as critical risks.

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.9.1 module detection"
git push origin dev
