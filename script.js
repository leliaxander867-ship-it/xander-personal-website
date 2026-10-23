document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('#mobileNav');
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const form = document.querySelector('#contactForm');
  const formMessage = document.querySelector('#formMessage');

  function closeMobileMenu() {
    if (!mobileNav || !menuButton) return;
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open navigation');
    menuButton.textContent = '☰';
  }

  if (menuButton && mobileNav) {
    menuButton.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', String(isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      menuButton.textContent = isOpen ? '✕' : '☰';
    });
  }

  // Explicit smooth scrolling makes every internal button/link work the same way.
  internalLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      closeMobileMenu();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.replaceState(null, '', href);
    });
  });

  // Active desktop navigation. It has a fallback when IntersectionObserver is unavailable.
  const observedSections = [...document.querySelectorAll('main section[id]')];
  function setActiveNav(id) {
    desktopNavLinks.forEach((link) => {
      link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
    });
  }

  if ('IntersectionObserver' in window && observedSections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] });
    observedSections.forEach((section) => observer.observe(section));
  } else {
    window.addEventListener('scroll', () => {
      let current = 'home';
      observedSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= 140) current = section.id;
      });
      setActiveNav(current);
    }, { passive: true });
  }

  // Demo form required by the laboratory manual.
  if (form && formMessage) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      formMessage.textContent = '';

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nameField = form.querySelector('#name');
      const name = nameField ? nameField.value.trim() : '';
      formMessage.textContent = `Thank you${name ? `, ${name}` : ''}! Your message was received by this demo form.`;
      form.reset();
    });
  }

  // Project detail modal so the project CTAs are real interactions instead of dead links.
  const modal = document.querySelector('#projectModal');
  const modalTitle = document.querySelector('#projectModalTitle');
  const modalKicker = document.querySelector('#projectModalKicker');
  const modalText = document.querySelector('#projectModalText');
  const modalContact = document.querySelector('#projectModalContact');
  const projectButtons = document.querySelectorAll('.project-link[data-project]');

  const projects = {
    healthcore: {
      kicker: 'VIDEO EDITING · VOLUNTEER PROJECT',
      title: 'HealthCore Promotional Video',
      text: 'A promotional video I created during my work immersion experience for HealthCore Clinics and Diagnostics. The project helped me practice editing, visual storytelling, and presenting information clearly.'
    },
    pjyc: {
      kicker: 'VIDEO PRODUCTION · CHURCH / VOLUNTEER',
      title: 'Passionist Jubilee Youth Camp',
      text: 'Creative promotional content produced for a youth camp event. I worked with event-focused visuals and video content designed to communicate the energy and purpose of the activity.'
    },
    student: {
      kicker: 'DESIGN · VIDEO · ACADEMIC WORK',
      title: 'Student Creative Projects',
      text: 'A collection of school and student-organization creative work, including video editing, graphics, and event-related content.'
    }
  };

  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const data = projects[button.dataset.project];
      if (!data || !modal || !modalTitle || !modalKicker || !modalText) return;
      modalKicker.textContent = data.kicker;
      modalTitle.textContent = data.title;
      modalText.textContent = data.text;
      modal.hidden = false;
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      modal.querySelector('.modal-close')?.focus();
    });
  });

  modal?.querySelectorAll('[data-close-modal]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  modalContact?.addEventListener('click', closeModal);
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && !modal.hidden) closeModal();
  });

  // If a temporary design asset ever expires, show an intentional placeholder instead of a broken icon.
  document.querySelectorAll('.asset-image').forEach((img) => {
    img.addEventListener('error', () => {
      const fallback = document.createElement('div');
      fallback.className = 'asset-fallback';
      fallback.textContent = img.dataset.fallback || 'IMAGE';
      img.replaceWith(fallback);
    }, { once: true });
  });
});
