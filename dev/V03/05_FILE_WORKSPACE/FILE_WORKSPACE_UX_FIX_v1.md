# FILE WORKSPACE UX FIX v1

## Fixed issue
The Editor panel could expand vertically while Original remained visually small.

## Rule
Comparison blocks must behave as paired panels:
- Editor and Original must stay visually aligned.
- Original is read-only.
- Editor typing must not trigger full workspace re-render.

## Reason
File comparison must feel stable and predictable. A diff workspace must not jump, collapse, or lose focus while typing.
