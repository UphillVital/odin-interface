# ODIN V04 — EXPORT SPEC

## Export System Pro

When `EXPORT PACKAGE` is pressed after QA passes, the product exports:

```text
<lesson>_lesson.html
<lesson>_lesson.json
<lesson>_qa_report.json
<lesson>_meta.json
<lesson>_README.md
```

## Files

### lesson.html

Final user-facing lesson page.

### lesson.json

Machine-readable lesson package:

```json
{
  "meta": {},
  "html": "..."
}
```

### qa_report.json

QA result and report.

### meta.json

Metadata:

```json
{
  "title": "...",
  "type": "...",
  "mode": "...",
  "level": "...",
  "version": "V04.6.1_QA_FIX"
}
```

### README.md

Human-readable instruction for opening the exported lesson.

## Current limitation

Browser-only export downloads files separately.
ZIP export is a future layer.

Recommended future version:

```text
V05 / V04.8 ZIP EXPORT
```
