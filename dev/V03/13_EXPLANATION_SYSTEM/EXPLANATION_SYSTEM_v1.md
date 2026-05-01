# ODIN EXPLANATION SYSTEM v1

## Purpose
ODIN Interface must explain itself. Explanation is not decoration; it is part of OIS and Assisted Mode.

## Core Rule
Every critical screen, zone, action, and state must answer:
1. What is this?
2. Why does it exist?
3. What can I do here?
4. What is the next safe step?

## Explanation Levels

### Level 1 — Inline Help
Small `?` hints near buttons, fields, cards, and tree items.

### Level 2 — Zone Explanation
When a Work Zone opens, ODIN shows a contextual explanation for that zone.

### Level 3 — Assisted Mode
ODIN actively guides the user when the relation between modules, states, or next steps is unclear.

## Required Behavior
- Explanations must be available in UA and EN.
- Explanations must never block work unless the state is unsafe.
- Explanations must be short in UI but can link to detailed Manual sections.
- Explanations must be tied to real system concepts, not generic text.

## Forbidden
- Hidden logic.
- Unexplained system states.
- UI elements without purpose.
- Help text that does not match the actual behavior.
