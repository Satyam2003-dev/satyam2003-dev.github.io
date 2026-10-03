(() => {
  const root = document.documentElement;
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('sec-notes-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {}
  root.dataset.theme = theme;
  document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-theme-toggle]');
    const meta = document.querySelector('meta[name="theme-color"]');
    function update() {
      const light = root.dataset.theme === 'light';
      toggle.textContent = light ? 'Dark theme' : 'Light theme';
      toggle.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
      meta.content = light ? '#ffffff' : '#0b0d0c';
    }
    update();
    toggle.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'light' ? 'dark' : 'light';
      try { localStorage.setItem('sec-notes-theme', root.dataset.theme); } catch {}
      update();
    });
  });
})();
