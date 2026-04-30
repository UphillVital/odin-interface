# ODIN V03 — Work Zone Activation Rules v1

## Purpose
Defines how ODIN activates the correct Work Zone from user input, commands, modes, and system state.

---

## Priority Order

1. Safety / conflict blocker
2. Explicit command override
3. Active mode
4. Current system state
5. Inferred user intent
6. Default Command Center

---

## Rule 1 — Safety First

If action can break stable system:

```text
activate QA Zone or File Workspace Zone
show blocker
require approval
```

---

## Rule 2 — Explicit Command Override

Examples:

```text
BUILD → Build Zone
QA → QA Zone
FIX → Fix Zone
EXPORT → File Workspace / Package path
MASTER START → Master Start Zone
MAP → System Map Zone
HELP → Manual / Assisted Zone
```

---

## Rule 3 — Mode Controls Behavior

```text
MODE: DISCUSSION
→ no code generation unless explicitly requested
→ activate OIS / Command Center / System Map depending on topic

MODE: BUILD
→ Build Zone

MODE: QA
→ QA Zone

MODE: EXPERIMENT
→ Experiments Zone
```

---

## Rule 4 — State Can Force Zone

```text
QA_FAILED → Fix Zone
QA_PASSED_WITH_WARNINGS → QA Zone
EXPORT_BLOCKED → QA Zone
BUILD_READY → Build Zone
USER_CONFUSED → Manual / Assisted Zone
```

---

## Rule 5 — Intent Mapping

| User Intent | Zone |
|---|---|
| “де ми?” | Command Center |
| “що з чим повʼязано?” | System Map + Assisted |
| “зроби пакет” | Build / File Workspace |
| “перевір” | QA |
| “виправ” | Fix |
| “поясни можливості” | Manual / Assisted |
| “нова ідея” | Experiments |
| “створити старт” | Master Start |

---

## Rule 6 — Default Fallback

If uncertain:

```text
Command Center + Assisted Mode
```

The interface should show:
- interpreted intent
- suggested zone
- alternative actions
