/* ODIN V05.2 PRO — CONTROL INTEGRATION HOOK
   Безпечний hook. Не переписує існуючий CONTROL.
*/

window.ODIN_V05_2_PRO = {
    version: "V05.2 PRO",
    runDemoLesson: function () {
        return runExecution("GENERATE_LESSON", {
            topic: "Відокремлювані дієслова",
            level: "A1–A2",
            goal: "Навчитися будувати речення з відокремлюваними дієсловами та правильно ставити частку в кінець.",
            rule: "У простому розповідному реченні дієслово стоїть на другій позиції, а відокремлювана частка переходить у кінець речення."
        });
    }
};

console.log("ODIN V05.2 PRO підключено");
