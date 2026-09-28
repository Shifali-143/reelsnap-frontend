/**
 * src/utils/theme.js
 * ───────────────────
 * Theme management — dark / light mode.
 * Persists user preference to localStorage.
 */

const STORAGE_KEY = "reelsnap_theme";
const DARK  = "dark";
const LIGHT = "light";

/** Read saved theme or default to dark. */
export function getSavedTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY) || DARK;
  } catch {
    return DARK;
  }
}

/** Apply theme to <html> element and save preference. */
export function applyTheme(theme) {
  const root = document.documentElement;
  root.setAttribute("data-theme", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch { /* ignore */ }
}

/** Toggle between dark and light and return the new value. */
export function toggleTheme() {
  const current = getSavedTheme();
  const next = current === DARK ? LIGHT : DARK;
  applyTheme(next);
  return next;
}

/** Initialise theme on page load (call once). */
export function initTheme() {
  applyTheme(getSavedTheme());
}
