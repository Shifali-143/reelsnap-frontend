/**
 * src/types/index.js
 * ───────────────────
 * Centralised schema definitions (JSDoc types).
 * Since we're using plain JS, these are documentation-only
 * but keep the team aligned on data shapes.
 *
 * @typedef {Object} DownloadFormat
 * @property {string} url        - Direct CDN URL
 * @property {string} quality    - e.g. "720p", "128kbps"
 * @property {string} ext        - File extension: "mp4", "m4a"
 * @property {string} type       - "video" | "audio"
 *
 * @typedef {Object} MediaResult
 * @property {string}           title
 * @property {string|null}      thumbnail
 * @property {number|null}      duration
 * @property {string|null}      uploader
 * @property {string}           best_url
 * @property {DownloadFormat[]} formats
 *
 * @typedef {Object} ApiResponse
 * @property {boolean}          success
 * @property {string}           message
 * @property {MediaResult|null} data
 * @property {string|null}      error
 *
 * @typedef {"reel"|"audio"|"story"} DownloadType
 *
 * @typedef {"idle"|"loading"|"success"|"error"} AppState
 */

export const DOWNLOAD_TYPES = {
  REEL:  "reel",
  AUDIO: "audio",
  STORY: "story",
};

export const APP_STATES = {
  IDLE:    "idle",
  LOADING: "loading",
  SUCCESS: "success",
  ERROR:   "error",
};
