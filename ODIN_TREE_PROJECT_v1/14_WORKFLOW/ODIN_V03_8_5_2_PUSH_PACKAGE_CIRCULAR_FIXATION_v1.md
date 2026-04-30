# ODIN V03.8.5.2 PUSH PACKAGE CIRCULAR FIXATION v1

[BUG]
V03.8.5.1 produced circular JSON warning:
Converting circular structure to JSON.

[BUG]
auto_push_allowed=false was shown as failed final check.

[FIXED]
Snapshot is cloned without git.push_package.

[FIXED]
State saves compact push_package summary.

[FIXED]
Final check uses auto_push_disabled=true as pass.

[RULE]
Push package export must never save itself recursively into full snapshot.
