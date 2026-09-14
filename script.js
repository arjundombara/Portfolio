/**
 * Arjun Dombara - Portfolio Interactive Scripts
 * Pure vanilla JavaScript with no external dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // DOM Elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.getElementById('backToTop');
  
  // Project Modal Elements
  const projectModal = document.getElementById('projectModal');
  const btnViewProject = document.getElementById('btnViewProject');
  const btnProjectGithub = document.getElementById('btnProjectGithub');
  const modalClose = document.getElementById('modalClose');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  // Contact Form Elements
  const contactForm = document.getElementById('contactForm');
  const contactName = document.getElementById('contactName');
  const contactEmail = document.getElementById('contactEmail');
  const contactMessage = document.getElementById('contactMessage');
  const formSuccessBox = document.getElementById('formSuccessBox');
  const btnResetForm = document.getElementById('btnResetForm');

  // Toast Element
  const toastNotification = document.getElementById('toastNotification');
  const toastMessage = document.getElementById('toastMessage');

  /* ------------------------------------------------------------------------
     1. NAVBAR SCROLL EFFECT
     ------------------------------------------------------------------------ */
  const handleNavbarScroll = () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  };

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check

  /* ------------------------------------------------------------------------
     2. MOBILE MENU TOGGLE
     ------------------------------------------------------------------------ */
  const toggleMobileMenu = () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  };

  const closeMobileMenu = () => {
    navMenu.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (navToggle) {
    navToggle.addEventListener('click', toggleMobileMenu);
  }

  // Close mobile menu when clicking any nav link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (navMenu.classList.contains('open') && !navMenu.contains(e.target) && !navToggle.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ------------------------------------------------------------------------
     3. ACTIVE NAVIGATION LINK ON SCROLL (SCROLLSPY)
     ------------------------------------------------------------------------ */
  const sections = document.querySelectorAll('section[id]');

  const updateActiveNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  /* ------------------------------------------------------------------------
     4. BACK TO TOP BUTTON
     ------------------------------------------------------------------------ */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ------------------------------------------------------------------------
     5. TOAST NOTIFICATION HELPER
     ------------------------------------------------------------------------ */
  let toastTimeout;
  const showToast = (message, duration = 3500) => {
    if (!toastNotification || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotification.classList.add('show');

    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, duration);
  };

  /* ------------------------------------------------------------------------
     6. PROJECT MODAL HANDLER
     ------------------------------------------------------------------------ */
  const openProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeProjectModal = () => {
    if (!projectModal) return;
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (btnViewProject) {
    btnViewProject.addEventListener('click', openProjectModal);
  }

  if (btnProjectGithub) {
    btnProjectGithub.addEventListener('click', () => {
      showToast('Opening GitHub repository profile...');
      window.open('https://github.com/arjundombara', '_blank', 'noopener,noreferrer');
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeProjectModal);

  // Close modal on backdrop click
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });
  }

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
      closeProjectModal();
    }
  });

  /* ------------------------------------------------------------------------
     7. CONTACT FORM VALIDATION & INTERACTIVITY
     ------------------------------------------------------------------------ */
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      const nameVal = contactName.value.trim();
      const nameGroup = contactName.closest('.form-group');
      if (!nameVal) {
        nameGroup.classList.add('has-error');
        isValid = false;
      } else {
        nameGroup.classList.remove('has-error');
      }

      // Validate Email
      const emailVal = contactEmail.value.trim();
      const emailGroup = contactEmail.closest('.form-group');
      if (!emailVal || !validateEmail(emailVal)) {
        emailGroup.classList.add('has-error');
        isValid = false;
      } else {
        emailGroup.classList.remove('has-error');
      }

      // Validate Message
      const messageVal = contactMessage.value.trim();
      const messageGroup = contactMessage.closest('.form-group');
      if (!messageVal) {
        messageGroup.classList.add('has-error');
        isValid = false;
      } else {
        messageGroup.classList.remove('has-error');
      }

      if (isValid) {
        // Successful submission state
        contactForm.style.display = 'none';
        formSuccessBox.classList.add('show');
        showToast('Message sent successfully! Thank you for connecting.');
      }
    });

    // Remove error class on typing
    [contactName, contactEmail, contactMessage].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          const group = input.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  // Reset form button
  if (btnResetForm) {
    btnResetForm.addEventListener('click', () => {
      if (contactForm) {
        contactForm.reset();
        contactForm.style.display = 'flex';
      }
      if (formSuccessBox) {
        formSuccessBox.classList.remove('show');
      }
    });
  }

  /* ------------------------------------------------------------------------
     8. CONSOLE WELCOME GREETING
     ------------------------------------------------------------------------ */
  console.log(
    '%c Arjun Dombara %c Portfolio Website Loaded Successfully ',
    'background: #38bdf8; color: #080c14; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;',
    'background: #1e293b; color: #f8fafc; padding: 4px 8px; border-radius: 0 4px 4px 0;'
  );
});
