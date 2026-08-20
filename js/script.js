/* ============================================================
   AYUR VEDA - JavaScript Functionality
   - Banner Slider
   - Carousels (Appreciations & Personalities)
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
  var heroPrev = document.getElementById('heroPrev');
  var heroNext = document.getElementById('heroNext');
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

      if (heroPrev) {
        heroPrev.addEventListener('click', function () {
          goToSlide(current - 1);
          restartHeroTimer();
        });
      }
      if (heroNext) {
        heroNext.addEventListener('click', function () {
          goToSlide(current + 1);
          restartHeroTimer();
        });
      }

      restartHeroTimer();
    }
  }

  /* ============================================================
     APPRECIATIONS CAROUSEL
     ============================================================ */
  var appTrack = document.getElementById('appTrack');
  var appPrev = document.getElementById('appPrev');
  var appNext = document.getElementById('appNext');

  if (appTrack && appPrev && appNext) {
    var scrollAmount = 280; // ~ card width + gap

    appPrev.addEventListener('click', function () {
      appTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    appNext.addEventListener('click', function () {
      appTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  /* ============================================================
     PERSONALITIES CAROUSEL
     ============================================================ */
  var personTrack = document.getElementById('personTrack');
  var personPrev = document.getElementById('personPrev');
  var personNext = document.getElementById('personNext');

  if (personTrack && personPrev && personNext) {
    var personScrollAmount = 260; // ~ card width + gap

    personPrev.addEventListener('click', function () {
      personTrack.scrollBy({ left: -personScrollAmount, behavior: 'smooth' });
    });

    personNext.addEventListener('click', function () {
      personTrack.scrollBy({ left: personScrollAmount, behavior: 'smooth' });
    });
  }

  /* ============================================================
     MOBILE MENU
     ============================================================ */
  var mobileMenuToggle = document.getElementById('mobileMenuToggle');
  var mainNav = document.getElementById('mainNav');
  let menuOverlay = null;

  if (mobileMenuToggle && mainNav) {
    // Create overlay for mobile menu
    menuOverlay = document.createElement('div');
    menuOverlay.className = 'menu-overlay';
    menuOverlay.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1000;opacity:0;visibility:hidden;transition:all 0.3s ease;';
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

    head.addEventListener('click', function () {
      var isActive = item.classList.contains('active');

      medItems.forEach(function (otherItem) {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
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
     BACK TO TOP BUTTON (Utility)
     ============================================================ */
  var backToTopBtn = document.createElement('button');
  backToTopBtn.textContent = '☝';
  backToTopBtn.setAttribute('aria-label', 'Back to top');
  backToTopBtn.className = 'back-to-top';
  backToTopBtn.style.cssText = 'position:fixed;bottom:30px;right:30px;width:45px;height:45px;border-radius:50%;background:#2d7a3e;color:#fff;border:none;font-size:20px;cursor:pointer;box-shadow:0 4px 15px rgba(0,0,0,0.2);opacity:0;visibility:hidden;transition:all 0.3s ease;z-index:999;';
  document.body.appendChild(backToTopBtn);

  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY;
    if (scrollPos > 400) {
      backToTopBtn.style.opacity = '1';
      backToTopBtn.style.visibility = 'visible';
    } else {
      backToTopBtn.style.opacity = '0';
      backToTopBtn.style.visibility = 'hidden';
    }
  });

  /* ============================================================
     PRELOADER (optional, shows briefly)
     ============================================================ */
  var preloader = document.createElement('div');
  preloader.className = 'preloader';
  preloader.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;background:#1e5826;z-index:9999;display:flex;align-items:center;justify-content:center;transition:opacity 0.5s ease;';
  preloader.innerHTML = '<span style="font-size:60px;">🍃</span>';
  document.body.appendChild(preloader);

  window.addEventListener('load', function () {
    setTimeout(function () {
      preloader.style.opacity = '0';
      setTimeout(function () {
        preloader.style.display = 'none';
      }, 500);
    }, 400);
  });

});