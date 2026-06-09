(function() {
  const toggle = document.querySelector('.theme-toggle');
  const root = document.documentElement;

  function getSystemTheme() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function getCurrentTheme() {
    return root.getAttribute('data-theme') || getSystemTheme();
  }

  toggle.addEventListener('click', function() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
  });
})();
