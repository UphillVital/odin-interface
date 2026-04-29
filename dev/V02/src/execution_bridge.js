/* ODIN V05.2 PRO — EXECUTION BRIDGE */

function runExecution(actionType, payload) {
    switch (actionType) {
        case "GENERATE_LESSON":
            return runLessonPipeline(payload);
        default:
            throw new Error("UNKNOWN_ACTION: " + actionType);
    }
}
