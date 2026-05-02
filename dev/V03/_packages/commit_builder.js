(() => {
  function ready(fn){ if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  ready(() => {
    const state = document.getElementById('stateValue'); if (state) state.textContent = 'COMMIT_BUILDER_READY';
    const workflow = document.getElementById('workflowValue'); if (workflow) workflow.textContent = 'Git fixation';
    const btn = document.getElementById('copyCommitCommands');
    const pre = document.getElementById('commitCommands');
    if (btn && pre) {
      btn.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(pre.textContent.trim()); btn.textContent = 'Скопійовано'; }
        catch { btn.textContent = 'Скопіюй команди з блоку вище'; }
      });
    }
  });
})();
