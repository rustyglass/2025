/* =========================
   Login avatar helpers
   ========================= */
const AVATARS = {
  "Rusty": "/avatars/rusty.png",
  "Cindy": "/avatars/cindy.png",
  "Cassy": "/avatars/cassy.png",
  "Noah": "/avatars/noah.png",
  "Winny": "/avatars/winny.png",
  "Zoey": "/avatars/zoey.png"
};

const DEFAULT_AVATAR = "/avatars/guest.svg";

function updateLoginStatusAvatar() {
  const desktopEl = document.getElementById("loginStatus");
  const mobileEl  = document.getElementById("loginStatusMobile");
  if (!desktopEl && !mobileEl) return;

  const current = localStorage.getItem("rc25_current_reader");
  const avatarSrc = current && AVATARS[current] ? AVATARS[current] : DEFAULT_AVATAR;
  const label = current ? `Signed in as ${current}` : "Sign In";

  // ----- Desktop: avatar only -----
  if (desktopEl) {
    const html = `
      <span class="login-avatar-wrap">
        <img src="${avatarSrc}" class="login-avatar" alt="Profile Avatar">
      </span>
    `;
    desktopEl.innerHTML = html;
    desktopEl.onclick = () => { window.location.href = "login.html"; };
  }

  // ----- Mobile: bold text only -----
  if (mobileEl) {
    mobileEl.textContent = label;   // e.g. "Signed in as Rusty" or "Sign In"
    mobileEl.onclick = () => {
      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu) mobileMenu.classList.remove("active");
      window.location.href = "login.html";
    };
  }
}

/* =========================
   Shared menu (robust boot)
   ========================= */
(function () {
  // ----- Build desktop + mobile menus (with active underline) -----
  function renderMenu(items) {
    const nav = document.querySelector("nav.menu");
    const mobile = document.getElementById("mobileMenu");
    if (!nav || !mobile || !Array.isArray(items)) return;

    // Determine current path (and alias prompt.html -> prompts.html if desired)
    let currentPath = (location.pathname.split("/").pop() || "index.html");
    const alias = {
      "": "index.html",
      "index": "index.html",
      // "prompt.html": "prompts.html",
    };
    if (alias[currentPath]) currentPath = alias[currentPath];

    nav.innerHTML = "";
    mobile.innerHTML = "";

    items.forEach(item => {
      if (item.submenu) {
        // ----- Desktop dropdown -----
        const wrap = document.createElement("div");
        wrap.className = "dropdown-wrapper";

        const title = document.createElement("a");
        title.textContent = item.name;
        title.href = "#";

        const sub = document.createElement("div");
        sub.className = "submenu";

        item.submenu.forEach(s => {
          const a = document.createElement("a");
          a.href = s.link;
          a.textContent = s.name;
          if (a.getAttribute("href") === currentPath) a.classList.add("active");
          sub.appendChild(a);
        });

        wrap.appendChild(title);
        wrap.appendChild(sub);
        nav.appendChild(wrap);

        // ----- Mobile accordion -----
        const mWrap = document.createElement("div");
        mWrap.className = "has-submenu";

        const mTitle = document.createElement("a");
        mTitle.href = "#";
        mTitle.textContent = item.name;
        mTitle.addEventListener("click", (e) => {
          e.preventDefault();
          mWrap.classList.toggle("open");
        });

        const mSub = document.createElement("div");
        mSub.className = "submenu";
        item.submenu.forEach(s => {
          const a = document.createElement("a");
          a.href = s.link;
          a.textContent = s.name;
          if (a.getAttribute("href") === currentPath) a.classList.add("active");
          mSub.appendChild(a);
        });

        mWrap.appendChild(mTitle);
        mWrap.appendChild(mSub);
        mobile.appendChild(mWrap);
      } else {
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.name;
        if (link.getAttribute("href") === currentPath) link.classList.add("active");
        nav.appendChild(link);
        mobile.appendChild(link.cloneNode(true));
      }
    });

    // 🔹 Desktop avatar container (right of Contact)
    const loginSpan = document.createElement("span");
    loginSpan.id = "loginStatus";
    loginSpan.className = "login-status";
    nav.appendChild(loginSpan);

    // 🔹 Mobile status text container (bottom of drawer)
    const mobileLogin = document.createElement("div");
    mobileLogin.id = "loginStatusMobile";
    mobileLogin.className = "login-status-mobile";
    mobile.appendChild(mobileLogin);

    // Close drawer when a *normal* mobile link is tapped
    mobile.querySelectorAll("a[href]").forEach(a => {
      a.addEventListener("click", () => {
        mobile.classList.remove("active");
      });
    });
  }

  // Expose for pages that might want to call manually (optional)
  window.renderMenu = renderMenu;

  // ----- Boot (scroll color + toggle + safe retries to render) -----
  function bootOnce() {
    // Header color on scroll
    const header = document.getElementById("main-header");
    if (header && !bootOnce._scrollBound) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
      });
      bootOnce._scrollBound = true;
    }

    // Mobile drawer toggle
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.getElementById("menu-button");
    if (menuBtn && mobileMenu && !bootOnce._toggleBound) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
      bootOnce._toggleBound = true;
    }
  }

  // Try to render when both DOM targets and menuItems exist.
  function tryRenderWithRetries(maxTries = 12, intervalMs = 250) {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;

      const nav = document.querySelector("nav.menu");
      const mobile = document.getElementById("mobileMenu");
      const items = (typeof window.menuItems !== "undefined") ? window.menuItems
                 : (typeof menuItems !== "undefined" ? menuItems : null);

      if (nav && mobile && Array.isArray(items)) {
        clearInterval(timer);
        bootOnce();
        renderMenu(items);
        // 🔹 Now that loginStatus elements exist, update with avatar/text
        updateLoginStatusAvatar();
      } else if (tries >= maxTries) {
        clearInterval(timer);
        console.warn("[menu] Failed to render after retries", {
          hasNav: !!nav, hasMobile: !!mobile, hasItems: Array.isArray(items)
        });
      }
    }, intervalMs);
  }

  // Start when DOM is ready; also try again on full load
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      tryRenderWithRetries();
    });
  } else {
    tryRenderWithRetries();
  }
  window.addEventListener("load", () => {
    tryRenderWithRetries(4, 250);
  });
})();      const mobileMenu = document.getElementById("mobileMenu");
      if (mobileMenu) mobileMenu.classList.remove("active");
      window.location.href = "login.html"; 
    };
  }
}
/* =========================
   Shared menu (robust boot)
   ========================= */
(function () {
  // ----- Build desktop + mobile menus (with active underline) -----
  function renderMenu(items) {
    const nav = document.querySelector("nav.menu");
    const mobile = document.getElementById("mobileMenu");
    if (!nav || !mobile || !Array.isArray(items)) return;

    // Determine current path (and alias prompt.html -> prompts.html if desired)
    let currentPath = (location.pathname.split("/").pop() || "index.html");
    const alias = {
      "": "index.html",
      "index": "index.html",
      // Uncomment to underline "Prompts" when on prompt.html detail pages:
      // "prompt.html": "prompts.html",
    };
    if (alias[currentPath]) currentPath = alias[currentPath];

    nav.innerHTML = "";
    mobile.innerHTML = "";

    items.forEach(item => {
      if (item.submenu) {
        // Desktop dropdown
        const wrap = document.createElement("div");
        wrap.className = "dropdown-wrapper";

        const title = document.createElement("a");
        title.textContent = item.name;
        title.href = "#";

        const sub = document.createElement("div");
        sub.className = "submenu";

        item.submenu.forEach(s => {
          const a = document.createElement("a");
          a.href = s.link;
          a.textContent = s.name;
          if (a.getAttribute("href") === currentPath) a.classList.add("active");
          sub.appendChild(a);
        });

        wrap.appendChild(title);
        wrap.appendChild(sub);
        nav.appendChild(wrap);

        // Mobile accordion
        const mWrap = document.createElement("div");
        mWrap.className = "has-submenu";

        const mTitle = document.createElement("a");
        mTitle.href = "#";
        mTitle.textContent = item.name;
        mTitle.addEventListener("click", (e) => {
          e.preventDefault();
          mWrap.classList.toggle("open");
        });

        const mSub = document.createElement("div");
        mSub.className = "submenu";
        item.submenu.forEach(s => {
          const a = document.createElement("a");
          a.href = s.link;
          a.textContent = s.name;
          if (a.getAttribute("href") === currentPath) a.classList.add("active");
          mSub.appendChild(a);
        });

        mWrap.appendChild(mTitle);
        mWrap.appendChild(mSub);
        mobile.appendChild(mWrap);
      } else {
        const link = document.createElement("a");
        link.href = item.link;
        link.textContent = item.name;
        if (link.getAttribute("href") === currentPath) link.classList.add("active");
        nav.appendChild(link);
        mobile.appendChild(link.cloneNode(true));
      }
    });

    // 🔹 Append login avatar slot AFTER the normal items

    // Desktop avatar container (right of Contact)
    const loginSpan = document.createElement("span");
    loginSpan.id = "loginStatus";
    loginSpan.className = "login-status";
    nav.appendChild(loginSpan);

    // Mobile avatar container (as its own item at bottom of drawer)
    const mobileLogin = document.createElement("div");
    mobileLogin.id = "loginStatusMobile";
    mobileLogin.className = "login-status-mobile";
    mobile.appendChild(mobileLogin);

    // Close drawer when a mobile link is tapped
    mobile.querySelectorAll("a[href]").forEach(a => {
      a.addEventListener("click", () => {
        mobile.classList.remove("active");
      });
    });
  }

  // Expose for pages that might want to call manually (optional)
  window.renderMenu = renderMenu;

  // ----- Boot (scroll color + toggle + safe retries to render) -----
  function bootOnce() {
    // Header color on scroll
    const header = document.getElementById("main-header");
    if (header && !bootOnce._scrollBound) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
      });
      bootOnce._scrollBound = true;
    }

    // Mobile drawer toggle
    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.getElementById("menu-button");
    if (menuBtn && mobileMenu && !bootOnce._toggleBound) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
      bootOnce._toggleBound = true;
    }
  }

  // Try to render when both DOM targets and menuItems exist.
  // Retry a few times in case of load order differences.
  function tryRenderWithRetries(maxTries = 12, intervalMs = 250) {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;

      const nav = document.querySelector("nav.menu");
      const mobile = document.getElementById("mobileMenu");
      const items = (typeof window.menuItems !== "undefined") ? window.menuItems
                 : (typeof menuItems !== "undefined" ? menuItems : null);

      if (nav && mobile && Array.isArray(items)) {
        clearInterval(timer);
        bootOnce();
        renderMenu(items);
        // 🔹 Now that the loginStatus elements exist, update them with the avatar
        updateLoginStatusAvatar();
      } else if (tries >= maxTries) {
        clearInterval(timer);
        // Last-ditch log to help debug if needed
        console.warn("[menu] Failed to render after retries", {
          hasNav: !!nav, hasMobile: !!mobile, hasItems: Array.isArray(items)
        });
      }
    }, intervalMs);
  }

  // Start when DOM is ready; also try again on full load (just in case)
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      tryRenderWithRetries();
    });
  } else {
    tryRenderWithRetries();
  }
  window.addEventListener("load", () => {
    // if something injected late, this gives it another chance
    tryRenderWithRetries(4, 250);
  });
})();
