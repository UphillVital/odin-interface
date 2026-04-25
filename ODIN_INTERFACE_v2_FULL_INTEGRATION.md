# ODIN_INTERFACE_v2_FULL_INTEGRATION

Created: 2026-04-25T01:03:31

## Purpose

Single ODIN control-center integrating:

- ODIN v68.1 PRO Stable Integrated Autonomous Loop
- DT Core Architecture
- Plan Engine
- Core Link Model
- Lesson Factory / ССУДТ
- ISSU support
- Lesson Viewer Safe Mode
- DT Platform v0.8 Export / Sync
- DT Language System v1
- ODIN Sync Model

## Core roles

```text
DT = plans
SSUDT = creates base lessons
ISSU = supports/adapts
Platform = executes learning
ODIN = controls / validates / coordinates
```

## Autonomous loop

```text
detect context
→ validate against locks
→ select next action
→ execute or hold
→ QA
→ changelog
→ snapshot if stable
```

## Hard locks

- DT plans; SSUDT creates; ISSU supports; Platform executes; ODIN controls.
- PLAN is source of truth.
- Platform does not decide what to learn.
- ISSU is not main course generator.
- Lesson design must not be merged into platform design.
- ISSU/V3 lesson header and internal UX must not be removed.
- Resume is UX state, not learning control.
- Progress is tracked by lesson + topic + course.
- Language switching affects presentation layer, not plan/progress logic.
- GitHub is source of truth for ODIN interface files.
- No meaningful update without changelog.

## Next

1. Upload `odin_interface_v2_full_integration.html` to GitHub as `index.html`.
2. Commit: `ODIN v2 full integration`.
3. Review online.
4. Fix: `ODIN_INTERFACE_v2 STABLE`.
