/**
 * src/utils/validators.js
 * ────────────────────────
 * Client-side input validation (mirrors backend validators).
 */

const INSTAGRAM_DOMAIN = "instagram.com";
const VALID_PATH_SEGMENTS = ["/reel/", "/p/", "/stories/", "/tv/"];

/**
 * Validate that a string is a recognisable Instagram URL.
 * @param {string} url
 * @returns {{ valid: boolean, message: string }}
 */
export function validateInstagramUrl(url) {
  if (!url || !url.trim()) {
    return { valid: false, message: "Please paste an Instagram link first." };
  }

  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    return { valid: false, message: "That doesn't look like a valid URL." };
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    return { valid: false, message: "URL must start with http:// or https://" };
  }

  if (!parsed.hostname.includes(INSTAGRAM_DOMAIN)) {
    return { valid: false, message: "Only Instagram links are supported." };
  }

  const hasValidPath = VALID_PATH_SEGMENTS.some(seg => parsed.pathname.includes(seg));
  if (!hasValidPath) {
    return {
      valid: false,
      message: "Paste a Reel, Post, or Story link (e.g. instagram.com/reel/...).",
    };
  }

  return { valid: true, message: "" };
}

/**
 * Format seconds into mm:ss display string.
 * @param {number|null} seconds
 * @returns {string}
 */
export function formatDuration(seconds) {
  if (!seconds) return "";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
