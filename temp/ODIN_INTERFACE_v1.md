# ODIN_INTERFACE_v1

Created: 2026-04-24T23:09:58

## Purpose

`ODIN_INTERFACE_v1` is the internal control-center for the ODIN / Deutsch Trainer system.

It is not the student-facing platform and not the lesson UI.

## Core principle

```text
ODIN controls, validates, and coordinates.
DT plans.
SSUDT creates base lessons.
ISSU supports/adapts.
Platform executes learning.
```

## Tabs

1. Dashboard
2. Core Architecture
3. Plan Engine
4. Lesson Factory / ССУДТ
5. ISSU Support
6. Platform / Execution
7. Links / Core Model
8. Export / Sync
9. Changelog
10. QA / Risks

## Hard locks

- PLAN is source of truth
- Platform does not decide what to learn
- SSUDT creates base course lessons
- ISSU supports/adapts; it is not the main course generator
- Lesson design must not be merged into platform design
- ISSU/V3 lesson header and internal UX must not be removed
- Resume is UX state, not learning control
- Progress is lesson + topic + course
- Every support lesson must bind to topic_id
- No build without QA and changelog entry

## Next recommended steps

- Review ODIN_INTERFACE_v1
- Fix ODIN UI as internal control layer
- Build DT_LANGUAGE_SYSTEM_v1
- Update unified DT app after language model is fixed
