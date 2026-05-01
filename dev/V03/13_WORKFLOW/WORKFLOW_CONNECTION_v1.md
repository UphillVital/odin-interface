# WORKFLOW CONNECTION v1

## Purpose
Connect Projects, System Map, File Workspace, QA suggestion, and approval flow into one guided workflow.

## Flow
Project → Workspace → Changes → Review → Approved

## Rules
- File Workspace works in the context of an active project.
- Editing a file sets workflow state to Changed.
- Sending to review sets workflow state to Review.
- Approve sets workflow state to Approved.
- Reject restores draft and returns workflow state to Editing.

## No-break guarantees
- Does not change ODIN 13.2 visual style.
- Does not remove UA/EN/DE i18n.
- Does not remove Quick Settings.
- Does not remove contextual help.
