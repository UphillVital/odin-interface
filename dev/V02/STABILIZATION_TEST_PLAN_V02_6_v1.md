# STABILIZATION TEST PLAN V02.6 v1

## Test 1 — Boot
1. Open `dev/V02/index.html`
2. Login with `ODIN`
3. Expected: admin panel opens

## Test 2 — Open Router
1. Select `Template Router`
2. Click `OPEN`
3. Expected: real GitHub raw content or clear fallback

## Test 3 — QA Router
1. With Template Router selected, click `QA CHECK`
2. Expected: QA result visible

## Test 4 — Template Lock
1. Click `TEMPLATE`
2. Click `LESSON LOCK`
3. Expected: lesson hard lock points to:
```text
ODIN_TREE_PROJECT_v1/07_UNIFIED_LESSON_TEMPLATE/TEMPLATE_BASE_v1.html
```

## Test 5 — Package
1. Click `PACKAGE`
2. Expected:
- README generated
- MANIFEST generated
- STATUS generated

## Test 6 — Export
1. Click `EXPORT`
2. Click `PREPARE EXPORT`
3. Download all export files
4. Expected: files download correctly

## Test 7 — GitHub Raw
1. Select a file that exists in GitHub branch `dev`
2. Click `OPEN`
3. Expected: real content loads, not fallback

## Test 8 — Final State
1. Run `git status`
2. Expected:
```text
nothing to commit, working tree clean
```
