# PACKAGE 12 — PROJECTS WORKSPACE SYSTEM

## Purpose

This package adds the project/product organization layer for ODIN Interface V03.

## Why this package exists

Before building a real File Workspace, ODIN must know which project/product the user is working inside.

## Added Concept

```text
Select Project → Activate Project Workspace → Work with Files / Workflows / QA / Packages
```

## Included Files

- `00_SYSTEM_MAP/SYSTEM_MAP_PROJECTS_UPDATE_v1.md`
- `02_NAVIGATION_TREE/NAVIGATION_TREE_PROJECTS_v1.md`
- `03_WINDOWS/PROJECT_WINDOWS_v1.md`
- `04_BUTTONS_ACTIONS/PROJECT_ACTIONS_v1.md`
- `07_PRODUCTS/PROJECTS_WORKSPACE_SYSTEM_v1.md`
- `07_PRODUCTS/PRODUCT_REGISTRY_v1.md`
- `12_PROJECTS_WORKSPACE/README.md`
- `12_PROJECTS_WORKSPACE/CHANGELOG.md`

## Integration Rule

This package does not replace the existing prototype. It adds the project organization layer.

## Test Focus

After integration, verify that the concept is clear:

- ODIN has projects
- DT is a product project
- DT contains ІССУ and ССУДТ
- New projects can be represented without chaos
- File Workspace must be scoped by selected project
