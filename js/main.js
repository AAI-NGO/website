// ============================================================
// Ancient-Advanced India — Core site behavior
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Mobile nav toggle ---- */
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', links.classList.contains('open'));
    });
    links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
  }

  /* ---- Mark active nav link ---- */
  const here = (location.pathname.split('/').pop() || 'index.html');
  document.querySelectorAll('.nav-links a').forEach(a => {
    const target = a.getAttribute('href');
    if (target === here || (here === '' && target === 'index.html')) a.classList.add('active');
  });

  /* ---- Scroll reveal (progressive enhancement — content is visible by default in CSS) ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-stagger');
  if ('IntersectionObserver' in window && revealEls.length) {
    revealEls.forEach(el => el.classList.add('reveal-pending'));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => obs.observe(el));
  }

  /* ---- Ticker: duplicate content for seamless loop ---- */
  const track = document.querySelector('.ticker-track');
  if (track && !track.dataset.cloned) {
    track.innerHTML += track.innerHTML;
    track.dataset.cloned = 'true';
  }

  /* ---- Year in footer ---- */
  document.querySelectorAll('.cur-year').forEach(el => el.textContent = new Date().getFullYear());

  /* ---- Contact form: submit to Formspree via fetch, show real success/error state ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const submitBtn = document.getElementById('formSubmitBtn');
      const successMsg = document.getElementById('formSuccess');
      const errorMsg = document.getElementById('formError');
      const emailField = document.getElementById('email');

      // Mirror the visitor's email into _replyto so replies go to the right place
      const replyToField = contactForm.querySelector('input[name="_replyto"]');
      if (replyToField && emailField) replyToField.value = emailField.value;

      if (successMsg) successMsg.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending…'; }

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            if (successMsg) successMsg.style.display = 'block';
            contactForm.reset();
          } else {
            if (errorMsg) errorMsg.style.display = 'block';
          }
        })
        .catch(function () {
          if (errorMsg) errorMsg.style.display = 'block';
        })
        .finally(function () {
          if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Send message'; }
        });
    });
  }
});
