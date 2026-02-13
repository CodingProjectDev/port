// ============================================
// PAGE NAVIGATION - Handles book page turning
// Only applies to desktop book layout
// ============================================

document.addEventListener('DOMContentLoaded', function () {

  // ---- Next / Prev arrows ----
  const pageTurnBtns = document.querySelectorAll('.nextprev-btn');

  pageTurnBtns.forEach((el, index) => {
    el.addEventListener('click', function () {
      const pageId  = this.getAttribute('data-page');
      const pageTurn = document.getElementById(pageId);
      if (!pageTurn) return;

      if (pageTurn.classList.contains('turn')) {
        pageTurn.classList.remove('turn');
        setTimeout(() => { pageTurn.style.zIndex = String(20 - index); }, 500);
      } else {
        pageTurn.classList.add('turn');
        setTimeout(() => { pageTurn.style.zIndex = String(20 + index); }, 500);
      }
    });
  });

  // ---- "Contact Me" button — flip all pages to contact page ----
  const contactMeBtn = document.querySelector('.btn.contact-me');
  if (contactMeBtn) {
    contactMeBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const rightPages = document.querySelectorAll('.book-page.page-right');
      rightPages.forEach((page, index) => {
        setTimeout(() => {
          page.classList.add('turn');
          setTimeout(() => { page.style.zIndex = String(20 + index); }, 500);
        }, (index + 1) * 200 + 100);
      });
    });
  }

  // ---- "Back to Profile" button — unflip all pages ----
  const backProfileBtn = document.querySelector('.back-profile');
  if (backProfileBtn) {
    backProfileBtn.addEventListener('click', function (e) {
      e.preventDefault();
      const rightPages  = document.querySelectorAll('.book-page.page-right');
      const total       = rightPages.length;
      let pageNumber    = 0;

      function reverseIndex() {
        pageNumber--;
        if (pageNumber < 0) pageNumber = total - 1;
      }

      rightPages.forEach((_, index) => {
        setTimeout(() => {
          reverseIndex();
          rightPages[pageNumber].classList.remove('turn');
          setTimeout(() => {
            reverseIndex();
            rightPages[pageNumber].style.zIndex = String(10 + index);
          }, 500);
        }, (index + 1) * 200 + 100);
      });
    });
  }
});