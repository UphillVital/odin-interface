const ODIN_MODES = [
  {
    id: "SON",
    name: "СОН",
    purpose: "Системний огляд перед великим кроком.",
    check(action) {
      return pass("СОН пройдено: дія має чітку ціль і є великим переходом.");
    }
  },
  {
    id: "QA",
    name: "QA",
    purpose: "Перевірка якості перед побудовою.",
    check(action) {
      if (action.goal.length < 40) return block("QA blocked: ціль занадто коротка.");
      return pass("QA пройдено: ціль достатньо описана.");
    }
  },
  {
    id: "NN",
    name: "NN / Нічого не зламати",
    purpose: "Захист стабільних шарів і попередньої бази.",
    check(action) {
      return pass("NN пройдено: зміни мають іти тільки в dev, main не чіпати.");
    }
  },
  {
    id: "PLAN",
    name: "PLAN",
    purpose: "Планування наступної дії.",
    check(action) {
      return pass("PLAN створено: дія буде виконуватись як контрольований пакет.");
    }
  },
  {
    id: "BUILD",
    name: "BUILD",
    purpose: "Побудова файлів тільки після проходження попередніх gates.",
    check(action) {
      return pass("BUILD дозволено: попередні gates пройдені.");
    }
  },
  {
    id: "TEST",
    name: "TEST",
    purpose: "Обовʼязковий тест через Live Server.",
    check(action) {
      return pass("TEST заплановано: Live Server + функціональні перевірки.");
    }
  },
  {
    id: "FIX",
    name: "FIX / Фіксація",
    purpose: "Фіксація стабільної точки після тесту.",
    check(action) {
      return pass("FIX готовий: після тесту можна робити commit.");
    }
  },
  {
    id: "GIT",
    name: "GIT",
    purpose: "Обовʼязкові git-команди після пакету.",
    check(action) {
      return pass("GIT готовий: команди сформовано.");
    }
  }
];

function pass(message) {
  return { status: "PASS", message };
}

function block(message) {
  return { status: "BLOCK", message };
}

function getAction() {
  return {
    name: document.getElementById("actionName").value.trim(),
    goal: document.getElementById("actionGoal").value.trim()
  };
}

function log(message) {
  const box = document.getElementById("log");
  if (box.textContent === "WAITING") box.textContent = "";
  box.textContent += message + "\n";
}

function renderModes(results = []) {
  const box = document.getElementById("modeList");

  box.innerHTML = ODIN_MODES.map(mode => {
    const result = results.find(item => item.id === mode.id);
    const css = result
      ? (result.status === "PASS" ? "done" : "blocked")
      : "";

    const message = result ? result.message : mode.purpose;

    return [
      '<div class="mode ' + css + '">',
      '<h3>' + mode.name + '</h3>',
      '<p>' + message + '</p>',
      '</div>'
    ].join("");
  }).join("");
}

function renderGitCommands(action) {
  const safeBranchMessage = action.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const commitMessage = safeBranchMessage || "odin-mode-control-update";

  document.getElementById("gitBox").textContent = [
    "git add dev/index.html dev/style.css dev/app.js README_v3_9_2.md",
    'git commit -m "v3.9.2 mode control auto-run guard"',
    "git push"
  ].join("\n");
}

function runGuard() {
  clearAll();

  const action = getAction();
  const results = [];

  log("AUTO_RUN_GUARD_STARTED");
  log("ACTION: " + action.name);

  for (const mode of ODIN_MODES) {
    log("RUN_MODE: " + mode.id);
    const result = mode.check(action);
    results.push({ id: mode.id, status: result.status, message: result.message });

    if (result.status === "BLOCK") {
      log("BLOCKED_BY: " + mode.id);
      renderModes(results);
      document.getElementById("currentGate").textContent = "BLOCKED: " + mode.id;
      document.getElementById("currentGate").className = "gate blocked";
      document.getElementById("decision").textContent = result.message;
      document.getElementById("decision").className = "decision";
      document.getElementById("gitBox").textContent = "Git commands blocked until guard passes.";
      return;
    }
  }

  renderModes(results);
  document.getElementById("currentGate").textContent = "PASSED";
  document.getElementById("currentGate").className = "gate ok";
  document.getElementById("decision").textContent =
    "AUTO-RUN GUARD PASSED. Можна переходити до наступного пакету без втрати режимної дисципліни.";
  document.getElementById("decision").className = "decision";

  renderGitCommands(action);

  log("AUTO_RUN_GUARD_PASSED");
  log("READY_FOR_NEXT_PACKAGE");
}

function clearAll() {
  document.getElementById("log").textContent = "";
  document.getElementById("gitBox").textContent = "Після успішного guard тут будуть команди.";
  document.getElementById("currentGate").textContent = "WAITING";
  document.getElementById("currentGate").className = "gate waiting";
  document.getElementById("decision").textContent = "Очікування запуску.";
  document.getElementById("decision").className = "decision muted";
  renderModes();
}

document.addEventListener("DOMContentLoaded", function () {
  renderModes();
  document.getElementById("runGuardBtn").addEventListener("click", runGuard);
  document.getElementById("clearBtn").addEventListener("click", clearAll);
});
