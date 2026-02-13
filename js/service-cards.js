// ============================================
// SERVICE CARDS - Flip card interactions (desktop)
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // Desktop flip cards
  document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = this.closest('.service-card');
      if (card) card.classList.add('flipped');
    });
  });

  document.querySelectorAll('.back-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const card = this.closest('.service-card');
      if (card) card.classList.remove('flipped');
    });
  });

});