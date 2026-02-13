// ============================================
// NOTIFICATIONS - Toast notification system
// ============================================

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');

  if (!toast || !toastMessage) return;

  toastMessage.textContent = message;
  toast.className = `toast ${type} show`;

  // Update icon based on type
  const icon = toast.querySelector('i');
  if (icon) {
    icon.className = type === 'success' ? 'bx bx-check-circle' : 'bx bx-error-circle';
  }

  clearTimeout(toast._hideTimer);
  toast._hideTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}