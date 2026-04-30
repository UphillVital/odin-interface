# ODIN TEMPLATE ARCHITECTURE v1

Status: V03 architectural foundation  
Scope: ODIN Interface / Control Workspace  
Rule: No HTML prototype before architecture, zones, states, and template constraints are clear.

---

## 1. Core Idea

ODIN Interface is not a classic page-based UI.

Classic UI:

```text
Sidebar → Click → Page
```

ODIN UI:

```text
INTENT → ACTIVATION → WORK ZONE
```

The interface must behave as a working system control environment, not as a static set of pages.

---

## 2. Definition

ODIN Interface = personal control workspace for ODIN.

It must help the user:

- understand the system hierarchy;
- see what is connected to what;
- choose the correct work zone;
- avoid losing decisions;
- control files, changes, approvals, and packages;
- launch structured workflows;
- receive guidance when the relationship between modules is unclear.

---

## 3. Global Layout

Target layout:

```text
┌──────────────────────────────────────────────────────────────┐
│ HEADER / SYSTEM COMMAND BAR                                  │
├───────────────┬───────────────────────────────┬──────────────┤
│ LEFT TREE     │ MAIN WORK ZONE                │ CONTEXT PANEL│
│ System Map    │ Intent-driven workspace       │ Help / State │
│ Navigation    │                               │ Links / QA   │
├───────────────┴───────────────────────────────┴──────────────┤
│ STATUS / PIPELINE / LOG / CURRENT STATE                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 4. Primary Zones

### 4.1 Header / System Command Bar

Purpose:

- system identity;
- active mode;
- active product;
- current state;
- primary system actions.

Mandatory element:

```text
ODIN SYSTEM — MASTER START
```

This is the primary system action, not a decorative button.

Required behavior:

- opens product/system selector;
- generates the correct MASTER START package by rules;
- previews workflow;
- launches selected scenario;
- reports progress and final state.

---

### 4.2 Left Tree / System Map Navigation

The left column is not only a folder tree.

It must combine:

- system map;
- hierarchy;
- product list;
- modules;
- work zones;
- manual/help access.

Rule:

```text
SYSTEM MAP AS NAVIGATION
```

The tree must show relationships and dependencies where possible.

---

### 4.3 Main Work Zone

The main area changes by:

- intent;
- mode;
- selected node;
- current state;
- command override.

Examples:

| Input | Activated Work Zone |
|---|---|
| MASTER START | Product selector + scenario preview + launch controls |
| Work with files | Editor + diff + approval + package |
| Build OIS | OIS architecture workspace |
| User is lost | Assisted Mode guidance workspace |

---

### 4.4 Context Panel

Purpose:

- explain selected module;
- show dependencies;
- show warnings;
- show next step;
- show related documents;
- show QA/lock status.

This panel supports the user without interrupting the workflow.

---

### 4.5 Bottom Status / Pipeline Area

Purpose:

- current pipeline status;
- logs;
- QA state;
- export/package state;
- warnings;
- blocked actions.

Required principle:

```text
No hidden state.
```

---

## 5. UI Layers

The template must separate UI layers:

```text
Level 1 — System UI: ODIN Interface
Level 2 — Product UI: Deutsch Trainer
Level 3 — Lesson UI: ІШ / ІССУ / ССУДТ lessons
```

Rule:

```text
Lesson UI ≠ System UI
```

Lesson template CSS/design may provide DNA, visual direction, and component inspiration, but must not be copied blindly into the ODIN Interface.

---

## 6. Template DNA Source

The current lesson template may be used as a style DNA source because it already has qualities ODIN needs:

- lightness;
- refinement;
- calmness;
- confidence;
- readable structure;
- flexible blocks;
- strong header idea.

But it must be transformed into a system interface architecture.

---

## 7. Forbidden Mistakes

Do not:

- treat ODIN Interface as a simple lesson page;
- copy the lesson layout without adapting it;
- create parallel UI standards;
- create hidden logic;
- create buttons that only simulate actions;
- bypass file approval/diff when changing files;
- add new modules without registration;
- break V02 stable base.

---

## 8. Mandatory Template Capabilities

The ODIN Interface template must support:

- intent-driven work zones;
- live system map navigation;
- file workspace;
- assisted mode;
- product selector;
- MASTER START action;
- decisions/locks registry;
- module improvement tracking;
- experiments zone;
- editable manual/help area;
- dark and light themes.

---

## 9. Theme Requirement

All ODIN products must support at minimum:

```text
1. Dark Theme
2. Light Theme
```

Dark may be default for system work. Light must also be supported.

---

## 10. Next Required Documents

This architecture depends on:

- WORK_ZONE_MODEL_v1.md
- SYSTEM_MAP_NAVIGATION_v1.md
- FILE_WORKSPACE_SPEC_v1.md
- ASSISTED_MODE_SPEC_v1.md
- ODIN_DESIGN_DNA_v1.md
- ODIN_LEXICON_v1.md
- TEMPLATE_CONFLICT_QA_v1.md

