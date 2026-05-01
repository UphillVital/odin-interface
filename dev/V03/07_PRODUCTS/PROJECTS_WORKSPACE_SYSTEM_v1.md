# PROJECTS WORKSPACE SYSTEM v1

## Purpose

The ODIN Interface must support multiple products/projects as first-class workspaces.

ODIN is the core system. Products and projects live inside ODIN as controlled work areas.

## Core Model

```text
ODIN INTERFACE
└─ PROJECTS
   ├─ Deutsch Trainer (DT)
   │  ├─ ІССУ
   │  ├─ ССУДТ
   │  ├─ Lessons
   │  ├─ Templates
   │  ├─ QA
   │  └─ Packages
   │
   ├─ New Project 1
   ├─ New Project 2
   └─ New Project 3
```

## Rule

A project is not just a folder. A project is a controlled ODIN workspace with:

- identity
- files
- modules
- workflows
- QA rules
- exports
- documentation
- state

## Product vs Project

### Product
A product is a mature or planned ODIN output, such as Deutsch Trainer.

### Project
A project is any controlled workspace under ODIN. It can become a product later.

## Required Project Fields

Each project must have:

- project_id
- name
- type
- status
- owner/system layer
- related modules
- file locations
- allowed workflows
- QA profile
- export rules

## Required UI Areas

Each project should open into a dedicated workspace:

1. Project Overview
2. Project Map
3. Modules
4. Files
5. Workflows
6. QA
7. Exports
8. Documentation
9. Decisions / Locks

## DT Special Structure

Deutsch Trainer is a product workspace and must include two lesson-generation systems:

- ІССУ — individualized lesson system
- ССУДТ — systematic/rule-based lesson system

Both must use the approved lesson template layer and must not create separate incompatible templates.

## Rule

Project selection must happen before deep file work.

```text
Select Project → Select Area → Activate Work Zone → Work with Files / Workflow / QA
```
