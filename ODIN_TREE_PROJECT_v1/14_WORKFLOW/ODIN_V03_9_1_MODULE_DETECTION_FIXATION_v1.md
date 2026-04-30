# ODIN V03.9.1 MODULE DETECTION FIXATION v1

[BUG]
V03.9 showed admin page false positives for runtime-only modules.

[FIXED]
Added module scopes and new detection statuses.

[IMPLEMENTED]
- ADMIN/RUNTIME/SHARED/ADMIN_RUNTIME_BRIDGE scopes
- RUNTIME_ONLY status
- NOT_REQUIRED_HERE status
- risks only for MISSING/PARTIAL required modules

[RULE]
Do not mark runtime modules as critical missing on admin page.
