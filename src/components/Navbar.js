/**
 * src/components/Navbar.js
 * ─────────────────────────
 * Top navigation bar with logo + theme toggle.
 * Returns an HTML string; mounted by app.js.
 */

export function renderNavbar(siteName = "ReelSnap") {
  return `
    <nav class="navbar" role="navigation" aria-label="Main navigation">
      <div class="navbar__inner container">
        <a href="/" class="navbar__brand" aria-label="${siteName} home">
          <span class="navbar__logo-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#grad)"/>
              <path d="M10 8.5L20 14L10 19.5V8.5Z" fill="white"/>
              <defs>
                <linearGradient id="grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                  <stop stop-color="#a855f7"/>
                  <stop offset="1" stop-color="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span class="navbar__brand-name">${siteName}</span>
        </a>

        <div class="navbar__actions">
          <button
            id="theme-toggle"
            class="btn-icon"
            aria-label="Toggle light/dark mode"
            title="Toggle theme"
          >
            <span class="theme-icon theme-icon--dark" aria-hidden="true">
              <!-- Moon icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"/>
              </svg>
            </span>
            <span class="theme-icon theme-icon--light" aria-hidden="true">
              <!-- Sun icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <line x1="12" y1="1" x2="12" y2="3"/>
                <line x1="12" y1="21" x2="12" y2="23"/>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                <line x1="1" y1="12" x2="3" y2="12"/>
                <line x1="21" y1="12" x2="23" y2="12"/>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </nav>
  `;
}
