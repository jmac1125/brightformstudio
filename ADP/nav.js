/**
 * Ambition Dance Productions — Shared Navigation
 * ─────────────────────────────────────────────
 * Drop <script src="nav.js"></script> just before </body> on any page.
 * The script auto-detects the current page filename and marks the
 * correct nav link as active.
 *
 * TO UPDATE THE NAV: edit this one file. All pages update instantly.
 */

(function () {

  /* ── NAV LINKS ─────────────────────────────────────────────────────
     Each entry: { label, href, file }
     "file" is the filename used to detect the active page.
     Set file to '' for external links (never marked active).
  ─────────────────────────────────────────────────────────────────── */
  const NAV_LINKS = [
    { label: 'Classes',    href: 'ambition-dance-classes.html',   file: 'ambition-dance-classes' },
    { label: 'Company',    href: 'ambition-dance-company.html',   file: 'ambition-dance-company' },
    { label: 'Drill Team', href: 'ambition-dance-drillteam.html', file: 'ambition-dance-drillteam' },
    { label: 'Events',     href: 'ambition-dance-events.html',    file: 'ambition-dance-events' },
    { label: 'About',      href: 'ambition-dance-about.html',     file: 'ambition-dance-about' },
    { label: 'Contact',    href: 'ambition-dance-contact.html',   file: 'ambition-dance-contact' },
  ];

  const CTA = {
    label: 'Register Now',
    href:  'https://app.thestudiodirector.com/ambitiondancepro/portal.sd',
  };

  const LOGO_HREF = 'index.html';

  /* ── DETECT ACTIVE PAGE ─────────────────────────────────────────── */
  const currentFile = window.location.pathname.split('/').pop().replace('.html', '');
  // Hero page active state
  const isHome = currentFile === 'index' || currentFile === '';

  /* ── STYLES ─────────────────────────────────────────────────────── */
  const css = `
    :root {
      --nav-gold:        #c8a96e;
      --nav-gold-dark:   #a8893e;
      --nav-bg:          #0a0a0f;
      --nav-border:      rgba(255,255,255,0.08);
      --nav-text-muted:  rgba(255,255,255,0.50);
      --nav-font-display: 'Montserrat', sans-serif;
      --nav-font-body:    'Work Sans', sans-serif;
    }

    /* ── SHARED NAV SHELL ── */
    #adp-nav {
      position: relative;
      z-index: 200;
      border-bottom: 0.5px solid var(--nav-border);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
    }
    #adp-nav .nav-container {
      width: 100%;
      max-width: 1440px;
      margin: 0 auto;
      padding: 0 56px;
    }
    #adp-nav .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 0;
    }

    /* ── LOGO ── */
    #adp-nav .nav-logo {
      font-family: var(--nav-font-display);
      font-weight: 900;
      font-size: 18px;
      letter-spacing: 0.12em;
      color: #fff;
      text-transform: uppercase;
      line-height: 1.1;
      text-decoration: none;
      flex-shrink: 0;
    }
    #adp-nav .nav-logo span {
      display: block;
      font-weight: 300;
      font-size: 10px;
      letter-spacing: 0.35em;
      color: var(--nav-gold);
      margin-top: 3px;
    }

    /* ── DESKTOP LINKS ── */
    #adp-nav .nav-links {
      display: flex;
      align-items: center;
      gap: 28px;
      list-style: none;
      margin: 0;
      padding: 0;
    }
    #adp-nav .nav-links a {
      font-family: var(--nav-font-body);
      font-size: 11.5px;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--nav-text-muted);
      text-decoration: none;
      transition: color 0.2s;
      white-space: nowrap;
    }
    #adp-nav .nav-links a:hover,
    #adp-nav .nav-links a.active {
      color: #fff;
    }
    #adp-nav .nav-cta {
      background: var(--nav-gold);
      color: var(--nav-bg) !important;
      font-family: var(--nav-font-display) !important;
      font-weight: 700 !important;
      font-size: 11px !important;
      letter-spacing: 0.1em;
      padding: 10px 22px;
      border-radius: 2px;
      transition: background 0.2s !important;
      white-space: nowrap;
    }
    #adp-nav .nav-cta:hover {
      background: var(--nav-gold-dark) !important;
    }

    /* ── HAMBURGER BUTTON ── */
    #adp-nav .nav-hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 5px;
      width: 40px;
      height: 40px;
      background: none;
      border: 0.5px solid rgba(255,255,255,0.14);
      border-radius: 4px;
      cursor: pointer;
      padding: 0;
      flex-shrink: 0;
      transition: border-color 0.2s;
      position: relative;
      z-index: 210;
    }
    #adp-nav .nav-hamburger:hover {
      border-color: var(--nav-gold);
    }
    #adp-nav .nav-hamburger .bar {
      display: block;
      width: 18px;
      height: 1.5px;
      background: rgba(255,255,255,0.7);
      border-radius: 2px;
      transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
      transform-origin: center;
    }
    /* open state — morph into X */
    #adp-nav.menu-open .nav-hamburger .bar:nth-child(1) {
      transform: translateY(6.5px) rotate(45deg);
    }
    #adp-nav.menu-open .nav-hamburger .bar:nth-child(2) {
      opacity: 0;
      width: 0;
    }
    #adp-nav.menu-open .nav-hamburger .bar:nth-child(3) {
      transform: translateY(-6.5px) rotate(-45deg);
    }

    /* ── MOBILE DRAWER ── */
    #adp-mobile-menu {
      display: none;
      position: fixed;
      inset: 0;
      z-index: 190;
      pointer-events: none;
    }
    /* dark backdrop */
    #adp-mobile-menu .mobile-backdrop {
      position: absolute;
      inset: 0;
      background: rgba(5,5,10,0.7);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    /* slide-in panel */
    #adp-mobile-menu .mobile-panel {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      width: min(320px, 85vw);
      background: #0e0e18;
      border-left: 0.5px solid rgba(200,169,110,0.18);
      display: flex;
      flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(0.22,1,0.36,1);
      overflow-y: auto;
    }
    /* open state */
    #adp-mobile-menu.open {
      pointer-events: auto;
    }
    #adp-mobile-menu.open .mobile-backdrop {
      opacity: 1;
    }
    #adp-mobile-menu.open .mobile-panel {
      transform: translateX(0);
    }

    /* panel header */
    .mobile-panel-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 22px 28px;
      border-bottom: 0.5px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
    }
    .mobile-logo {
      font-family: var(--nav-font-display);
      font-weight: 900;
      font-size: 15px;
      letter-spacing: 0.12em;
      color: #fff;
      text-transform: uppercase;
      line-height: 1.1;
      text-decoration: none;
    }
    .mobile-logo span {
      display: block;
      font-weight: 300;
      font-size: 9px;
      letter-spacing: 0.3em;
      color: var(--nav-gold);
      margin-top: 2px;
    }
    .mobile-close {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
      border: 0.5px solid rgba(255,255,255,0.1);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 16px;
      color: rgba(255,255,255,0.5);
      transition: background 0.2s, color 0.2s;
      flex-shrink: 0;
    }
    .mobile-close:hover {
      background: rgba(200,169,110,0.15);
      color: var(--nav-gold);
    }

    /* panel nav links */
    .mobile-nav-links {
      list-style: none;
      padding: 12px 0;
      flex: 1;
    }
    .mobile-nav-links li {
      border-bottom: 0.5px solid rgba(255,255,255,0.05);
    }
    .mobile-nav-links li:last-child {
      border-bottom: none;
    }
    .mobile-nav-links a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 18px 28px;
      font-family: var(--nav-font-display);
      font-weight: 700;
      font-size: 13px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      transition: color 0.18s, background 0.18s;
    }
    .mobile-nav-links a:hover,
    .mobile-nav-links a.active {
      color: #fff;
      background: rgba(255,255,255,0.03);
    }
    .mobile-nav-links a.active {
      color: var(--nav-gold);
    }
    .mobile-nav-links a .mobile-arrow {
      font-size: 12px;
      color: rgba(200,169,110,0.35);
      transition: transform 0.18s;
    }
    .mobile-nav-links a:hover .mobile-arrow,
    .mobile-nav-links a.active .mobile-arrow {
      color: var(--nav-gold);
      transform: translateX(3px);
    }

    /* panel footer */
    .mobile-panel-footer {
      padding: 24px 28px;
      border-top: 0.5px solid rgba(255,255,255,0.07);
      flex-shrink: 0;
    }
    .mobile-cta {
      display: block;
      background: var(--nav-gold);
      color: var(--nav-bg);
      font-family: var(--nav-font-display);
      font-weight: 700;
      font-size: 12px;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: 15px 20px;
      border-radius: 2px;
      text-decoration: none;
      text-align: center;
      transition: background 0.2s;
      margin-bottom: 16px;
    }
    .mobile-cta:hover { background: var(--nav-gold-dark); }
    .mobile-contact-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .mobile-contact-row a {
      font-size: 12px;
      font-weight: 400;
      color: rgba(255,255,255,0.3);
      text-decoration: none;
      letter-spacing: 0.04em;
      transition: color 0.18s;
    }
    .mobile-contact-row a:hover { color: var(--nav-gold); }

    /* ── RESPONSIVE ── */
    @media (max-width: 900px) {
      #adp-nav .nav-container {
        padding: 0 24px;
      }
      #adp-nav .nav-links {
        display: none;
      }
      #adp-nav .nav-hamburger {
        display: flex;
      }
      #adp-mobile-menu {
        display: block;
      }
    }
  `;

  /* ── INJECT FONT PRECONNECTS (if not already present) ────────────── */
  if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    ['https://fonts.googleapis.com', 'https://fonts.gstatic.com'].forEach((href, i) => {
      const l = document.createElement('link');
      l.rel = 'preconnect';
      l.href = href;
      if (i === 1) l.crossOrigin = '';
      document.head.appendChild(l);
    });
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800;900&family=Work+Sans:wght@300;400;500;600&display=swap';
    document.head.appendChild(fontLink);
  }

  /* ── INJECT STYLES ──────────────────────────────────────────────── */
  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  /* ── BUILD NAV HTML ─────────────────────────────────────────────── */
  const linksHTML = NAV_LINKS.map(link => {
    const isActive = link.file && currentFile === link.file;
    return `<li><a href="${link.href}"${isActive ? ' class="active"' : ''}>${link.label}</a></li>`;
  }).join('\n        ');

  const mobileLinksHTML = NAV_LINKS.map(link => {
    const isActive = link.file && currentFile === link.file;
    return `
      <li>
        <a href="${link.href}"${isActive ? ' class="active"' : ''}>
          ${link.label}
          <span class="mobile-arrow">→</span>
        </a>
      </li>`;
  }).join('');

  const navHTML = `
    <nav id="adp-nav">
      <div class="nav-container">
        <div class="nav-inner">
          <a class="nav-logo" href="${LOGO_HREF}">
            Ambition
            <span>Dance Productions</span>
          </a>
          <ul class="nav-links">
            ${linksHTML}
            <li><a href="${CTA.href}" class="nav-cta" target="_blank" rel="noopener">${CTA.label}</a></li>
          </ul>
          <button class="nav-hamburger" id="adp-hamburger" aria-label="Open navigation menu" aria-expanded="false" aria-controls="adp-mobile-menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- Mobile drawer -->
    <div id="adp-mobile-menu" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div class="mobile-backdrop" id="adp-mobile-backdrop"></div>
      <div class="mobile-panel">
        <div class="mobile-panel-header">
          <a class="mobile-logo" href="${LOGO_HREF}">
            Ambition
            <span>Dance Productions</span>
          </a>
          <button class="mobile-close" id="adp-mobile-close" aria-label="Close menu">&#x2715;</button>
        </div>
        <ul class="mobile-nav-links">
          ${mobileLinksHTML}
        </ul>
        <div class="mobile-panel-footer">
          <a class="mobile-cta" href="${CTA.href}" target="_blank" rel="noopener">${CTA.label} →</a>
          <div class="mobile-contact-row">
            <a href="tel:4692182400">469-218-2400</a>
            <a href="mailto:wendy@ambitiondancepro.com">wendy@ambitiondancepro.com</a>
          </div>
        </div>
      </div>
    </div>
  `;

  /* ── INJECT INTO PAGE ───────────────────────────────────────────── */
  // Insert at the very start of <body>
  document.body.insertAdjacentHTML('afterbegin', navHTML);

  /* ── HAMBURGER LOGIC ────────────────────────────────────────────── */
  const adpNav       = document.getElementById('adp-nav');
  const hamburger    = document.getElementById('adp-hamburger');
  const mobileMenu   = document.getElementById('adp-mobile-menu');
  const mobileClose  = document.getElementById('adp-mobile-close');
  const mobileBackdrop = document.getElementById('adp-mobile-backdrop');

  function openMenu() {
    mobileMenu.classList.add('open');
    adpNav.classList.add('menu-open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMenu() {
    mobileMenu.classList.remove('open');
    adpNav.classList.remove('menu-open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  mobileClose.addEventListener('click', closeMenu);
  mobileBackdrop.addEventListener('click', closeMenu);

  // Close on Escape
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMenu();
  });

  // Close when a mobile link is clicked (navigating)
  mobileMenu.querySelectorAll('.mobile-nav-links a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  // Trap focus within open mobile menu
  mobileMenu.addEventListener('keydown', e => {
    if (!mobileMenu.classList.contains('open') || e.key !== 'Tab') return;
    const focusable = Array.from(mobileMenu.querySelectorAll(
      'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.disabled);
    const first = focusable[0];
    const last  = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  });

})();
