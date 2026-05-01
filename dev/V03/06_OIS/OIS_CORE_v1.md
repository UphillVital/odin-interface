# ODIN V03 — OIS CORE v1

## Purpose
OIS Core is the interaction brain of ODIN Interface V03.

It converts user input into controlled system behavior:

```text
INPUT → INTENT → MODE → STATE → ACTION → OUTPUT
```

## Core Decision

```text
DEFAULT = Smart System
OVERRIDE = Commands
```

Meaning:
- ODIN normally interprets intent and guides the workflow automatically.
- Explicit commands always override automatic interpretation.

## Scope
OIS Core controls commands, modes, communication, state tracking, decision flow, assisted guidance, MASTER START scenario launch, and safe execution rules.

## Non-Scope
OIS Core does not directly replace lesson templates, Deutsch Trainer product UI, Git itself, or final build/export implementation. It coordinates them.

## Required Principle
No fake logic. If a workflow is not connected to real action, it must be marked as `DESIGNED`, `MOCK`, `NOT_CONNECTED`, or `BLOCKED`.
