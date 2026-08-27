/* ============================================================
   AYUR VEDA - JavaScript Functionality
   - Banner Slider
   - Carousels (Appreciations)
   - Mobile Navigation
   - FAQ Accordion
   - Contact Form
   - Smooth Scroll / Active Nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ============================================================
     HERO BANNER SLIDER (TribalDr-style)
     ============================================================ */
  var heroSlider = document.getElementById('heroSlider');
  var heroDots = document.getElementById('heroDots');

  if (heroSlider) {
    var slides = heroSlider.querySelectorAll('.slide');
    var current = 0;
    var heroTimer = null;
    var dots = [];

    // Slider logic (dots/timer/arrows) only needed when there are multiple slides
    if (slides.length > 1) {
      // Build navigation dots
      for (var i = 0; i < slides.length; i++) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        (function (idx) {
          dot.addEventListener('click', function () {
            goToSlide(idx);
            restartHeroTimer();
          });
        })(i);
        heroDots.appendChild(dot);
        dots.push(dot);
      }

      function goToSlide(idx) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (idx + slides.length) % slides.length;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
      }

      function restartHeroTimer() {
        clearInterval(heroTimer);
        heroTimer = setInterval(function () {
          goToSlide(current + 1);
        }, 5000);
      }

      restartHeroTimer();
    }
  }

  /* ============================================================
     APPRECIATIONS CAROUSEL
     ============================================================ */
  var appTrack = document.getElementById('appTrack');

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  var mobileMenuToggle = document.getElementById('mobileMenuToggle');
  var mainNav = document.getElementById('mainNav');
  let menuOverlay = null;

  if (mobileMenuToggle && mainNav) {
    // Create overlay for mobile menu.
    // NOTE: z-index must be LOWER than the sticky .nav-bar (1000) because the
    // slide-out .main-nav is nested inside the nav-bar stacking context.
    // At the same z-index the overlay paints later and blocks all taps on
    // the mobile menu links.
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:998;opacity:0;visibility:hidden;transition:all 0.3s ease;';
    document.body.appendChild(menuOverlay);

    mobileMenuToggle.addEventListener('click', function () {
      this.classList.toggle('active');
      mainNav.classList.toggle('open');
      var isOpen = mainNav.classList.contains('open');
      menuOverlay.style.opacity = isOpen ? '1' : '0';
      menuOverlay.style.visibility = isOpen ? 'visible' : 'hidden';
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function () {
      mobileMenuToggle.classList.remove('active');
      mainNav.classList.remove('open');
      menuOverlay.style.opacity = '0';
      menuOverlay.style.visibility = 'hidden';
    });

    // Close menu when clicking a nav link
    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mobileMenuToggle.classList.remove('active');
        mainNav.classList.remove('open');
        menuOverlay.style.opacity = '0';
        menuOverlay.style.visibility = 'hidden';
      });
    });
  }

  /* ============================================================
     FAQ ACCORDION
     ============================================================ */
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (!question) return; // skip malformed items

    question.addEventListener('click', function () {
      // Close other items
      var isActive = item.classList.contains('active');

      faqItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
      });

      // Toggle clicked item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  /* ============================================================
     MEDICINES - TREATMENT DETAIL ACCORDION
     ============================================================ */
  var medItems = document.querySelectorAll('.med-item');

  medItems.forEach(function (item) {
    var head = item.querySelector('.med-item-head');
    if (!head) return; // skip malformed cards instead of breaking all bindings

    // Reflect initial open/closed state for screen readers
    head.setAttribute('aria-expanded', item.classList.contains('active') ? 'true' : 'false');

    head.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      // Close every card, then re-open the clicked one (classic accordion)
      medItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
        otherItem.querySelector('.med-item-head').setAttribute('aria-expanded', 'false');
      });

      if (!isActive) {
        item.classList.add('active');
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ============================================================
     CONTACT FORM
     ============================================================ */
  var contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      // Simple validation
      var nameInput = contactForm.querySelector('input[type="text"]');
      var emailInput = contactForm.querySelector('input[type="email"]');
      var messageArea = contactForm.querySelector('textarea');

      if (!nameInput.value.trim()) {
        alert('Please enter your name.');
        nameInput.focus();
        return;
      }

      if (!emailInput.value.trim()) {
        alert('Please enter your email address.');
        emailInput.focus();
        return;
      }

      if (!isValidEmail(emailInput.value)) {
        alert('Please enter a valid email address.');
        emailInput.focus();
        return;
      }

      if (!messageArea.value.trim()) {
        alert('Please enter your message.');
        messageArea.focus();
        return;
      }

      // Show success message
      var submitBtn = contactForm.querySelector('.btn-submit');
      var originalText = submitBtn.textContent;

      submitBtn.textContent = '✓ Message Sent!';
      submitBtn.style.background = '#4da35e';
      submitBtn.disabled = true;

      // Reset form
      contactForm.reset();

      // Restore button after 3 seconds
      setTimeout(function () {
        submitBtn.textContent = originalText;
        submitBtn.style.background = '';
        submitBtn.disabled = false;
      }, 3000);
    });

    function isValidEmail(email) {
      var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  }

  /* ============================================================
     ACTIVE NAVIGATION LINK ON SCROLL
     ============================================================ */
  var sections = document.querySelectorAll('section[id]');
  var navItems = document.querySelectorAll('.main-nav ul li a');

  function updateActiveNav() {
    var scrollPosition = window.scrollY + 100;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navItems.forEach(function (navItem) {
          navItem.classList.remove('active');
          if (navItem.getAttribute('href') === '#' + section.id) {
            navItem.classList.add('active');
          }
        });
      }
    });
  }

  // Update active nav on scroll
  window.addEventListener('scroll', updateActiveNav);
  updateActiveNav();

  /* ============================================================
     FEATURED BADGE ANIMATION (Guruji Seal)
     ============================================================ */
  // The seal uses CSS animation, no JS needed

  /* ============================================================
     FLOATING WHATSAPP BUTTON
     ============================================================ */
  var whatsappFloatBtn = document.createElement('button');
  whatsappFloatBtn.innerHTML = '<svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.264 8.264 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.82 2.42a8.183 8.183 0 0 1 2.41 5.83c.02 4.54-3.68 8.23-8.22 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.16-.48-.29z"/></svg>';
  whatsappFloatBtn.setAttribute('aria-label', 'Chat with us on WhatsApp');
  whatsappFloatBtn.className = 'back-to-top';
  whatsappFloatBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;border-radius:50%;background:#25d366;color:#fff;border:none;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.2);opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:999;display:flex;align-items:center;justify-content:center;padding:10px;';
  document.body.appendChild(whatsappFloatBtn);

  whatsappFloatBtn.addEventListener('click', function () {
    window.open('https://wa.me/919489934444', '_blank', 'noopener');
  });

  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY;
    if (scrollPos > 400) {
      whatsappFloatBtn.style.opacity = '1';
      whatsappFloatBtn.style.visibility = 'visible';
    } else {
      whatsappFloatBtn.style.opacity = '0';
      whatsappFloatBtn.style.visibility = 'hidden';
    }
  });

    /* ============================================================
     NEWS TITLES (click title to reveal/hide image)
     ============================================================ */
  var newsTitles = document.querySelectorAll('.news-title');
  if (newsTitles.length > 0) {
    newsTitles.forEach(function (title) {
      title.style.cursor = 'pointer';
      title.addEventListener('click', function (e) {
        e.stopPropagation();
        var container = this.nextElementSibling;
        if (container && container.classList.contains('news-image-container')) {
          if (container.style.display === 'none') {
            container.style.display = 'block';
          } else {
            container.style.display = 'none';
          }
        }
      });
    });
  }

  /* ============================================================
     LIGHTBOX (testimonial letters + gallery images)
     ============================================================ */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');

  if (lightbox && lightboxImg && lightboxClose) {
    Array.prototype.forEach.call(
      document.querySelectorAll('.card-img-clickable, .gallery-img img'),
      function (el) {
        el.addEventListener('click', function () {
          var full = el.getAttribute('data-full') || el.getAttribute('src');
          if (full) {
            // HTML data opens in a new browser tab (e.g. appreciation letter pages)
            if (/\.html?$/i.test(full)) {
              window.open(full, '_blank');
              return;
            }
            lightboxImg.setAttribute('src', full);
            // Show the photo caption from alt text while zoomed in
            lightboxImg.setAttribute('alt', el.getAttribute('alt') || 'Full size image');
            lightbox.classList.add('open');
            lightbox.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
          }
        });
      });

    function closeLightbox() {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    lightbox.addEventListener('click', closeLightbox);
    lightboxClose.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && lightbox.classList.contains('open')) {
        closeLightbox();
      }
    });
  }

  /* ============================================================
     PHOTO GALLERY PAGINATION
     Stacks all cards in one column; pagination shows 6 per "page".
     ============================================================ */
  var galleryList = document.getElementById('galleryList');
  var galleryPagination = document.getElementById('galleryPagination');

  if (galleryList && galleryPagination) {
    var gCards = Array.prototype.slice.call(galleryList.children); // all <figure> cards
    var PER_PAGE = 6;
    var pageCount = Math.max(1, Math.ceil(gCards.length / PER_PAGE));
    var currentPage = 1;

    function showPage(page) {
      currentPage = Math.max(1, Math.min(page, pageCount));
      gCards.forEach(function (card, idx) {
        var onPage = Math.floor(idx / PER_PAGE) === currentPage - 1;
        card.style.display = onPage ? '' : 'none';
      });
      updatePaginationButtons();
    }

    function makeBtn(label, onClick, extraClass) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'gallery-page-btn' + (extraClass ? ' ' + extraClass : '');
      btn.textContent = label;
      btn.setAttribute('aria-label', 'Go to page ' + label);
      btn.addEventListener('click', onClick);
      return btn;
    }

    function updatePaginationButtons() {
      galleryPagination.innerHTML = '';

      // Prev arrow
      var prev = makeBtn('&#10094;', function () { showPage(currentPage - 1); }, 'gallery-page-arrow');
      prev.dataset.arrow = 'prev';
      prev.setAttribute('aria-label', 'Previous page');
      prev.classList.toggle('disabled', currentPage === 1);
      prev.disabled = (currentPage === 1);
      galleryPagination.appendChild(prev);

      // Numbered square buttons
      for (var p = 1; p <= pageCount; p++) {
        (function (page) {
          var b = makeBtn(String(page), function () { showPage(page); }, 'gallery-page-num');
          if (page === currentPage) b.classList.add('active');
          galleryPagination.appendChild(b);
        })(p);
      }

      // next arrow
      var next = makeBtn('&#10095;', function () { showPage(currentPage + 1); }, 'gallery-page');
      next.dataset.arrow = 'next';
      next.setAttribute('aria-label', 'Next page');
      next.classList.toggle('disabled', currentPage === pageCount);
      next.disabled = (currentPage === pageCount);
      galleryPagination.appendChild(next);
    }

    showPage(1);
  }

});