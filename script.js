const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('#mobileNav');
const navLinks = document.querySelectorAll('a[href^="#"]');
const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
const form = document.querySelector('#contactForm');
const formMessage = document.querySelector('#formMessage');

menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.textContent = isOpen ? '✕' : '☰';
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileNav?.classList.contains('open')) {
      mobileNav.classList.remove('open');
      menuButton?.setAttribute('aria-expanded', 'false');
      if (menuButton) menuButton.textContent = '☰';
    }
  });
});

const observedSections = [...document.querySelectorAll('main section[id]')];
const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

  if (!visible) return;
  desktopNavLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`);
  });
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });

observedSections.forEach((section) => observer.observe(section));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const name = document.querySelector('#name').value.trim();
  formMessage.textContent = `Thank you${name ? `, ${name}` : ''}! Your message was received by this demo form.`;
  form.reset();
});

document.querySelectorAll('.asset-image').forEach((img) => {
  img.addEventListener('error', () => {
    const fallback = document.createElement('div');
    fallback.className = 'asset-fallback';
    fallback.textContent = img.dataset.fallback || 'IMAGE';
    img.replaceWith(fallback);
  }, { once: true });
});
