# PRODUCT REGISTRY v1

## Purpose

The ODIN Interface must have a registry of products and projects.

## Initial Registry

```text
1. ODIN Core
   type: system
   status: active

2. Deutsch Trainer (DT)
   type: product
   status: active
   systems:
   - ІССУ
   - ССУДТ

3. New Project 1
   type: project placeholder
   status: planned

4. New Project 2
   type: project placeholder
   status: planned

5. New Project 3
   type: project placeholder
   status: planned
```

## Product Entry Schema

```text
product_id:
name:
type:
status:
description:
root_path:
modules:
workflows:
qa_profile:
export_profile:
documentation:
```

## Rule

MASTER START must use this registry to select the correct start scenario.

```text
MASTER START → Select Product/Project → Select Scenario → Preview Workflow → Execute
```
