/**
 * src/components/ResultCard.js
 * ──────────────────────────────
 * Shows extracted media info + download buttons.
 * Handles loading, success, and error states.
 */

import { APP_STATES } from "../types/index.js";
import { formatDuration } from "../utils/validators.js";

/**
 * Render the result section based on current app state.
 * @param {import('../types/index.js').AppState} appState
 * @param {import('../types/index.js').MediaResult|null} result
 * @param {string|null} error
 * @returns {string} HTML string
 */
export function renderResultCard(appState, result = null, error = null) {
  if (appState === APP_STATES.IDLE) return "";

  if (appState === APP_STATES.LOADING) {
    return `
      <section class="result-section container" aria-live="polite" aria-busy="true">
        <div class="result-card result-card--loading">
          <div class="skeleton-thumb"></div>
          <div class="skeleton-lines">
            <div class="skeleton-line skeleton-line--wide"></div>
            <div class="skeleton-line skeleton-line--medium"></div>
            <div class="skeleton-line skeleton-line--short"></div>
          </div>
        </div>
        <p class="loading-label">
          <span class="spinner" aria-hidden="true"></span>
          Fetching media info…
        </p>
      </section>
    `;
  }

  if (appState === APP_STATES.ERROR) {
    return `
      <section class="result-section container" aria-live="polite">
        <div class="result-card result-card--error" role="alert">
          <div class="error-icon" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
          </div>
          <h3 class="error-title">Couldn't fetch media</h3>
          <p class="error-message">${escapeHtml(error || "Something went wrong. Please try again.")}</p>
          <button id="retry-btn" class="btn btn--secondary">Try Again</button>
        </div>
      </section>
    `;
  }

  if (appState === APP_STATES.SUCCESS && result) {
    const videoFormats = result.formats.filter(f => f.type === "video");
    const audioFormats = result.formats.filter(f => f.type === "audio");
    const hasFormats   = result.formats.length > 0;

    return `
      <section class="result-section container" aria-live="polite">
        <div class="result-card result-card--success">

          <!-- Media preview row -->
          <div class="result-media">
            ${result.thumbnail ? `
              <div class="result-thumb-wrap">
                <img
                  src="${escapeHtml(result.thumbnail)}"
                  alt="Video thumbnail"
                  class="result-thumb"
                  loading="lazy"
                  onerror="this.parentElement.style.display='none'"
                />
                <div class="result-thumb-overlay" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </div>
            ` : ""}

            <div class="result-meta">
              <h3 class="result-title" title="${escapeHtml(result.title || "")}">
                ${escapeHtml(result.title || "Instagram Media")}
              </h3>
              <div class="result-tags">
                ${result.uploader ? `<span class="tag">@${escapeHtml(result.uploader)}</span>` : ""}
                ${result.duration ? `<span class="tag">${formatDuration(result.duration)}</span>` : ""}
                <span class="tag tag--success">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                  Ready
                </span>
              </div>

              <!-- Best / single download button -->
              ${result.best_url ? `
                <a
                  href="${escapeHtml(result.best_url)}"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn btn--primary"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Best Quality
                </a>
              ` : ""}
            </div>
          </div>

          <!-- Format list -->
          ${hasFormats ? `
            <div class="formats-section">
              <h4 class="formats-title">All Available Formats</h4>
              <div class="formats-grid">
                ${videoFormats.length ? `
                  <div class="format-group">
                    <p class="format-group-label">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                      Video
                    </p>
                    ${videoFormats.map(f => renderFormatRow(f)).join("")}
                  </div>
                ` : ""}
                ${audioFormats.length ? `
                  <div class="format-group">
                    <p class="format-group-label">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
                      </svg>
                      Audio
                    </p>
                    ${audioFormats.map(f => renderFormatRow(f)).join("")}
                  </div>
                ` : ""}
              </div>
            </div>
          ` : ""}

        </div>

        <button id="new-download-btn" class="btn btn--ghost new-download-btn">
          ↩ Download another
        </button>
      </section>
    `;
  }

  return "";
}

/** Single format download row */
function renderFormatRow(format) {
  return `
    <a
      href="${escapeHtml(format.url)}"
      download
      target="_blank"
      rel="noopener noreferrer"
      class="format-row"
      title="Download ${escapeHtml(format.quality)} ${escapeHtml(format.ext)}"
    >
      <span class="format-quality">${escapeHtml(format.quality)}</span>
      <span class="format-ext">.${escapeHtml(format.ext)}</span>
      <span class="format-dl-icon" aria-hidden="true">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
      </span>
    </a>
  `;
}

/** Basic XSS protection */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
