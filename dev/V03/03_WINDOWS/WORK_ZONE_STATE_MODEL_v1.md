# ODIN V03 — Work Zone State Model v1

## Purpose
Defines the minimum state vocabulary required for Work Zones.

---

## Core State Fields

```yaml
active_product:
active_mode:
active_zone:
active_branch:
active_package:
qa_status:
build_status:
export_status:
file_change_status:
user_guidance_status:
template_conflict_status:
```

---

## Status Values

### Build
```text
NOT_STARTED
READY
RUNNING
DONE
FAILED
BLOCKED
```

### QA
```text
NOT_RUN
RUNNING
PASSED
PASSED_WITH_WARNINGS
FAILED
BLOCKED
```

### Export
```text
LOCKED
READY
RUNNING
DONE
BLOCKED
```

### File Changes
```text
NO_CHANGES
DRAFT_CHANGES
DIFF_READY
APPROVAL_REQUIRED
APPROVED
REJECTED
PACKAGED
```

### Guidance
```text
NORMAL
ASSISTED
CONFUSED
NEEDS_EXPLANATION
```

### Template Conflict
```text
NOT_CHECKED
NO_CONFLICT
WARNING
CONFLICT
BLOCKED
```

---

## State-Driven Zone Examples

```text
qa_status: FAILED
→ active_zone: Fix Zone

file_change_status: APPROVAL_REQUIRED
→ active_zone: File Workspace Zone

user_guidance_status: CONFUSED
→ overlay: Assisted Mode

template_conflict_status: CONFLICT
→ active_zone: QA Zone
```

---

## State Persistence Rule

State should be visible, structured, and storable.

No important state should live only in memory or hidden UI.
