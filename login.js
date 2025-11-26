// login.js
(function () {
  const STORAGE_KEY = 'rc25_current_reader';

  function getReaders() {
    return Array.isArray(window.RC25_READERS) ? window.RC25_READERS : [];
  }

  function getStoredReader() {
    try {
      const val = localStorage.getItem(STORAGE_KEY);
      return val || null;
    } catch {
      return null;
    }
  }

  function setStoredReader(name) {
    try {
      if (name) {
        localStorage.setItem(STORAGE_KEY, name);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore storage errors
    }
  }

  function updateToggleLabel(btn, name) {
    if (!btn) return;
    btn.textContent = name ? `Signed in as ${name}` : 'Not signed in';
  }

  function dispatchReaderChanged(name) {
    // Custom event so pages (prompts, readers, etc.) can react
    const ev = new CustomEvent('rc25ReaderChanged', {
      detail: { reader: name || null }
    });
    window.dispatchEvent(ev);
  }

  function initLoginUI() {
    const readers = getReaders();
    if (!readers.length) return;

    const toggle = document.getElementById('loginToggle');
    const dropdown = document.getElementById('loginDropdown');
    if (!toggle || !dropdown) return;

    const current = getStoredReader();
    updateToggleLabel(toggle, current);

    // Build dropdown buttons
    dropdown.innerHTML = readers
      .map(name => {
        const isActive = name === current;
        return `
          <button type="button" data-reader="${name}" class="${isActive ? 'active' : ''}">
            <span>${name}</span>
          </button>
        `;
      })
      .join('');

    function closeDropdown() {
      dropdown.classList.remove('open');
      dropdown.setAttribute('aria-hidden', 'true');
    }

    function openDropdown() {
      dropdown.classList.add('open');
      dropdown.setAttribute('aria-hidden', 'false');
    }

    // Toggle dropdown on click
    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (dropdown.classList.contains('open')) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Click outside to close
    document.addEventListener('click', () => {
      if (dropdown.classList.contains('open')) {
        closeDropdown();
      }
    });

    dropdown.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-reader]');
      if (!btn) return;
      const name = btn.getAttribute('data-reader');

      // Update active styles
      dropdown.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      setStoredReader(name);
      updateToggleLabel(toggle, name);
      dispatchReaderChanged(name);
      closeDropdown();
    });

    // Expose helper globally if you need it anywhere
    window.rc25GetCurrentReader = function () {
      return getStoredReader();
    };

    // Fire initial event, so pages can read existing login on load
    dispatchReaderChanged(current);
  }

  document.addEventListener('DOMContentLoaded', initLoginUI);
})();
