document.addEventListener('DOMContentLoaded', () => {

  /* =====================================================
     Scroll Animations (Intersection Observer)
  ===================================================== */
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.scroll-animate');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('animate-in');
          }, delay * 1000);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(el => observer.observe(el));
  };
  animateOnScroll();


  /* =====================================================
     Hero Video - Auto Play Handler
  ===================================================== */
  const heroVideo = document.getElementById('heroVideo');

  if (heroVideo) {
    // Try autoplay first
    const playPromise = heroVideo.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // If autoplay blocked, play on first user interaction
        const playOnInteraction = () => {
          heroVideo.play();
          document.removeEventListener('touchstart', playOnInteraction);
          document.removeEventListener('click', playOnInteraction);
        };
        
        document.addEventListener('touchstart', playOnInteraction, { once: true });
        document.addEventListener('click', playOnInteraction, { once: true });
      });
    }
  }


  /* =====================================================
     WHO WE ARE Slider - FIXED SPEED
  ===================================================== */
  const whoSlides = document.querySelectorAll('.who-slide');
  const whoDots = document.querySelectorAll('.who-dot');
  let whoIndex = 0;

  function showWhoSlide(i) {
    if (whoSlides.length === 0) return;
    
    whoSlides.forEach(s => s.classList.remove('active'));
    whoDots.forEach(d => d.classList.remove('active'));

    whoIndex = (i + whoSlides.length) % whoSlides.length;
    whoSlides[whoIndex]?.classList.add('active');
    whoDots[whoIndex]?.classList.add('active');
  }

  if (whoSlides.length > 0) {
    // تغيير السرعة من 4000 إلى 5000 (5 ثواني)
    setInterval(() => showWhoSlide(whoIndex + 1), 5000);
    
    whoDots.forEach((dot, i) =>
      dot.addEventListener('click', () => showWhoSlide(i))
    );
  }


  /* =====================================================
     Sticky Header Shadow
  ===================================================== */
  const header = document.querySelector('.header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 10px rgba(0,0,0,0.15)';
      } else {
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
      }
    });
  }


 // Smooth Scroll for Anchor Links - FIXED للموبايل
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      
      const target = document.querySelector(targetId);
      if (!target) return;
      
      e.preventDefault();
      
      // Close mobile menu if open
      const mainMenu = document.querySelector('.main-menu');
      const overlay = document.querySelector('.menu-overlay');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      
      if (mainMenu && mainMenu.classList.contains('active')) {
        mainMenu.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        
        const icon = mobileToggle?.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-times');
          icon.classList.add('fa-bars');
        }
        
        // إغلاق كل الـ dropdowns
        document.querySelectorAll('.dropdown.active')
          .forEach(d => d.classList.remove('active'));
      }
      
      // Scroll to target with offset
      setTimeout(() => {
        const offset = 80; // ارتفاع الهيدر
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }, 300); // انتظار إغلاق المنيو
    });
  });


  /* =====================================================
     MOBILE MENU - FIXED DROPDOWN ISSUE
  ===================================================== */
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mainMenu = document.querySelector('.main-menu');
  const overlay = document.querySelector('.menu-overlay');
  const dropdownLinks = document.querySelectorAll('.dropdown > a');

  function closeMenu() {
    mainMenu?.classList.remove('active');
    overlay?.classList.remove('active');
    
    const icon = mobileToggle?.querySelector('i');
    if (icon) {
      icon.className = 'fas fa-bars';
    }
    
    // إغلاق كل الـ dropdowns
    document.querySelectorAll('.dropdown.active')
      .forEach(d => d.classList.remove('active'));
  }

  // فتح/إغلاق القائمة الرئيسية
  mobileToggle?.addEventListener('click', () => {
    mainMenu?.classList.toggle('active');
    overlay?.classList.toggle('active');

    const icon = mobileToggle.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars');
      icon.classList.toggle('fa-times');
    }
  });

  // إغلاق القائمة عند الضغط على الـ overlay
  overlay?.addEventListener('click', closeMenu);

  // FIXED: معالجة الـ dropdown في الموبايل فقط
  dropdownLinks.forEach(link => {
    link.addEventListener('click', e => {
      // التحقق من أننا في وضع الموبايل
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        
        const parentDropdown = link.parentElement;
        const isActive = parentDropdown.classList.contains('active');
        
        // إغلاق كل الـ dropdowns الأخرى
        document.querySelectorAll('.dropdown.active')
          .forEach(d => {
            if (d !== parentDropdown) {
              d.classList.remove('active');
            }
          });
        
        // toggle للـ dropdown الحالي
        parentDropdown.classList.toggle('active');
      }
    });
  });

  // إغلاق القائمة عند تكبير الشاشة
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });


const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', (e) => {
    e.preventDefault();
    
    // إيقاف أي scroll سابق
    window.scrollTo({ top: 0, behavior: 'auto' });
    
    // scroll سلس بعد كده
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 10);
  });
}

  /* =====================================================
     BACK TO HOME BUTTON (Mobile Only)
  ===================================================== */
  const backToHome = document.querySelector('.back-to-home');

  if (backToHome) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300 && window.innerWidth <= 768) {
        backToHome.classList.add('show');
      } else {
        backToHome.classList.remove('show');
      }
    });
  }


  /* =====================================================
     CONTACT FORM HANDLER
  ===================================================== */
  const contactForm = document.getElementById('contactForm');
  const emailGroup = document.getElementById('emailGroup');
  const emailInput = document.getElementById('email');
  const contactMethod = document.getElementById('contactMethod');

  // Show/hide email based on contact method
  contactMethod?.addEventListener('change', function() {
    if (this.value === 'whatsapp') {
      if (emailGroup) emailGroup.style.display = 'none';
      emailInput?.removeAttribute('required');
    } else {
      if (emailGroup) emailGroup.style.display = 'block';
      emailInput?.setAttribute('required', '');
    }
  });

  // Contact Form submission
  contactForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
      successMessage.classList.add('show');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    this.reset();
    
    setTimeout(() => {
      successMessage?.classList.remove('show');
    }, 5000);
    
    console.log('Contact form submitted successfully');
  });


  /* =====================================================
     ADMISSION FORM HANDLER
  ===================================================== */
  const admissionForm = document.getElementById('admissionForm');

  // File upload label update
  document.querySelectorAll('input[type="file"]').forEach(input => {
    input.addEventListener('change', function() {
      const label = this.nextElementSibling?.querySelector('span');
      if (label) {
        if (this.files.length > 0) {
          label.textContent = this.files[0].name;
        } else {
          label.textContent = 'Choose File or Drag Here';
        }
      }
    });
  });

  // Admission Form submission
  admissionForm?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
      successMessage.classList.add('show');
      successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    this.reset();
    
    setTimeout(() => {
      successMessage?.classList.remove('show');
    }, 5000);
    
    console.log('Admission form submitted with data:', Object.fromEntries(formData));
  });


  /* =====================================================
     GALLERY FILTER (for gallery.html)
  ===================================================== */
  const categoryBtns = document.querySelectorAll('.category-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all buttons
      categoryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.category;

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });


  /* =====================================================
     LIGHTBOX (for gallery.html)
  ===================================================== */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img')?.src;
      if (imgSrc && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox?.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightbox?.classList.remove('active');
    document.body.style.overflow = 'auto';
  });

  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // Close lightbox with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
      lightbox.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

});