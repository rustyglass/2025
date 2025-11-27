// login.js
(function () {
  const STORAGE_KEY = 'rc25_current_reader';
  let injected = false; // prevent double-injection

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
    if (desktopLink) desktopLink.textContent = label;

    // Mobile menu
    const mobileLink = document.querySelector('#mobileMenu a.login-link');
    if (mobileLink) mobileLink.textContent = label;
  }

  function injectLoginLinks() {
    if (injected) return;
    injected = true;

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
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      const mobileLink = document.createElement('a');
      mobileLink.href = 'login.html';
      mobileLink.textContent = label;
      mobileLink.className = 'login-link';
      mobileMenu.appendChild(mobileLink);
    }

    // Expose helpers *after* links exist
    window.rc25GetCurrentReader = getStoredReader;
    window.rc25SetCurrentReader = function (name) {
      setStoredReader(name);
      const newLabel = name || 'Sign In';
      updateLoginLabels(newLabel);
      dispatchReaderChanged(name);
    };

    // Fire initial event so pages can react on load
    dispatchReaderChanged(reader);
  }

  // Wait until menu.js has built the menu, then inject
  function waitForMenuAndInject() {
    const nav = document.querySelector('nav.menu');
    const mobileMenu = document.getElementById('mobileMenu');

    // We want to wait until nav exists *and* has some children
    if (!nav || nav.children.length === 0 || !mobileMenu) {
      // Try again shortly
      setTimeout(waitForMenuAndInject, 50);
      return;
    }

    injectLoginLinks();
  }

  document.addEventListener('DOMContentLoaded', () => {
    waitForMenuAndInject();
  });
})();
