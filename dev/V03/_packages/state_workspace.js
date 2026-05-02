(() => {
  function ready(fn){ if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
  ready(() => {
    const state = document.getElementById('stateValue'); if (state) state.textContent = 'STATE_WORKSPACE_READY';
    const workflow = document.getElementById('workflowValue'); if (workflow) workflow.textContent = 'State validation';
  });
})();
