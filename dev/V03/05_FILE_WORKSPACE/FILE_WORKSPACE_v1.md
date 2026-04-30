# FILE WORKSPACE v1

## Goal

Create a controlled area for working with project files.

## Required Functions

1. View files
2. Edit files
3. See changes
4. Compare diff
5. Approve changes
6. Reject changes
7. Mark file status
8. Prepare package
9. Protect stable versions

## File Statuses

```text
DRAFT
REVIEW
APPROVED
LOCKED
REJECTED
PACKAGE_READY
```

## Safety Rule

No file should move from draft to approved without:
- purpose
- change summary
- risk check
- decision record
