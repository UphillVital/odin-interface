# ODIN V03 CHANGE CONTROL v1

## Purpose
Every change must be understandable, reversible, and connected to system architecture.

## Change Flow

```text
REQUEST → IMPACT CHECK → IMPLEMENT → QA → SYNC → LOCK
```

## Change Types

### SAFE ADD
Adds new files or non-breaking functionality.

### CONTROLLED UPDATE
Updates existing files while preserving baseline behavior.

### MIGRATION
Changes structure or behavior intentionally. Requires explicit approval.

### BLOCKED
Any change that removes stable behavior without approval.

## Package Rule
After Foundation packages, every package must contain only meaningful files.
No empty folders. No duplicated tree for decoration.

## Required Package Notes
- What changed
- Why it changed
- What must still work
- How to test
