# ODIN V04 — QA RULES

## QA result states

```text
PASS
FAIL
WAIT
```

## Required checks

```text
TITLE_PRESENT
GOAL_BLOCK_PRESENT
RULE_BLOCK_PRESENT
EXAMPLES_BLOCK_PRESENT
RN_PRESENT
DP_PRESENT
SD_PRESENT
DIALOG_PRESENT
VOCABULARY_PRESENT
PRACTICE_PRESENT
HOMEWORK_PRESENT
HIGHLIGHT_PRESENT
QA_REPORT_PRESENT
```

## PASS condition

All required checks pass.

## FAIL condition

One or more required checks fail.

## Export condition

```text
QA_STATE == PASS
```

## Known fixed issue

V04.6 initially failed QA because the marker checks were too strict / incorrectly mapped.

V04.6.1 fixed this with robust marker detection.
