// login.js
(function () {
  const STORAGE_KEY = 'rc25_current_reader';

  function getStoredReader() {
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
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

  function ensureLoginLinks() {
    const reader = getStoredReader();
    const label = reader || 'Sign In';

    // Desktop nav
    const nav = document.querySelector('nav.menu');
    if (nav) {
      let desktopLink = nav.querySelector('a.login-link');
      if (!desktopLink) {
        desktopLink = document.createElement('a');
        desktopLink.className = 'login-link';
        desktopLink.href = 'login.html';
        nav.appendChild(desktopLink);
      }
      desktopLink.textContent = label;
    }

    // Mobile menu
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      let mobileLink = mobileMenu.querySelector('a.login-link');
      if (!mobileLink) {
        mobileLink = document.createElement('a');
        mobileLink.className = 'login-link';
        mobileLink.href = 'login.html';
        mobileMenu.appendChild(mobileLink);
      }
      mobileLink.textContent = label;
    }
  }

  function setupObservers() {
    const nav = document.querySelector('nav.menu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (nav) {
      const navObserver = new MutationObserver(() => {
        // If menu.js rebuilds nav, re-ensure the login link exists
        ensureLoginLinks();
      });
      navObserver.observe(nav, { childList: true, subtree: false });
    }

    if (mobileMenu) {
      const mobileObserver = new MutationObserver(() => {
        ensureLoginLinks();
      });
      mobileObserver.observe(mobileMenu, { childList: true, subtree: false });
    }
  }

  function waitForMenuThenInit() {
    const nav = document.querySelector('nav.menu');
    const mobileMenu = document.getElementById('mobileMenu');

    // Wait until menu.js has actually created the menus
    if (!nav || nav.children.length === 0 || !mobileMenu) {
      setTimeout(waitForMenuThenInit, 50);
      return;
    }

    // Make sure links exist & are labeled correctly
    ensureLoginLinks();
    setupObservers();

    // Expose helpers to the rest of the app
    window.rc25GetCurrentReader = getStoredReader;
    window.rc25SetCurrentReader = function (name) {
      setStoredReader(name);
      ensureLoginLinks();
      dispatchReaderChanged(name);
    };

    // Fire initial event so pages can react
    dispatchReaderChanged(getStoredReader());
  }

  document.addEventListener('DOMContentLoaded', waitForMenuThenInit);
})();
