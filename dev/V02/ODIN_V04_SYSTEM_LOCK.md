# ODIN V04 — SYSTEM LOCK

## Lock status

```text
ACTIVE
```

## Locked stable behaviors

The following must not be broken:

```text
1. GENERATE LESSON creates HTML.
2. LIVE PREVIEW updates after generation.
3. QA CHECK correctly detects lesson structure.
4. EXPORT PACKAGE is blocked if QA fails.
5. EXPORT PACKAGE downloads files after QA passes.
6. SAVE LESSON stores the generated lesson.
7. LOAD restores lesson into preview/code.
8. Presets must continue to set mode/type/density.
9. ODIN_TREE_DATA must remain readable.
10. README must be included in every future update package.
```

## No-break rule

```text
Do not remove or replace working V04 behavior without creating a new version layer.
```

## Change rule

Future changes must follow:

```text
PLAN
→ PACKAGE
→ TEST
→ QA
→ CHECKPOINT
```

## Stop condition

If a future update causes:

```text
QA: FAIL
EXPORT BLOCKED unexpectedly
PREVIEW not updating
TREE not loading
```

then stop and rollback to V04.7 checkpoint.
