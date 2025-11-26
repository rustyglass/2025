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
      // ignore
    }
  }

  function dispatchReaderChanged(name) {
    const ev = new CustomEvent('rc25ReaderChanged', {
      detail: { reader: name || null }
    });
    window.dispatchEvent(ev);
  }

  function updateLoginLabels(label) {
    // Desktop nav
    const desktopLink = document.querySelector('nav.menu a.login-link');
    if (desktopLink) {
      desktopLink.textContent = label;
    }

    // Mobile menu
    const mobileLink = document.querySelector('#mobileMenu a.login-link');
    if (mobileLink) {
      mobileLink.textContent = label;
    }
  }

  function injectLoginLinks() {
    const reader = getStoredReader();
    const label = reader || 'Sign In';

    // ----- Desktop nav -----
    const nav = document.querySelector('nav.menu');
    if (nav) {
      const link = document.createElement('a');
      link.href = 'login.html';
      link.textContent = label;
      link.className = 'login-link';
      nav.appendChild(link);
    }

    // ----- Mobile sidebar -----
    // menu.js likely already filled #mobileMenu with links; we just add one more.
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      const mobileLink = document.createElement('a');
      mobileLink.href = 'login.html';
      mobileLink.textContent = label;
      mobileLink.className = 'login-link';
      mobileMenu.appendChild(mobileLink);
    }
  }

  function init() {
    injectLoginLinks();

    // Expose helpers so login.html (and others) can use them
    window.rc25GetCurrentReader = getStoredReader;
    window.rc25SetCurrentReader = function (name) {
      setStoredReader(name);
      const label = name || 'Sign In';
      updateLoginLabels(label);
      dispatchReaderChanged(name);
    };

    // Fire initial event so pages can react on load
    dispatchReaderChanged(getStoredReader());
  }

  document.addEventListener('DOMContentLoaded', init);
})();
