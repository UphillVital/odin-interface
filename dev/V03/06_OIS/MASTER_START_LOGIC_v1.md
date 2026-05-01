# ODIN SYSTEM — MASTER START LOGIC v1

## Purpose
The MASTER START button launches a controlled start workflow for selected ODIN products/systems.

## Required Flow

```text
1. Select product/system variant
2. Load product rules
3. Generate start scenario
4. Validate requirements
5. Preview pipeline
6. Start execution
7. Track state
8. QA
9. Export/package if allowed
```

## Product Selector Examples

| Product/System | Scenario |
|---|---|
| ODIN Interface | control workspace / system UI |
| Deutsch Trainer | language learning product |
| Lesson System | ІШ / ССУДТ / ІССУ lesson generation |
| Recovery Pack | restoration / survival package |
| File Workspace | work with files/diffs/packages |
| OIS | interaction/modes/commands/state |

## Safety Gates
MASTER START must check selected product exists, rules exist, target branch/folder is safe, QA requirements are known, and output type is defined.

## No Fake Execution Rule
If a product workflow is not implemented, button must show `DESIGNED_NOT_CONNECTED`, not pretend to run.
