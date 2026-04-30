# ODIN V03.8.6 — SAFE PUSH PERSISTENT STATE FIX

## Fix

Safe Push previously stored confirmations only in page memory:

- snapshot_saved
- risk_accepted

Push Package could not reliably see them after rebuild/reload.

V03.8.6 stores them in:

```text
ODIN_STATE.data.git.safe_push_flags
```

## Expected

After:

```text
CONFIRM SNAPSHOT SAVED
ACCEPT RISK
RUN SAFE PUSH CHECK
```

Safe Push stays:

```text
READY_FOR_MANUAL_PUSH
```

and Push Package can read it.

## Git

git add dev/V02/ ODIN_TREE_PROJECT_v1/
git commit -m "Fix V03.8.6 safe push persistent state"
git push origin dev
