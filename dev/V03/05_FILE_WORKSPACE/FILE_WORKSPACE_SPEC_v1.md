# FILE WORKSPACE SPEC v1

Purpose: Controlled work with files inside ODIN Interface.

---

## 1. Core Idea

File Workspace is a Git-like internal environment for safe file work.

It must support:

- editor;
- changes list;
- diff;
- approve/reject;
- history;
- package preparation;
- QA before export.

---

## 2. Rule

```text
No blind change.
```

Every meaningful file modification must be visible, reviewable, and approvable.

---

## 3. File State Model

```text
NEW
DRAFT
CHANGED
REVIEW_REQUIRED
APPROVED
REJECTED
PACKAGED
LOCKED
```

---

## 4. Required Panels

### Editor
For controlled content work.

### Changes
Shows changed files and status.

### Diff
Shows what changed.

### Approval
Approve or reject changes.

### History
Tracks decisions and file evolution.

### Package
Prepares export package.

---

## 5. Integration With QA

Before package/export:

- check required files;
- check README presence;
- check no forbidden overwrite;
- check template conflicts;
- check state consistency.
