# ODIN V04 — WORKFLOW LOCK

## Stable workflow

```text
1. AUTO SELECT CORE
2. Select lesson type
3. Select mode
4. Select level / density
5. Enter topic and task
6. GENERATE LESSON
7. LIVE PREVIEW
8. QA CHECK
9. SAVE LESSON
10. EXPORT PACKAGE
```

## Required order before export

```text
GENERATE LESSON
→ QA CHECK
→ EXPORT PACKAGE
```

## Export gate

```text
IF QA = PASS
  EXPORT READY

IF QA = FAIL
  EXPORT BLOCKED
```

## Product workflow goal

The user should not need to download the lesson just to inspect it.

```text
Preview first.
Export after QA.
```
