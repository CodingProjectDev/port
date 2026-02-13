// ============================================
// SMOOTH SCROLLING - Enhanced scrolling for content areas
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const selectors = [
    '.workeduc-box',
    '.profile-page p',
    '.info-box',
    '.service-details',
    '.skills-box'
  ];

  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      element.addEventListener('wheel', function (e) {
        // Only intercept if the element itself can scroll
        const canScroll = this.scrollHeight > this.clientHeight;
        if (!canScroll) return;

        // Prevent parent scroll bleed
        const atTop    = this.scrollTop === 0 && e.deltaY < 0;
        const atBottom = this.scrollTop + this.clientHeight >= this.scrollHeight && e.deltaY > 0;

        if (!atTop && !atBottom) {
          e.preventDefault();
          e.stopPropagation();
          this.scrollTop += e.deltaY;
        }
      }, { passive: false });
    });
  });
});