/* ODIN V05.2 PRO — PIPELINE */

function runLessonPipeline(input) {
    const payload = normalizeLessonInput(input);
    const lessonHtml = buildLesson(payload);
    const qa = runLessonQA(lessonHtml);

    return {
        status: qa.pass ? "QA_PASSED" : "QA_FAILED",
        qa,
        html: lessonHtml
    };
}

function normalizeLessonInput(input) {
    return {
        topic: input?.topic || "Відокремлювані дієслова",
        level: input?.level || "A1–A2",
        goal: input?.goal || "",
        rule: input?.rule || "",
        examples: input?.examples || []
    };
}

function runLessonQA(html) {
    const required = [
        "Ціль уроку",
        "Основне правило",
        "Основні приклади уроку",
        "Практика",
        "Домашнє завдання",
        "ДП:",
        "СД:"
    ];

    const missing = required.filter(item => !html.includes(item));

    return {
        pass: missing.length === 0,
        missing,
        checked: required
    };
}
