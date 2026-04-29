/* ODIN V05.2 PRO — REAL LESSON BUILDER
   Призначення: генерує реальний навчальний HTML-урок у базовій структурі DT / ІШ.
   Безпечний шар: не змінює V04.7, працює через V05 pipeline.
*/

function escapeHtml(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function buildLesson(data) {
    const topic = escapeHtml(data.topic || "Відокремлювані дієслова");
    const level = escapeHtml(data.level || "A1–A2");
    const goal = escapeHtml(data.goal || "Навчитися розуміти, де стоїть основна частина дієслова, а де відокремлювана частка.");
    const rule = escapeHtml(data.rule || "У німецькій мові деякі дієслова мають частку, яка у простому реченні переходить у кінець.");
    const examples = Array.isArray(data.examples) && data.examples.length ? data.examples : [
        {
            de: "Ich stehe um sieben Uhr auf.",
            literal: "Я встаю о сьомій годині вгору.",
            semantic: "Я встаю о сьомій годині."
        },
        {
            de: "Er ruft seine Mutter an.",
            literal: "Він дзвонить свою маму на.",
            semantic: "Він телефонує своїй мамі."
        },
        {
            de: "Wir kaufen heute ein.",
            literal: "Ми купуємо сьогодні всередину.",
            semantic: "Ми сьогодні робимо покупки."
        },
        {
            de: "Mach bitte das Fenster zu.",
            literal: "Роби будь ласка вікно до.",
            semantic: "Закрий, будь ласка, вікно."
        },
        {
            de: "Sie sieht sehr müde aus.",
            literal: "Вона виглядає дуже втомлена з.",
            semantic: "Вона виглядає дуже втомленою."
        }
    ];

    const exampleBlocks = examples.map((ex, index) => `
        <article class="example-card">
            <div class="example-number">${index + 1}</div>
            <div>
                <p class="de"><strong>DE:</strong> ${escapeHtml(ex.de)}</p>
                <p class="literal"><strong>ДП:</strong> ${escapeHtml(ex.literal)}</p>
                <p class="semantic"><strong>СД:</strong> ${escapeHtml(ex.semantic)}</p>
            </div>
        </article>
    `).join("");

    return `
<section class="lesson-output" id="lesson-output">
    <header class="lesson-hero">
        <div class="badge">ODIN V05.2 PRO · DT LESSON</div>
        <h1>${topic}</h1>
        <p>Рівень: ${level}</p>
    </header>

    <section class="lesson-block">
        <h2>1. Ціль уроку</h2>
        <p>${goal}</p>
    </section>

    <section class="lesson-block">
        <h2>2. Основне правило</h2>
        <p>${rule}</p>
        <div class="rule-box">
            <strong>Формула:</strong> основне дієслово → позиція 2, частка → кінець речення.
        </div>
    </section>

    <section class="lesson-block">
        <h2>3. Основні приклади уроку</h2>
        ${exampleBlocks}
    </section>

    <section class="lesson-block">
        <h2>4. Практика</h2>
        <p><strong>Завдання:</strong> переклади речення українською і знайди відокремлювану частку.</p>
        <ol class="practice-list">
            <li>Ich mache die Tür auf.</li>
            <li>Wir hören jetzt auf.</li>
            <li>Sie kommt morgen mit.</li>
        </ol>
    </section>

    <section class="lesson-block">
        <h2>5. Домашнє завдання</h2>
        <p>Створи 5 власних речень з дієсловами: aufstehen, anrufen, einkaufen, zumachen, mitkommen.</p>
    </section>
</section>`;
}
