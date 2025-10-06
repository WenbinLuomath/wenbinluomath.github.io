// Theme toggle script: toggles a 'dark-mode' class on <body>
// Navbar colors are defined separately in CSS so they remain unchanged.

(function () {
  const STORAGE_KEY = 'site-theme'; // 'dark' | 'light'
  const btn = document.getElementById('theme-toggle');
  const body = document.body;

  if (!btn) return;

  // Apply initial theme: prefer stored value, fall back to OS preference, default to light.
  function getPreferredTheme() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'dark' || stored === 'light') return stored;
    } catch (e) {
      // ignore storage errors
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      btn.textContent = 'Switch to Light Mode';
      btn.setAttribute('aria-pressed', 'true');
    } else {
      body.classList.remove('dark-mode');
      btn.textContent = 'Switch to Dark Mode';
      btn.setAttribute('aria-pressed', 'false');
    }
  }

  function saveTheme(theme) {
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (e) {
      // ignore
    }
  }

  // Toggle handler
  btn.addEventListener('click', function () {
    const isDark = body.classList.contains('dark-mode');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  // Initialize on page load
  const initial = getPreferredTheme();
  applyTheme(initial);
})();
