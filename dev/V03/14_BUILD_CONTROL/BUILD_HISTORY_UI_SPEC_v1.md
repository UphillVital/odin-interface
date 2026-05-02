# Build History UI Spec v1

## Window Name
Build Control

## Purpose
A UI zone where the user can see all important ODIN build states.

## Required UI Blocks

### 1. Current Build
Shows current active state.

### 2. Snapshot List
Shows build cards:
- version;
- title;
- status;
- short description.

### 3. Snapshot Details
Shows:
- what was before;
- what changed;
- what improved;
- QA state;
- restore note.

### 4. Actions
- View
- Mark stable
- Compare
- Restore candidate

## UX Rule
The user must understand what will be restored before pressing restore.
