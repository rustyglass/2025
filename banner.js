(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cfg = window.BANNER_CONFIG;
    if (!cfg || !cfg.message) {
      // No config or no message → no banner
      return;
    }

    // Create banner container
    const banner = document.createElement("div");
    banner.className = "site-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Site announcement banner");

    // Apply configurable colors with safe defaults
    banner.style.backgroundColor = cfg.backgroundColor || "#247182";
    banner.style.color = cfg.textColor || "#ffffff";

    // Message text
    const text = document.createElement("span");
    text.className = "site-banner-text";
    text.textContent = cfg.message;
    banner.appendChild(text);

    // Optional button
    if (cfg.buttonText && cfg.buttonUrl) {
      const btn = document.createElement("a");
      btn.className = "site-banner-button";
      btn.href = cfg.buttonUrl;
      btn.textContent = cfg.buttonText;
      btn.target = "_blank";
      btn.rel = "noopener";
      banner.appendChild(btn);
    }

    // Insert under your main header if it exists, otherwise at top of body
    const header = document.getElementById("main-header");
    if (header && header.parentNode) {
      header.parentNode.insertBefore(banner, header.nextSibling);
    } else if (document.body.firstChild) {
      document.body.insertBefore(banner, document.body.firstChild);
    } else {
      document.body.appendChild(banner);
    }
  });
})();
