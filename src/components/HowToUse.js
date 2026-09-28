/**
 * src/components/HowToUse.js
 * ───────────────────────────
 * Static "How to use" section — good for SEO.
 */

export function renderHowToUse() {
  const steps = [
    {
      num: "01",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
               <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
               <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
             </svg>`,
      title: "Copy the Instagram Link",
      desc:  "Open Instagram, find the Reel, Story or video you want, tap Share → Copy Link.",
    },
    {
      num: "02",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
               <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
             </svg>`,
      title: "Paste the Link Here",
      desc:  "Come back here, paste the copied link into the input box above.",
    },
    {
      num: "03",
      icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
               <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
               <polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
             </svg>`,
      title: "Click Download",
      desc:  "Hit the Download button, choose your quality, and save the file — no watermark!",
    },
  ];

  return `
    <section class="how-to-section" aria-labelledby="how-to-heading">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" id="how-to-heading">How to Download Instagram Reels</h2>
          <p class="section-subtitle">3 simple steps — done in under 10 seconds</p>
        </div>
        <div class="steps-grid">
          ${steps.map(s => `
            <div class="step-card">
              <div class="step-number">${s.num}</div>
              <div class="step-icon-wrap" aria-hidden="true">${s.icon}</div>
              <h3 class="step-title">${s.title}</h3>
              <p class="step-desc">${s.desc}</p>
            </div>
          `).join("")}
        </div>
      </div>
    </section>
  `;
}
