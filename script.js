// ── Sticky nav ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ── Scroll-in animations ──
const fadeEls = document.querySelectorAll(
  '.research-card, .project-card, .hobby-item, .photo-item, .contact-item, .contact-form'
);
fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  fadeObserver.observe(el);
});

// ── Mobile hamburger ──
const hamburger = document.querySelector('.hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');
});

navLinksList.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinksList.classList.remove('open'));
});

// ── Contact form ──
function handleSubmit(e) {
  e.preventDefault();
  const note = document.getElementById('form-note');
  const btn  = e.target.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';

  setTimeout(() => {
    note.textContent = 'Message sent — thanks! I\'ll be in touch soon.';
    e.target.reset();
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }, 1200);
}
