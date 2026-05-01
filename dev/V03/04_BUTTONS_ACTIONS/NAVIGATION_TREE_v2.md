# NAVIGATION TREE v2

## Purpose

The left navigation tree must help the user understand the system, not only open files.

## Tree Model

```text
ODIN Interface V03
├─ Command Center
│  ├─ Current State
│  ├─ Active Mode
│  └─ Next Action
├─ System Map
│  ├─ Structure
│  ├─ Dependencies
│  └─ Sync Status
├─ OIS
│  ├─ Intent Parser
│  ├─ Modes
│  ├─ State Engine
│  ├─ Decision Engine
│  └─ Command Override
├─ Work Zones
│  ├─ Command Zone
│  ├─ System Map Zone
│  ├─ File Workspace Zone
│  ├─ Manual Zone
│  ├─ Product Zone
│  └─ Experiment Zone
├─ File Workspace
│  ├─ Editor
│  ├─ Changes
│  ├─ Diff
│  ├─ Approve / Reject
│  ├─ History
│  └─ Package
├─ Products
│  ├─ Deutsch Trainer
│  └─ Future ODIN Products
├─ Design System
│  ├─ DNA
│  ├─ Themes
│  ├─ UI Layers
│  └─ Components
├─ Experiments
│  ├─ Safe Lab
│  ├─ Prototype Tests
│  └─ Module Improvement
└─ Manual / Help
   ├─ ODIN Capabilities
   ├─ How to Use
   ├─ Lexicon
   └─ System Guidance
```

## Activation Rules

The tree may open a Work Zone manually, but the system should also activate Work Zones automatically through OIS.

```text
Manual selection = allowed
OIS activation = preferred
Command override = highest priority
```

## User Guidance Requirement

If the user enters a module where dependencies are unclear, ODIN must show:

- what this module is
- what it depends on
- what can be done here
- next safe action

## Lock

The tree must never become a random folder browser.
