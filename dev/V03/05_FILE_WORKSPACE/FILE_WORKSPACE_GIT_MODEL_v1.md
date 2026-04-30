# ODIN V03 — File Workspace Git-like Model v1

## Purpose
The File Workspace is the controlled area for working with files.

It must support:

```text
Editor → Changes → Diff → Approve/Reject → History → Package
```

---

## Core Areas

### 1. File Tree
Shows folders and files relevant to current Work Zone.

### 2. Editor
Allows file work when editing is enabled.

### 3. Changes
Lists created/modified/deleted files.

### 4. Diff
Shows before/after changes.

### 5. Approval
User/system approval state.

### 6. History
Records decisions and package versions.

### 7. Package
Prepares output package.

---

## Required Statuses

```text
NO_CHANGES
DRAFT
DIFF_READY
APPROVAL_REQUIRED
APPROVED
REJECTED
PACKAGED
```

---

## Safety Rule

No system-level change is final until:
1. change is visible
2. diff is available
3. QA requirements are checked
4. approval state is clear

---

## Package Rule

Every package should include README.md explaining:
- where files go
- what changed
- how to test
- push commands if needed
