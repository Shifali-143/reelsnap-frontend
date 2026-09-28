/**
 * src/api/api.js
 * ───────────────
 * Centralised API layer.
 * ALL fetch calls live here — never call fetch() in UI files directly.
 *
 * Usage:
 *   import { downloadReel, downloadAudio, downloadStory, healthCheck } from './api/api.js';
 */

// ── Config ─────────────────────────────────────────────────────────────────
// Read from window.__ENV__ (injected by env.js at runtime) or fall back
const BASE_URL = (window.__ENV__?.REELSNAP_API_BASE_URL || "http://localhost:8000").replace(/\/$/, "");

const ENDPOINTS = {
  health:       `${BASE_URL}/api/health`,
  downloadReel: `${BASE_URL}/api/download/reel`,
  downloadAudio:`${BASE_URL}/api/download/audio`,
  downloadStory:`${BASE_URL}/api/download/story`,
};

// ── Core request helper ────────────────────────────────────────────────────

/**
 * Internal POST helper.
 * @param {string} url
 * @param {Object} body
 * @returns {Promise<import('../types/index.js').ApiResponse>}
 */
async function post(url, body) {
  const response = await fetch(url, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });

  const json = await response.json();

  // Normalise — always return our ApiResponse shape
  if (!response.ok && json.success === undefined) {
    return { success: false, message: `HTTP ${response.status}`, data: null, error: "HTTP_ERROR" };
  }

  return json;
}

// ── Public API functions ───────────────────────────────────────────────────

/**
 * Ping the backend health endpoint.
 * @returns {Promise<boolean>}
 */
export async function healthCheck() {
  try {
    const res = await fetch(ENDPOINTS.health);
    const json = await res.json();
    return json.success === true;
  } catch {
    return false;
  }
}

/**
 * Fetch reel/video download info.
 * @param {string} url - Instagram reel URL
 * @returns {Promise<import('../types/index.js').ApiResponse>}
 */
export async function downloadReel(url) {
  return post(ENDPOINTS.downloadReel, { url });
}

/**
 * Fetch audio-only download info.
 * @param {string} url - Instagram reel URL
 * @returns {Promise<import('../types/index.js').ApiResponse>}
 */
export async function downloadAudio(url) {
  return post(ENDPOINTS.downloadAudio, { url });
}

/**
 * Fetch story/status download info.
 * @param {string} url - Instagram story URL
 * @returns {Promise<import('../types/index.js').ApiResponse>}
 */
export async function downloadStory(url) {
  return post(ENDPOINTS.downloadStory, { url });
}
