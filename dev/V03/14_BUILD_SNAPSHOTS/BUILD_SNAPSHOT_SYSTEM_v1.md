# BUILD SNAPSHOT SYSTEM v1

## Goal
ODIN must allow clear fixation points and easy return to any stable build.

## Snapshot must include
- build ID / version
- date
- short description
- what existed before
- what improved
- changed files
- QA state
- rollback note

## Required UI concept
A future Build Viewer must show:
- list of saved builds
- current active build
- difference between builds
- restore candidate
- description of improvements

## Rule
Every important build must be understandable without remembering chat history.
