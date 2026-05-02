# LAYOUT BEHAVIOR STANDARD v1

## Lock

ODIN Interface uses a fixed header and three independent working columns.

## Columns

1. Left Tree — navigation and system map entry.
2. Work Zone — central active work area.
3. Assisted Mode — contextual explanation and next-step guidance.

Each column must have its own scroll behavior. Body-level scrolling should not be the default desktop behavior.

## Central Work Zone Rule

The central Work Zone may contain explanatory intro blocks, but operational controls must remain reachable during deep scrolling.

For File Workspace, the action toolbar and workflow indicator are sticky inside the central column.

## Prohibited

- Header disappearing during normal work.
- One column forcing all other columns to scroll.
- Action buttons becoming unreachable in long content.
- Replacing the contextual help model with global blocking modals.
