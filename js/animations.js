// ============================================
// OPENING ANIMATIONS - Portfolio book opening sequence
// Only runs on desktop (book is hidden on mobile via CSS)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const coverRight = document.querySelector('.cover.cover-right');
  const pageLeft   = document.querySelector('.book-page.page-left');
  const pages      = document.querySelectorAll('.book-page.page-right');

  // Bail out gracefully if elements are missing (e.g. on mobile)
  if (!coverRight || !pageLeft || !pages.length) return;

  let totalPages = pages.length;
  let pageNumber = 0;

  function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) pageNumber = totalPages - 1;
  }

  // Open front cover
  setTimeout(() => { coverRight.classList.add('turn'); }, 2100);

  setTimeout(() => { coverRight.style.zIndex = '-1'; }, 2800);

  // Reveal profile page (left side)
  setTimeout(() => { pageLeft.style.zIndex = '20'; }, 3200);

  // Unfurl all right pages from back to front
  pages.forEach((_, index) => {
    setTimeout(() => {
      reverseIndex();
      pages[pageNumber].classList.remove('turn');

      setTimeout(() => {
        reverseIndex();
        pages[pageNumber].style.zIndex = String(10 + index);
      }, 500);

    }, (index + 1) * 200 + 2100);
  });
});