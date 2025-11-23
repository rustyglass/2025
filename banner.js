(function () {
  document.addEventListener("DOMContentLoaded", function () {
    const cfg = window.BANNER_CONFIG;

    // If there is no config or no message, do nothing (no banner)
    if (!cfg || !cfg.message || cfg.message.trim() === "") {
      return;
    }

    const header = document.getElementById("main-header");
    if (!header || !header.parentNode) {
      // Fallback: just append to top of body if header not found
      const fallbackBanner = buildBanner(cfg);
      document.body.insertBefore(fallbackBanner, document.body.firstChild || null);
      return;
    }

    // Create a wrapper that will hold the banner AND the header
    let wrapper = document.querySelector(".sticky-header-wrapper");
    if (!wrapper) {
      wrapper = document.createElement("div");
      wrapper.className = "sticky-header-wrapper";
      // Insert wrapper where the header currently is
      header.parentNode.insertBefore(wrapper, header);
      // Move header into wrapper
      wrapper.appendChild(header);
    }

    // Build the banner and insert it ABOVE the header inside the wrapper
    const banner = buildBanner(cfg);
    wrapper.insertBefore(banner, wrapper.firstChild);
  });

  function buildBanner(cfg) {
    const banner = document.createElement("div");
    banner.className = "site-banner";
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Site announcement banner");

    // Apply configurable colors with safe defaults
    banner.style.backgroundColor = cfg.backgroundColor || "#247182";
    banner.style.color = cfg.textColor || "#ffffff";

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

    return banner;
  }
})();
