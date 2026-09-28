/**
 * src/components/DownloadForm.js
 * ────────────────────────────────
 * Hero section with URL input, type tabs, and download button.
 */

import { DOWNLOAD_TYPES } from "../types/index.js";

export function renderDownloadForm() {
  return `
    <section class="hero" aria-labelledby="hero-heading">
      <div class="container hero__inner">

        <!-- Badge -->
        <div class="hero__badge">
          <span class="badge">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            Free · No Watermark · No Login
          </span>
        </div>

        <!-- Heading -->
        <h1 class="hero__title" id="hero-heading">
          Download Instagram
          <span class="hero__title-highlight">Reels, Stories</span>
          &amp; Audio
        </h1>
        <p class="hero__subtitle">
          Paste any Instagram link below and download in HD — instantly, for free.
        </p>

        <!-- Type Tabs -->
        <div class="tabs" role="tablist" aria-label="Download type">
          <button
            class="tab tab--active"
            role="tab"
            aria-selected="true"
            data-type="${DOWNLOAD_TYPES.REEL}"
            id="tab-reel"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polygon points="5 3 19 12 5 21 5 3"/>
            </svg>
            Reels &amp; Videos
          </button>
          <button
            class="tab"
            role="tab"
            aria-selected="false"
            data-type="${DOWNLOAD_TYPES.AUDIO}"
            id="tab-audio"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>
            </svg>
            Audio Only
          </button>
          <button
            class="tab"
            role="tab"
            aria-selected="false"
            data-type="${DOWNLOAD_TYPES.STORY}"
            id="tab-story"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
            </svg>
            Stories
          </button>
        </div>

        <!-- Input Area -->
        <div class="input-card">
          <div class="input-wrapper" id="input-wrapper">
            <span class="input-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
                <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
              </svg>
            </span>
            <input
              id="url-input"
              type="url"
              class="url-input"
              placeholder="Paste Instagram link here…"
              aria-label="Instagram URL"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
            />
            <button
              id="clear-btn"
              class="clear-btn hidden"
              aria-label="Clear input"
              type="button"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <p class="input-error hidden" id="url-error" role="alert" aria-live="polite"></p>

          <button id="download-btn" class="btn btn--primary btn--lg" type="button">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            <span id="download-btn-text">Download</span>
          </button>
        </div>

      </div>
    </section>
  `;
}
