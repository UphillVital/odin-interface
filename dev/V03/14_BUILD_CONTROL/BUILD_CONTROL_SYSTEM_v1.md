# ODIN V03 — Build Control System v1

## Purpose
Build Control gives ODIN a controlled memory of stable states.

It answers:
- what state the interface was in;
- what changed;
- why the change was made;
- whether the state is stable;
- how to return to it.

## Core Flow

```text
CHANGE → QA → SNAPSHOT → DESCRIPTION → RESTORE POINT
```

## Snapshot Requirements
Every snapshot must contain:

1. Snapshot ID
2. Date / version label
3. Short title
4. What existed before
5. What changed
6. What improved
7. Known limitations
8. QA status
9. Restore note

## Statuses

```text
DRAFT
TESTING
STABLE
LOCKED
DEPRECATED
```

## Restore Rule
Rollback is allowed only to snapshots marked:

```text
STABLE
LOCKED
```

## ODIN Rule
A build is not just a file state. A build is a described system condition.
