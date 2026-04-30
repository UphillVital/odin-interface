# ODIN V03 — OIS + Work Zone Integration v1

## Purpose
Connects OIS to the Work Zone System.

OIS interprets input. Work Zones provide the operational environment.

---

## Core Flow

```text
INPUT
→ INTENT
→ MODE
→ STATE
→ ACTIVATION
→ WORK ZONE
→ ACTION
→ OUTPUT
```

---

## OIS Responsibilities

OIS must decide:

1. What does the user want?
2. Is it discussion, build, fix, QA, export, or guidance?
3. Is there an explicit command?
4. What state is the system in?
5. Which Work Zone should activate?
6. What output is expected?

---

## Work Zone Responsibilities

A Work Zone must provide:

1. correct context
2. allowed actions
3. visible data
4. state-specific warnings
5. next step
6. handoff if needed

---

## Smart System + Command Override

Default:

```text
Smart System
```

Override:

```text
Explicit commands
```

Example:

```text
User: "Можливо треба перевірити"
→ intent = QA discussion
→ zone = QA Zone in preview mode

User: "QA"
→ command override
→ zone = QA Zone immediately
```

---

## Assisted Mode Integration

Assisted Mode is triggered when OIS detects:
- confusion
- ambiguous relationship
- missing context
- repeated “що далі?”
- user asks for explanation

Assisted Mode does not replace the active zone.
It overlays guidance onto it.
