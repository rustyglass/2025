// Track last visited page (including query string)
(function () {
  // Get just the file name (or "index.html" for root)
  const path = window.location.pathname.split("/").pop() || "index.html";
  const search = window.location.search || "";
  const full = path + search; // e.g. "prompt.html?number=12"

  // Don't store login.html as "last page"
  if (path !== "login.html") {
    try {
      localStorage.setItem("rc25_last_page", full);
    } catch (e) {
      // ignore storage errors
    }
  }
})();
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

// One clean key used across the entire site:
const READER_KEY = "current_reader";

function rc25GetCurrentReader() {
  try {
    return localStorage.getItem(READER_KEY) || null;
  } catch {
    return null;
  }
}

function rc25SetCurrentReader(nameOrNull) {
  try {
    if (nameOrNull) {
      localStorage.setItem(READER_KEY, nameOrNull);
    } else {
      localStorage.removeItem(READER_KEY);
    }
  } catch {}

  updateLoginStatusAvatar();
}

function rc25SignOut() {
  rc25SetCurrentReader(null);   // clears all login info
  window.location.href = "index.html";
}

// Expose globally
window.rc25GetCurrentReader = rc25GetCurrentReader;
window.rc25SetCurrentReader = rc25SetCurrentReader;
window.rc25SignOut = rc25SignOut;

function updateLoginStatusAvatar() {
  const desktopEl = document.getElementById("loginStatus");
  const mobileEl  = document.getElementById("loginStatusMobile");
  if (!desktopEl && !mobileEl) return;

    const current = rc25GetCurrentReader();
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
    mobileEl.textContent = label;
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

    // Determine current path
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

        let sectionIsActive = false;  // 🔹 track if any child matches

        item.submenu.forEach(s => {
          const a = document.createElement("a");
          a.href = s.link;
          a.textContent = s.name;

          if (a.getAttribute("href") === currentPath) {
            a.classList.add("active");
            sectionIsActive = true;   // 🔹 remember a child is active
          }

          sub.appendChild(a);
        });

        // 🔹 If any submenu item is active, underline the parent label too
        if (sectionIsActive) {
          title.classList.add("active");
        }

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

    // Close drawer when a normal mobile link is tapped
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
    const header = document.getElementById("main-header");
    if (header && !bootOnce._scrollBound) {
      window.addEventListener("scroll", () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
      });
      bootOnce._scrollBound = true;
    }

    const mobileMenu = document.getElementById("mobileMenu");
    const menuBtn = document.getElementById("menu-button");
    if (menuBtn && mobileMenu && !bootOnce._toggleBound) {
      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });
      bootOnce._toggleBound = true;
    }
  }

  function tryRenderWithRetries(maxTries = 12, intervalMs = 250) {
    let tries = 0;
    const timer = setInterval(() => {
      tries++;

      const nav = document.querySelector("nav.menu");
      const mobile = document.getElementById("mobileMenu");
      const items =
        (typeof window.menuItems !== "undefined") ? window.menuItems :
        (typeof menuItems !== "undefined" ? menuItems : null);

      if (nav && mobile && Array.isArray(items)) {
        clearInterval(timer);
        bootOnce();
        renderMenu(items);
        updateLoginStatusAvatar();
      } else if (tries >= maxTries) {
        clearInterval(timer);
        console.warn("[menu] Failed to render after retries", {
          hasNav: !!nav,
          hasMobile: !!mobile,
          hasItems: Array.isArray(items)
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
})();
