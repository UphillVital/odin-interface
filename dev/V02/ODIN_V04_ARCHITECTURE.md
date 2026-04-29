# ODIN V04 — ARCHITECTURE

## Core separation

```text
dev/V02/
  = ODIN-ADMIN interface, logic, runtime

ODIN_TREE_PROJECT_v1/
  = knowledge base, standards, locks, templates
```

## Functional layers

```text
TREE
  ↓
SESSION
  ↓
SMART ROUTER
  ↓
LESSON TYPES ENGINE
  ↓
SEMANTIC GENERATION
  ↓
LIVE PREVIEW
  ↓
QA GATE
  ↓
STORAGE
  ↓
EXPORT PACKAGE
```

## Main runtime files

```text
index.html
v046_engine.js
```

After QA fix, `v046_engine.js` is the active logic file for the stable V04 checkpoint.

## Knowledge standards used by the product

```text
TEMPLATE_BASE_v1.html
TEMPLATE_RULES.md
TRANSLATION_LOCK.md
RN_DP_SD_STANDARD.md
HIGHLIGHT_SYSTEM_OVERVIEW.md
QA_SYSTEM_OVERVIEW.md
LESSON_STRUCTURE.md
```

## Product structure

```text
Left panel:
  ODIN TREE

Center:
  Control Panel
  Lesson Request
  Live Preview
  Generated HTML
  QA / Export Report

Right panel:
  Lesson Library
  Session
  File Viewer
```
