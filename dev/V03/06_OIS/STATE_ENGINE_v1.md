# STATE ENGINE v1

## Purpose
The State Engine tracks what ODIN knows about the current system and workflow.

## State Categories

### System State
`SYSTEM_STABLE`, `SYSTEM_DEGRADED`, `SYSTEM_BLOCKED`, `SYSTEM_UNKNOWN`

### Workflow State
`DISCUSSION_ACTIVE`, `PLAN_READY`, `BUILD_READY`, `BUILD_DONE`, `QA_PENDING`, `QA_PASSED`, `QA_FAILED`, `EXPORT_READY`, `EXPORT_BLOCKED`, `PACKAGE_DONE`

### File State
`UNCHANGED`, `MODIFIED`, `DIFF_READY`, `APPROVAL_PENDING`, `APPROVED`, `REJECTED`, `PACKAGED`

### Confidence State
`CONFIRMED`, `ASSUMED`, `UNCERTAIN`, `BLOCKED_BY_MISSING_DATA`

## Required State Display
Every major Work Zone should show current mode, active target, active state, blockers, and next recommended action.

## No Blind Changes Rule
No file/workflow change should occur without a visible state transition.
