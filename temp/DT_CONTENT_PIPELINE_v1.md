# DT_CONTENT_PIPELINE_v1

Created: 2026-04-25T02:00:21

## Purpose

`DT_CONTENT_PIPELINE_v1` defines how Deutsch Trainer produces lessons from a learning plan.

## Core flow

```text
DT_PLAN_ENGINE
→ TOPIC
→ SSUDT lessons
→ optional ISSU support
→ QA
→ CONTENT INDEX
→ PLATFORM
→ PROGRESS
```

## Lesson types

| Type | Source | Role |
|---|---|---|
| base | SSUDT | Main explanation lesson |
| practice | SSUDT | Drills and exercises |
| review | SSUDT | Review / repetition |
| support | ISSU | Photo/homework/weak-topic support |

## Topic model

```json
{
  "topic_id": "de_a1_denn_001",
  "title": "denn",
  "level": "A1/A2",
  "source_order": "Schritte Plus Neu",
  "lessons": [
    {
      "lesson_id": "lesson_de_a1_denn_base_001",
      "type": "base",
      "source": "SSUDT",
      "status": "planned"
    },
    {
      "lesson_id": "lesson_de_a1_denn_practice_001",
      "type": "practice",
      "source": "SSUDT",
      "status": "planned"
    },
    {
      "lesson_id": "lesson_de_a1_denn_review_001",
      "type": "review",
      "source": "SSUDT",
      "status": "planned"
    },
    {
      "lesson_id": "lesson_de_a1_denn_support_001",
      "type": "support",
      "source": "ISSU",
      "status": "optional"
    }
  ]
}
```

## Mandatory QA

- Every German sentence has DP + SD
- Full highlight system available
- Dictionary included
- Practice included
- Voice/audio block included where relevant
- Homework or mini-review included
- Lesson manifest embedded
- Lesson linked to topic_id
- Lesson source defined: SSUDT or ISSU
- No platform/lesson CSS mixing

## Hard locks

- PLAN is source of truth.
- SSUDT does not change plan.
- ISSU does not replace base course lessons.
- Platform does not generate lessons.
- Every lesson must bind to topic_id.
- Support lessons must record reason: photo/homework/weak_topic.
- Lesson Viewer must preserve ISSU/ISH/V3 lesson design.
- No lesson enters Content Index without QA PASS.
- Every major pipeline change requires changelog.

## Outputs

- lesson_html
- lesson_manifest_json
- content_index_entry
- qa_report
- zip_package

## Next

```text
DT_CONTENT_PIPELINE_v1_REVIEW_AND_ODIN_INTEGRATION
```
