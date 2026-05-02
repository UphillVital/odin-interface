(function () {
  const refresh = document.getElementById('refreshState');
  const qaList = document.getElementById('qaList');
  const stateValue = document.getElementById('stateValue');
  if (!refresh || !qaList) return;

  refresh.addEventListener('click', () => {
    const item = document.createElement('li');
    const now = new Date().toLocaleString('uk-UA');
    item.textContent = `Стан оновлено локально: ${now}. UI shell і page script активні.`;
    qaList.appendChild(item);
    if (stateValue) stateValue.textContent = 'STATE REFRESHED';
  });
})();
