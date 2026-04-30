# ASSISTED MODE SPEC v1

Purpose: Help the user understand ODIN without losing system-level control.

---

## 1. When Assisted Mode Activates

Assisted Mode may activate when:

- the user is lost;
- relationships between modules are unclear;
- a selected node has many dependencies;
- a workflow is blocked;
- the next step is not obvious;
- a risky action is detected.

---

## 2. What ODIN Must Provide

ODIN should show:

- what this area means;
- why it matters;
- what it connects to;
- what can be done now;
- recommended next step;
- warnings if action may break existing work.

---

## 3. Tone

Assisted Mode must be calm, clear, and practical.

No noise. No fake confidence. No hidden assumptions.

---

## 4. Example

User opens OIS node.

ODIN explains:

```text
OIS controls how ODIN understands commands, modes, state, and actions.
It affects MASTER START, pipeline behavior, and file workspace decisions.
Recommended next step: review INTERACTION_SYSTEM before editing commands.
```
