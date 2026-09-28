/**
 * src/components/FAQ.js
 * ──────────────────────
 * FAQ accordion — critical for SEO ranking.
 * Google uses FAQ content to rank tool sites higher.
 */

const FAQS = [
  {
    q: "Is ReelSnap free to use?",
    a: "Yes, ReelSnap is completely free. No subscription, no account, no hidden charges.",
  },
  {
    q: "Do downloaded videos have a watermark?",
    a: "No. Instagram's watermark is an app overlay, not part of the video file. ReelSnap downloads the original video file — completely watermark-free.",
  },
  {
    q: "Can I download Instagram Stories?",
    a: "Yes! Switch to the 'Stories' tab, paste the story link, and download. Note: stories must be public or you must be following the account.",
  },
  {
    q: "Can I extract audio from an Instagram Reel?",
    a: "Absolutely. Switch to 'Audio Only' tab, paste the reel link, and download the audio track as an audio file.",
  },
  {
    q: "Does ReelSnap work on iPhone and Android?",
    a: "Yes, ReelSnap works on all devices including iPhone, Android, Windows, and Mac — no app installation required.",
  },
  {
    q: "Do I need to create an account or login?",
    a: "No login or account needed. Just paste the Instagram link and download instantly.",
  },
  {
    q: "Why is my download not working?",
    a: "Make sure the Instagram account is public. Private accounts require login credentials which we don't support for privacy reasons. Also check that you're pasting the full Instagram link.",
  },
];

export function renderFAQ() {
  return `
    <section class="faq-section" aria-labelledby="faq-heading">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" id="faq-heading">Frequently Asked Questions</h2>
          <p class="section-subtitle">Everything you need to know about ReelSnap</p>
        </div>
        <div class="faq-list" role="list">
          ${FAQS.map((faq, i) => `
            <div class="faq-item" role="listitem">
              <button
                class="faq-question"
                aria-expanded="false"
                aria-controls="faq-answer-${i}"
                id="faq-btn-${i}"
              >
                <span>${faq.q}</span>
                <span class="faq-chevron" aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </span>
              </button>
              <div
                class="faq-answer"
                id="faq-answer-${i}"
                role="region"
                aria-labelledby="faq-btn-${i}"
                hidden
              >
                <p>${faq.a}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}

/** Attach accordion toggle behaviour */
export function initFAQ() {
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const expanded = btn.getAttribute("aria-expanded") === "true";
      const answer   = document.getElementById(btn.getAttribute("aria-controls"));

      btn.setAttribute("aria-expanded", String(!expanded));
      btn.classList.toggle("faq-question--open", !expanded);

      if (expanded) {
        answer.hidden = true;
      } else {
        answer.hidden = false;
      }
    });
  });
}
