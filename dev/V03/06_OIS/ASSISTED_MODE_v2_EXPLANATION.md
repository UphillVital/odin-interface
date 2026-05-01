# ASSISTED MODE v2 — Explanation Behavior

## Purpose
Assisted Mode must guide the user through system work without taking control away.

## Triggers
- User opens a new Work Zone.
- User selects a project.
- User opens System Map.
- User tries to use File Workspace without selected project.
- State becomes blocked, failed, or unclear.

## Output Format
Assisted Mode should show:
- where you are
- what this area means
- what is connected
- next safe action

## Example
If user opens File Workspace without selected project:
UA: Спочатку обери продукт або проєкт. File Workspace працює тільки в контексті вибраного проєкту.
EN: Select a product or project first. File Workspace only works in a selected project context.
