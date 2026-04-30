# ODIN V03.8.5.3 — FORCE LIVE REBUILD FIX

## Fix

Push Package now force rebuilds before export:

1. ODIN_STATE.load
2. Task Control render
3. Git Control renderPlan/generateCommands
4. Diff Planner render
5. Safe Push render/check

It then reads live DOM and modules, not stale state only.

## Diagnostic output

If package is NOT_READY, Human Push Package now shows:

- exact reasons
- source_tasks
- included_paths_count
- included paths
- rebuild log

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.8.5.3 push package live rebuild"
git push origin dev
