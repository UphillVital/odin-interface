# ODIN V03 — System Map as Navigation v1

## Purpose
The System Map is not a static diagram. It is the main conceptual navigation model.

---

## Principle

```text
Tree shows hierarchy.
System Map shows relationships.
```

ODIN needs both.

---

## System Map Node Types

1. Core System
2. Interaction Layer
3. Engine
4. Pipeline
5. UI Layer
6. File Workspace
7. QA / SЯ
8. Products
9. Templates
10. Experiments
11. Documentation

---

## Each Node Must Show

- name
- level
- purpose
- dependencies
- owner Work Zone
- related files
- status
- risks/conflicts
- next actions

---

## Click Behavior

Clicking a node should open:

```text
related Work Zone + context panel + file/document links
```

Examples:

```text
Click OIS
→ OIS Zone

Click File Workspace
→ File Workspace Zone

Click DT Product
→ Product Zone

Click Design DNA
→ Design System / Manual context
```

---

## Relation to Left Tree

Left Tree is fast access.
System Map is understanding.

They must be synchronized.
