# SYSTEM MAP PROJECTS UPDATE v1

## Update Purpose

The System Map must include a Projects layer.

## Updated High-Level Map

```text
ODIN CORE
├─ OIS
├─ Work Zones
├─ File Workspace
├─ QA / Core Lock
├─ System Map
├─ Projects Layer
│  ├─ Deutsch Trainer
│  │  ├─ ІССУ
│  │  └─ ССУДТ
│  ├─ New Project 1
│  ├─ New Project 2
│  └─ New Project 3
└─ Manual / Help
```

## Rule

System Map is navigation. Clicking a project node must activate the correct project Work Zone.

## Dependency Rule

Projects depend on ODIN Core, but ODIN Core must not depend on any single project.

```text
ODIN Core → supports projects
Project → uses ODIN Core
```
