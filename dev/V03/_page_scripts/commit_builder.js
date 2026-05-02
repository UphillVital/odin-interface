(function () {
  const scope = document.getElementById('commitScope');
  const message = document.getElementById('commitMessage');
  const output = document.getElementById('commitOutput');
  const build = document.getElementById('buildCommitCommands');
  const copy = document.getElementById('copyCommitCommands');
  if (!scope || !message || !output || !build) return;

  function renderCommands() {
    const scopeValue = (scope.value || 'dev/V03/').trim();
    const messageValue = (message.value || 'ODIN update').trim().replace(/"/g, '\\"');
    output.textContent = `git add ${scopeValue} README_v03_31_5.md CHANGELOG_v03_31_5.md MANIFEST_v03_31_5.md QA_REPORT_v03_31_5.md\ngit commit -m "${messageValue}"\ngit push origin feature/odin-interface-v03`;
  }

  build.addEventListener('click', renderCommands);
  if (copy) {
    copy.addEventListener('click', async () => {
      renderCommands();
      try {
        await navigator.clipboard.writeText(output.textContent);
        copy.textContent = 'Скопійовано';
        setTimeout(() => { copy.textContent = 'Копіювати'; }, 1600);
      } catch (error) {
        copy.textContent = 'Скопіюй вручну';
      }
    });
  }
  renderCommands();
})();
