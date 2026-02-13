// ============================================
// THEME TOGGLE - Dark/Light mode switcher
// ============================================

(function () {
  // Read saved theme, default to 'light'
  let currentTheme = 'light';
  try {
    currentTheme = localStorage.getItem('theme') || 'light';
  } catch (e) {
    // localStorage may be unavailable in some environments
  }

  // Apply theme immediately on load (before DOMContentLoaded to prevent flash)
  document.documentElement.setAttribute('data-theme', currentTheme);

  function createThemeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'theme-toggle';
    toggleBtn.setAttribute('aria-label', 'Toggle dark/light theme');
    toggleBtn.innerHTML = `
      <i class='bx bx-sun sun-icon'></i>
      <i class='bx bx-moon moon-icon'></i>
    `;
    document.body.appendChild(toggleBtn);

    updateToggleIcon(currentTheme);
    toggleBtn.addEventListener('click', toggleTheme);
  }

  function toggleTheme() {
    const active = document.documentElement.getAttribute('data-theme');
    const next = active === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', next);

    try { localStorage.setItem('theme', next); } catch (e) { /* ignore */ }

    updateToggleIcon(next);

    if (typeof showToast === 'function') {
      showToast(`${next === 'dark' ? 'Dark' : 'Light'} mode activated`, 'success');
    }
  }

  function updateToggleIcon(theme) {
    const btn = document.querySelector('.theme-toggle');
    if (!btn) return;
    btn.classList.toggle('dark-mode', theme === 'dark');
  }

  document.addEventListener('DOMContentLoaded', createThemeToggle);
})();