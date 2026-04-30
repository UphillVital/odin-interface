# ODIN V03 — WORK ZONE SYSTEM v1

## Status
Draft / Architecture Lock Candidate

## Purpose
The Work Zone System defines how ODIN Interface V03 behaves as a working environment, not as a classic page-based UI.

Core principle:

```text
INTENT → ACTIVATION → WORK ZONE
```

ODIN does not simply open pages. ODIN activates the correct working context based on user intent, command override, system mode, and current state.

---

## 1. Definition

A **Work Zone** is a focused operational area inside ODIN Interface where a specific class of work happens.

Each Work Zone must define:

1. purpose
2. activation triggers
3. visible data
4. available actions
5. state response
6. related modules
7. output/result

---

## 2. Global Layout Relation

Work Zones live inside the Main Work Area.

```text
HEADER
├─ MASTER START
├─ Mode / State / Product context
└─ Primary system actions

LEFT TREE / SYSTEM MAP
├─ navigation
├─ module hierarchy
└─ manual/help access

MAIN WORK AREA
└─ active Work Zone

RIGHT CONTEXT PANEL
├─ guidance
├─ dependencies
├─ warnings
└─ next step

BOTTOM STATUS / PIPELINE BAR
├─ execution state
├─ QA state
├─ export state
└─ logs
```

---

## 3. Work Zone Types

### 3.1 Command Center Zone
Main control zone.

Use for:
- current system status
- active mode
- active product
- next recommended step
- quick access to MASTER START

Typical triggers:
- `ODIN`
- `CONTINUE`
- no clear task but system context needed
- user asks “where are we?”

Actions:
- open MASTER START
- inspect system status
- continue last workflow
- go to System Map

---

### 3.2 Master Start Zone
Primary launch zone for ODIN systems/products.

Use for:
- choosing a product/system variant
- generating a correct start package
- launching workflow by rules
- showing pipeline preview before execution

Typical triggers:
- button: `ODIN SYSTEM — MASTER START`
- command: `MASTER START`
- intent: “start new chat / restore / launch product / generate start package”

Required panels:
- product selector
- system variant selector
- context readiness checklist
- pipeline preview
- launch confirmation
- output/package result

---

### 3.3 System Map Zone
Live architecture navigation.

Use for:
- seeing module dependencies
- understanding system layers
- navigating by relations, not folders only
- tracing where a rule/module belongs

Typical triggers:
- user is confused about relationships
- click in system map
- command: `MAP`
- intent: architecture understanding

Required panels:
- visual hierarchy
- dependencies
- linked work zones
- affected files
- explanation block

---

### 3.4 File Workspace Zone
Git-like internal work area.

Use for:
- working with files
- editing
- viewing changes
- diff
- approving/rejecting
- preparing packages

Typical triggers:
- edit file
- inspect changes
- approve package
- build export
- “робота з файлами”

Required panels:
- file tree
- editor
- changes list
- diff viewer
- approval controls
- package output
- history

Core rule:
No change is blind. Every change must have visible context, diff, and approval state.

---

### 3.5 OIS Zone
Interaction system design and control.

Use for:
- commands
- modes
- communication rules
- state tracking
- decision flow
- lexicon

Typical triggers:
- user discusses interaction, commands, modes
- `MODE:`
- `COMMANDS`
- `OIS`

Required panels:
- interaction protocol
- command override table
- mode table
- state model
- decision rules
- lexicon links

---

### 3.6 Build Zone
Creation/build workspace.

Use for:
- building interface/module/product/lesson packages
- seeing build input and output
- tracking build steps

Typical triggers:
- `BUILD`
- generate package
- create module
- create prototype

Required panels:
- task definition
- input sources
- build plan
- build progress
- output artifacts
- QA handoff

---

### 3.7 QA Zone
Quality control workspace.

Use for:
- validating work
- checking “do not break existing”
- template conflict checks
- requirements coverage

Typical triggers:
- `QA`
- after BUILD
- before EXPORT
- warnings/errors

Required panels:
- checklist
- pass/fail/warnings
- affected areas
- required fixes
- re-test button

---

### 3.8 Fix Zone
Correction workspace.

Use for:
- resolving failed QA
- targeted system fixes
- preventing recurrence

Typical triggers:
- QA failed
- user reports bug
- system detects contradiction

Required panels:
- problem statement
- suspected cause
- affected modules
- fix options
- safe action plan
- post-fix QA

---

### 3.9 Product Zone
Product-specific workspace.

Use for:
- Deutsch Trainer
- future ODIN products
- product vision
- product status
- product-specific pipeline

Typical triggers:
- user chooses product
- product-specific action
- product vision update

Required panels:
- product overview
- modules
- active templates
- pipeline
- dependencies on ODIN Core

---

### 3.10 Manual / Assisted Zone
Learning and guidance zone.

Use for:
- user guidance
- explanation of capabilities
- “what should I do now?”
- editable manual

Typical triggers:
- user is lost
- manual clicked
- `HELP`
- assisted mode activation

Required panels:
- current context explanation
- next steps
- glossary terms
- examples
- editable manual link

---

### 3.11 Experiments Zone
Controlled experimental development.

Use for:
- testing new ideas
- prototypes
- alternative approaches
- innovation without breaking stable system

Typical triggers:
- new concept
- experimental UI
- “можливо спробуємо”
- research/design exploration

Required panels:
- experiment goal
- hypothesis
- boundaries
- risks
- result
- promote/reject decision

Rule:
Experiments never overwrite stable architecture until approved.

---

## 4. Activation Logic

### 4.1 Default Smart System
ODIN should infer the correct Work Zone from intent and state.

Examples:

```text
User: "Я заплутався що з чим повʼязано"
→ Manual / Assisted Zone + System Map Zone

User: "Зроби QA"
→ QA Zone

User: "Потрібно виправити підсвітку"
→ Fix Zone

User: "Хочу стартовий пакет"
→ Master Start Zone
```

### 4.2 Command Override
Explicit commands override inferred intent.

Examples:

```text
COMMAND: QA
→ QA Zone

MODE: DISCUSSION
→ OIS / Discussion context, no build unless explicitly requested

BUILD V03 PROTOTYPE
→ Build Zone
```

---

## 5. State Response Rules

Work Zones must respond to state.

```text
QA_FAILED → activate QA Zone or Fix Zone
EXPORT_BLOCKED → activate QA Zone with export blocker
BUILD_DONE → activate QA Zone
QA_PASSED → activate Export/Package path
USER_CONFUSED → activate Assisted Mode
EXPERIMENTAL → activate Experiments Zone
```

---

## 6. Zone Switching

There are two switching modes:

### Automatic
Triggered by intent, command, or system state.

### Manual
Triggered by:
- Left Tree
- System Map
- buttons
- manual/workspace links

Manual switching must not erase system state.

---

## 7. Relation to System Map

System Map is not only navigation. It is the spatial model of ODIN.

Each map node should be able to open:
- related Work Zone
- related files
- related decisions
- related QA
- related documentation

---

## 8. Relation to File Workspace

Every Work Zone that changes files must hand off to File Workspace for:
- file creation
- file modification
- diff
- approval
- package

No hidden file mutation.

---

## 9. Relation to Assisted Mode

Assisted Mode can overlay any Work Zone.

It should answer:
- where am I?
- what is this?
- what depends on this?
- what should I do next?
- what can break if I continue?

---

## 10. Anti-Patterns

Forbidden:
- page-only UI as the core model
- duplicate zones with unclear responsibility
- hidden changes
- actions without state
- modules without owner zone
- prototype design that ignores template conflict checks

---

## 11. Minimum Implementation Target

First prototype must support at least:

1. Command Center Zone
2. Master Start Zone
3. System Map Zone
4. File Workspace Zone
5. Manual / Assisted Zone

Other zones may start as documented placeholders.

---

## 12. Lock Candidate Statement

ODIN Interface V03 is a state-driven work environment.

Core interaction:

```text
INPUT → INTENT → MODE → STATE → ACTIVATION → WORK ZONE → ACTION → OUTPUT
```
