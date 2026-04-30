# WORK ZONE MODEL v1

Core formula:

```text
INTENT → ACTIVATION → WORK ZONE
```

---

## 1. What is a Work Zone?

A Work Zone is a task-focused workspace activated by system intent, state, command, or selected module.

A Work Zone is not a static page.

It contains:

- purpose;
- required inputs;
- available actions;
- state indicators;
- related files/modules;
- QA/approval rules;
- next-step guidance.

---

## 2. Activation Sources

A Work Zone may be activated by:

1. Smart System intent detection;
2. explicit command override;
3. system map node selection;
4. pipeline state;
5. warning/blocker;
6. MASTER START scenario;
7. user assistance request.

---

## 3. Initial Work Zones

| Work Zone | Purpose |
|---|---|
| Command Center | System status, active mode, next action |
| Master Start | Product/scenario selection and workflow launch |
| System Map | Live architecture navigation |
| OIS | Interaction system design and control |
| File Workspace | Editor, diff, approve/reject, package |
| Decisions / Locks | Fixed rules and non-breaking constraints |
| Products | ODIN products list and variants |
| Modules | Module registry and improvement tracking |
| Experiments | Controlled experimental development |
| Manual | Detailed editable help and usage instructions |

---

## 4. Work Zone Template

Each Work Zone must be described with this structure:

```text
NAME:
PURPOSE:
INPUTS:
STATE:
ACTIONS:
RELATED FILES:
DEPENDENCIES:
QA RULES:
OUTPUT:
NEXT STEP LOGIC:
```

---

## 5. Rule

A new Work Zone is allowed only if it solves a distinct system-level problem.

No duplicate pages. No visual-only zones.
