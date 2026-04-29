
function runExecution(actionType, payload) {
    if (actionType === "GENERATE_LESSON") {
        return runLessonPipeline(payload);
    }
    throw new Error("Unknown action");
}
