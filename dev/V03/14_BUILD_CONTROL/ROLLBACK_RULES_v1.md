# Rollback Rules v1

## Goal
Return to a known working state without confusion.

## Rules
1. Never rollback blindly.
2. Always read snapshot description first.
3. Restore only STABLE or LOCKED snapshots.
4. Record why rollback happened.
5. After rollback, run QA before continuing.

## Rollback Decision

```text
Current state broken → find last STABLE snapshot → compare scope → restore → QA → continue
```

## Forbidden
- rollback to undocumented states;
- overwrite stable files without description;
- continue development from unknown state.
