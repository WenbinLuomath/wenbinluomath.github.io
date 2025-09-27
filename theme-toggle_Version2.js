// Theme toggle and nav active script
(function () {
    const toggleButton = document.getElementById('theme-toggle');
    const body = document.body;
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // Apply active class to nav link
    document.querySelectorAll('nav ul li a').forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const saved = localStorage.getItem('theme'); // 'dark' | 'light' | null

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            toggleButton.textContent = '☀️';
            toggleButton.setAttribute('aria-pressed', 'true');
        } else {
            body.classList.remove('dark-theme');
            toggleButton.textContent = '🌙';
            toggleButton.setAttribute('aria-pressed', 'false');
        }
        try {
            localStorage.setItem('theme', theme);
        } catch (e) {
            // ignore storage errors
        }
    }

    // Initialize theme: saved > system preference > default light
    if (saved === 'dark' || saved === 'light') {
        applyTheme(saved);
    } else {
        applyTheme(prefersDark ? 'dark' : 'light');
    }

    toggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-theme');
        applyTheme(isDark ? 'light' : 'dark');
    });

    // Listen to system theme changes if user hasn't explicitly chosen
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        const savedAgain = localStorage.getItem('theme');
        if (!savedAgain) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });
})();