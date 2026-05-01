# DECISION ENGINE v1

## Purpose
The Decision Engine chooses the next safe action.

```text
INTENT + MODE + STATE + RULES → NEXT ACTION
```

## Mandatory Decision Rules

### QA Flow
```text
BUILD_DONE → QA_PENDING
QA_FAILED → FIX_REQUIRED
FIX_DONE → QA_PENDING
QA_PASSED → EXPORT_READY
```

### Export Flow
```text
EXPORT_REQUESTED + QA_FAILED → EXPORT_BLOCKED
EXPORT_REQUESTED + QA_PASSED → PACKAGE_BUILD
```

### Discussion Flow
```text
DISCUSSION_ACTIVE → NO_CODE_GENERATION
unless user explicitly requests files/code/package
```

### Stable System Protection
```text
Target = V02 stable files → require isolation or explicit update plan
Target = V03 modeling → allowed within dev/V03 rules
```

## Output Requirement
Decision Engine should always produce selected action, reason, affected zone, and expected next state.
