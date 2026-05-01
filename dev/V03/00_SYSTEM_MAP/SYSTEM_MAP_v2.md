# ODIN SYSTEM MAP v2

## Status

Version: V03 System Sync  
Scope: ODIN Interface V03  
Purpose: keep architecture, navigation, work zones, OIS and prototype structure synchronized.

## Core Principle

The System Map is not a decorative diagram.  
It is the navigation and control model for ODIN.

## Current V03 Layers

```text
ODIN V03
├─ 00_SYSTEM_MAP
│  └─ system structure, dependency map, sync status
├─ 01_INTERFACE_ARCHITECTURE
│  └─ template architecture, layout, zones, rules
├─ 02_NAVIGATION_TREE
│  └─ left tree logic, system map as navigation
├─ 03_WINDOWS
│  └─ window/screen models
├─ 04_BUTTONS_ACTIONS
│  └─ button/action registry, MASTER START logic
├─ 05_FILE_WORKSPACE
│  └─ editor, changes, diff, approve/reject, history, package
├─ 06_OIS
│  └─ INPUT → INTENT → MODE → STATE → ACTION/OUTPUT
├─ 07_PRODUCTS
│  └─ ODIN products, DT, future products
├─ 08_EXPERIMENTS
│  └─ controlled experimental development
├─ 09_MANUAL
│  └─ help, capabilities, user guidance
├─ 10_DESIGN_SYSTEM
│  └─ ODIN DNA, themes, UI layers, component rules
└─ 11_PROTOTYPE_SYSTEM_UI
   └─ first system UI prototype
```

## Active Architecture Formula

```text
INPUT → INTENT → ACTIVATION → WORK ZONE → STATE → ACTION → OUTPUT
```

## Navigation Principle

```text
CLASSIC UI: Sidebar → Click → Page
ODIN UI:    Intent → Activation → Work Zone
```

## Main Control Zones

| Zone | Purpose | Depends on |
|---|---|---|
| Command Center | system status, mode, current action | OIS, State |
| System Map | live system navigation | Architecture, Tree |
| File Workspace | controlled work with files | Diff, Approval, Package |
| OIS Zone | interaction logic and rules | Modes, Commands, State |
| Product Zone | product-level management | Product Registry |
| Manual Zone | guidance and capabilities | Lexicon, Help |
| Experiments Zone | safe prototype/testing area | QA, Restrictions |

## Mandatory Sync Rule

After each package or system change, update:

1. System Map
2. Interface Architecture
3. Navigation Tree
4. File Registry / affected module list
5. Changelog
6. Package Integration Notes

## Lock

A package is incomplete if it changes structure but does not update the map.
