const ODIN_GIT_CONTROL = {
  buildPlan() {
    const tasks = (window.ODIN_STATE?.data?.projects?.[0]?.tasks) || [];
    const add = [], update = [];

    tasks.forEach(t => {
      if (t.action === "CREATE_TASK") add.push(t.path);
      if (t.action === "FIX_LATER") update.push(t.path);
    });

    return { add, update };
  },

  generateCommands() {
    const plan = this.buildPlan();
    const cmds = [];

    if (plan.add.length)
      cmds.push(`git add ${plan.add.join(" ")}`);

    if (plan.update.length)
      cmds.push(`git add ${plan.update.join(" ")}`);

    cmds.push('git commit -m "ODIN AUTO UPDATE"');
    cmds.push("git push origin dev");

    document.getElementById("gitBox").textContent = cmds.join("\n");
  },

  copy() {
    navigator.clipboard.writeText(document.getElementById("gitBox").textContent);
  }
};

window.ODIN_GIT_CONTROL = ODIN_GIT_CONTROL;
