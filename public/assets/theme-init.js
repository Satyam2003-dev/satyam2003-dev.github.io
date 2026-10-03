try {
  const saved = localStorage.getItem('sec-notes-theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch {}
