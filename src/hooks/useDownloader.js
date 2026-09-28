/**
 * src/hooks/useDownloader.js
 * ───────────────────────────
 * Core business logic hook.
 * Manages download state, API calls, and error handling.
 * Pages import this — they never call the API directly.
 *
 * Usage:
 *   const { state, result, error, submit, reset } = useDownloader();
 */

import { downloadReel, downloadAudio, downloadStory } from "../api/api.js";
import { DOWNLOAD_TYPES, APP_STATES } from "../types/index.js";

/**
 * Factory — returns a downloader controller bound to a state object.
 * (Plain JS alternative to React hooks — uses a simple observer pattern.)
 *
 * @param {function} onStateChange - Called whenever state updates: (state) => void
 * @returns {{ submit: function, reset: function, getState: function }}
 */
export function createDownloader(onStateChange) {
  let _state = {
    appState:     APP_STATES.IDLE,   // idle | loading | success | error
    result:       null,              // MediaResult | null
    error:        null,              // string | null
    downloadType: DOWNLOAD_TYPES.REEL,
  };

  function setState(patch) {
    _state = { ..._state, ...patch };
    onStateChange(_state);
  }

  /** Map download type → API function */
  const apiFnMap = {
    [DOWNLOAD_TYPES.REEL]:  downloadReel,
    [DOWNLOAD_TYPES.AUDIO]: downloadAudio,
    [DOWNLOAD_TYPES.STORY]: downloadStory,
  };

  return {
    getState() {
      return { ..._state };
    },

    /**
     * Submit a download request.
     * @param {string} url
     * @param {import('../types/index.js').DownloadType} type
     */
    async submit(url, type = DOWNLOAD_TYPES.REEL) {
      setState({ appState: APP_STATES.LOADING, result: null, error: null, downloadType: type });

      try {
        const apiFn = apiFnMap[type] || downloadReel;
        const response = await apiFn(url);

        if (response.success && response.data) {
          setState({ appState: APP_STATES.SUCCESS, result: response.data });
        } else {
          setState({
            appState: APP_STATES.ERROR,
            error: response.message || "Could not fetch media. Try again.",
          });
        }
      } catch (err) {
        setState({
          appState: APP_STATES.ERROR,
          error: "Network error. Is the backend running?",
        });
      }
    },

    /** Reset back to idle state. */
    reset() {
      setState({ appState: APP_STATES.IDLE, result: null, error: null });
    },
  };
}
