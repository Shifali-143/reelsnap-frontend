/**
 * src/app.js
 * ───────────
 * Application entry point.
 * Mounts all components, wires up events, orchestrates state.
 * Pages/components stay small — business logic lives in hooks.
 */

import { initTheme, toggleTheme } from "./utils/theme.js";
import { validateInstagramUrl }   from "./utils/validators.js";
import { createDownloader }       from "./hooks/useDownloader.js";
import { DOWNLOAD_TYPES, APP_STATES } from "./types/index.js";

import { renderNavbar }       from "./components/Navbar.js";
import { renderDownloadForm } from "./components/DownloadForm.js";
import { renderResultCard }   from "./components/ResultCard.js";
import { renderHowToUse }     from "./components/HowToUse.js";
import { renderFAQ, initFAQ } from "./components/FAQ.js";
import { renderFooter }       from "./components/Footer.js";

// ── Config ──────────────────────────────────────────────────────────────────
const SITE_NAME = window.__ENV__?.REELSNAP_SITE_NAME || "ReelSnap";

// ── State ───────────────────────────────────────────────────────────────────
let activeType = DOWNLOAD_TYPES.REEL;

// ── Mount static layout ─────────────────────────────────────────────────────
function mountLayout() {
  document.getElementById("app-navbar").innerHTML  = renderNavbar(SITE_NAME);
  document.getElementById("app-hero").innerHTML    = renderDownloadForm();
  document.getElementById("app-howto").innerHTML   = renderHowToUse();
  document.getElementById("app-faq").innerHTML     = renderFAQ();
  document.getElementById("app-footer").innerHTML  = renderFooter(SITE_NAME);
  document.title = `${SITE_NAME} — Free Instagram Reels Downloader`;
}

// ── Result section re-render ────────────────────────────────────────────────
function renderResult(state) {
  const el = document.getElementById("app-result");
  if (!el) return;
  el.innerHTML = renderResultCard(state.appState, state.result, state.error);
  wireResultButtons();

  // Scroll result into view smoothly
  if (state.appState !== APP_STATES.IDLE) {
    el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

// ── Downloader hook ─────────────────────────────────────────────────────────
const downloader = createDownloader((state) => {
  renderResult(state);
  updateDownloadButton(state.appState);
});

// ── Event wiring ─────────────────────────────────────────────────────────────

function wireApp() {
  // Theme toggle
  document.addEventListener("click", (e) => {
    if (e.target.closest("#theme-toggle")) {
      toggleTheme();
      updateThemeIcon();
    }
  });

  // Tab switching
  document.addEventListener("click", (e) => {
    const tab = e.target.closest(".tab");
    if (!tab) return;
    const type = tab.dataset.type;
    if (!type) return;

    activeType = type;

    document.querySelectorAll(".tab").forEach(t => {
      t.classList.toggle("tab--active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });

    // Update placeholder
    const placeholders = {
      [DOWNLOAD_TYPES.REEL]:  "Paste Instagram Reel link here…",
      [DOWNLOAD_TYPES.AUDIO]: "Paste Instagram Reel link (audio will be extracted)…",
      [DOWNLOAD_TYPES.STORY]: "Paste Instagram Story link here…",
    };
    const input = document.getElementById("url-input");
    if (input) input.placeholder = placeholders[type] || "Paste Instagram link here…";
  });

  // Input — show/hide clear button + live validation
  document.addEventListener("input", (e) => {
    if (e.target.id !== "url-input") return;
    const val = e.target.value.trim();
    const clearBtn = document.getElementById("clear-btn");
    if (clearBtn) clearBtn.classList.toggle("hidden", !val);
    clearError();
  });

  // Paste shortcut — auto-submit on paste
  document.addEventListener("paste", (e) => {
    if (e.target.id !== "url-input") return;
    // Let the browser paste first, then validate
    setTimeout(() => {
      const val = document.getElementById("url-input")?.value?.trim();
      if (val) clearError();
    }, 50);
  });

  // Clear button
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#clear-btn")) return;
    const input = document.getElementById("url-input");
    if (input) { input.value = ""; input.focus(); }
    document.getElementById("clear-btn")?.classList.add("hidden");
    clearError();
    downloader.reset();
    renderResult({ appState: APP_STATES.IDLE, result: null, error: null });
  });

  // Download button
  document.addEventListener("click", (e) => {
    if (!e.target.closest("#download-btn")) return;
    handleSubmit();
  });

  // Enter key in input
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && e.target.id === "url-input") handleSubmit();
  });
}

function wireResultButtons() {
  // Retry button
  document.getElementById("retry-btn")?.addEventListener("click", () => {
    const url = document.getElementById("url-input")?.value?.trim();
    if (url) handleSubmit();
    else downloader.reset();
  });

  // New download button
  document.getElementById("new-download-btn")?.addEventListener("click", () => {
    const input = document.getElementById("url-input");
    if (input) { input.value = ""; input.focus(); }
    document.getElementById("clear-btn")?.classList.add("hidden");
    downloader.reset();
    renderResult({ appState: APP_STATES.IDLE, result: null, error: null });
  });
}

// ── Submit logic ─────────────────────────────────────────────────────────────

async function handleSubmit() {
  const input = document.getElementById("url-input");
  const url   = input?.value?.trim() || "";

  const { valid, message } = validateInstagramUrl(url);
  if (!valid) {
    showError(message);
    input?.focus();
    return;
  }

  clearError();
  await downloader.submit(url, activeType);
}

// ── UI helpers ───────────────────────────────────────────────────────────────

function showError(msg) {
  const el = document.getElementById("url-error");
  const wrapper = document.getElementById("input-wrapper");
  if (el) { el.textContent = msg; el.classList.remove("hidden"); }
  if (wrapper) wrapper.classList.add("input-wrapper--error");
}

function clearError() {
  const el = document.getElementById("url-error");
  const wrapper = document.getElementById("input-wrapper");
  if (el) { el.textContent = ""; el.classList.add("hidden"); }
  if (wrapper) wrapper.classList.remove("input-wrapper--error");
}

function updateDownloadButton(appState) {
  const btn  = document.getElementById("download-btn");
  const text = document.getElementById("download-btn-text");
  if (!btn || !text) return;

  const isLoading = appState === APP_STATES.LOADING;
  btn.disabled = isLoading;
  btn.classList.toggle("btn--loading", isLoading);

  if (isLoading) {
    text.textContent = "Fetching…";
  } else {
    text.textContent = "Download";
  }
}

function updateThemeIcon() {
  const saved = document.documentElement.getAttribute("data-theme");
  const darkIcon  = document.querySelector(".theme-icon--dark");
  const lightIcon = document.querySelector(".theme-icon--light");
  if (!darkIcon || !lightIcon) return;
  darkIcon.style.display  = saved === "dark"  ? "flex" : "none";
  lightIcon.style.display = saved === "light" ? "flex" : "none";
}

// ── Boot ─────────────────────────────────────────────────────────────────────

function boot() {
  initTheme();
  mountLayout();
  wireApp();
  initFAQ();
  updateThemeIcon();
}

// Run when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
