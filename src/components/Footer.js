/**
 * src/components/Footer.js
 */

export function renderFooter(siteName = "ReelSnap") {
  const year = new Date().getFullYear();
  return `
    <footer class="footer" role="contentinfo">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="footer__logo">
            <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
              <rect width="28" height="28" rx="8" fill="url(#grad-footer)"/>
              <path d="M10 8.5L20 14L10 19.5V8.5Z" fill="white"/>
              <defs>
                <linearGradient id="grad-footer" x1="0" y1="0" x2="28" y2="28">
                  <stop stop-color="#a855f7"/><stop offset="1" stop-color="#ec4899"/>
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span>${siteName}</span>
        </div>
        <p class="footer__copy">
          &copy; ${year} ${siteName}. Free Instagram downloader tool.
        </p>
        <p class="footer__disclaimer">
          Not affiliated with Instagram or Meta. For personal use only.
        </p>
      </div>
    </footer>
  `;
}
