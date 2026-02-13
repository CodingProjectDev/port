// ============================================
// CONTACT FORM - Handle form submission
// Works for both desktop and mobile forms
// ============================================

// Use event delegation to handle both static and dynamically created forms
document.addEventListener('submit', async function(e) {
  // Check if the submitted form is a contact form
  if (e.target.id !== 'contactForm' && e.target.id !== 'contactFormMobile') {
    return;
  }
  
  e.preventDefault();
  
  const form = e.target;
  const formId = form.id;
  const messageId = formId === 'contactForm' ? 'formMessage' : 'formMessageMobile';
  const formMessage = document.getElementById(messageId);
  
  const nameEl    = form.querySelector('#fullName, #fullNameMobile');
  const emailEl   = form.querySelector('#email, #emailMobile');
  const msgEl     = form.querySelector('#message, #messageMobile');
  const submitBtn = form.querySelector('input[type="submit"]');
  
  if (!nameEl || !emailEl || !msgEl) {
    console.error('Form fields not found');
    return;
  }
  
  const formData = {
    name:    nameEl.value.trim(),
    email:   emailEl.value.trim(),
    message: msgEl.value.trim()
  };
  
  // Validate fields
  if (!formData.name || !formData.email || !formData.message) {
    showFormMsg(formMessage, 'Please fill in all fields.', 'error');
    return;
  }
  
  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    showFormMsg(formMessage, 'Please enter a valid email address.', 'error');
    return;
  }
  
  const originalValue = submitBtn.value;
  submitBtn.value    = 'Sending…';
  submitBtn.disabled = true;
  
  try {
    await sendEmailViaFormSubmit(formData);
    showFormMsg(formMessage, 'Thank you! Your message has been sent.', 'success');
    if (typeof showToast === 'function') showToast('Message sent!', 'success');
    form.reset();
  } catch (err) {
    console.error('Contact form error:', err);
    showFormMsg(formMessage, 'Something went wrong. Please try again.', 'error');
    if (typeof showToast === 'function') {
      showToast('Failed to send message.', 'error');
    } else {
      alert('Failed to send message. Please try again.');
    }
  } finally {
    submitBtn.value    = originalValue;
    submitBtn.disabled = false;
  }
});

// Send via FormSubmit (free, no backend needed)
async function sendEmailViaFormSubmit(data) {
  const res = await fetch('https://formsubmit.co/ajax/yteasycode@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      name:     data.name,
      email:    data.email,
      message:  data.message,
      _subject: `New Portfolio Contact from ${data.name}`,
      _template: 'table'
    })
  });
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error('FormSubmit error:', errorText);
    throw new Error(`HTTP ${res.status}: ${errorText}`);
  }
  
  return res.json();
}

function showFormMsg(el, text, type) {
  if (!el) {
    console.warn('Form message element not found');
    return;
  }
  el.textContent  = text;
  el.className    = `form-message ${type}`;
  clearTimeout(el._timer);
  el._timer = setTimeout(() => { 
    el.className = 'form-message'; 
    el.textContent = ''; 
  }, 5000);
}
