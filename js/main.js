// Navbar Active Status
document.addEventListener("DOMContentLoaded", function () {
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();

      navLinks.forEach(function (navLink) {
        navLink.classList.remove("active");
      });
      link.classList.add("active");

      var targetId = link.getAttribute("href").substring(1);
      var targetElement = document.getElementById(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});

// Mobile hamburger menu toggle
document.addEventListener("DOMContentLoaded", function () {
  var menuIcon = document.getElementById("menuIconContainer");
  var navbar = document.getElementById("navbar");
  if (menuIcon && navbar) {
    menuIcon.addEventListener("click", function () {
      navbar.classList.toggle("active");
    });
  }
});

// Auto Typed — wrapped so a missing/blocked Typed.js library can't break the rest of the script
try {
  if (typeof Typed !== "undefined" && document.querySelector(".typed")) {
    var typed = new Typed(".typed", {
      strings: ["Undergraduate", "Web Developer", "Mobile Developer", "UI/UX Designer"],
      typeSpeed: 100,
      backSpeed: 80,
      loop: true
    });
  } else {
    console.warn("Typed.js not loaded — skipping typing animation.");
  }
} catch (err) {
  console.error("Typed.js init failed:", err);
}

// Download Button
document.addEventListener("DOMContentLoaded", function () {
  var resumeBtn = document.getElementById("resume-btn");
  if (resumeBtn) {
    resumeBtn.addEventListener("click", function () {
      var downloadLink = 'https://drive.google.com/file/d/1NHF661nOHiHDSa30EKBheBILjJOLFJbc/view?usp=sharing';
      window.open(downloadLink, '_blank');
    });
  }
});

// Transparent navbar
document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.querySelector(".header");
  var resumeSection = document.getElementById("resume");

  if (navbar && resumeSection) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > resumeSection.offsetTop) {
        navbar.classList.add("transparent-navbar");
      } else {
        navbar.classList.remove("transparent-navbar");
      }
    });
  }
});

// Skills section: Technical / Soft toggle
document.addEventListener("DOMContentLoaded", function () {
  var skillButtons = document.querySelectorAll('#skill .button-group .button');
  var panels = {
    technical: document.querySelector('.technical-panel'),
    soft: document.querySelector('.soft-panel')
  };

  skillButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      skillButtons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');
      var target = btn.getAttribute('data-skill');
      Object.keys(panels).forEach(function (key) {
        if (panels[key]) panels[key].classList.toggle('active', key === target);
      });
    });
  });
});

// Project section: Isotope filter — wrapped in its own try/catch + readiness check
document.addEventListener("DOMContentLoaded", function () {
  try {
    if (typeof $ === "undefined" || typeof $.fn.isotope === "undefined") {
      console.warn("jQuery or Isotope not loaded — project filter disabled.");
      return;
    }

    var $gallery = $('#Project .gallery');
    if ($gallery.length === 0) {
      console.warn("#Project .gallery not found in the DOM.");
      return;
    }

    var $galleryContainer = $gallery.isotope({
      itemSelector: '.item',
      layoutMode: 'fitRows',
      filter: '.web'
    });

    $('#Project .button-group .button').on('click', function () {
      $('#Project .button-group .button').removeClass('active');
      $(this).addClass('active');

      var value = $(this).attr('data-filter');
      $galleryContainer.isotope({ filter: value });
    });
  } catch (err) {
    console.error("Isotope init failed:", err);
  }
});

// Contact section
document.addEventListener("DOMContentLoaded", function () {
  var contactForm = document.getElementById("contactForm");
  if (!contactForm) return;

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    var form = e.target;
    var formData = new FormData(form);
    var formAction = 'https://formspree.io/f/mrgngeda';

    fetch(formAction, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) { return response.json(); })
      .then(function (data) {
        if (data.success) {
          showToast('Your message has been sent. Thank you!');
        } else {
          showToast('Error sending message. Please try again.');
        }
      })
      .catch(function (error) {
        console.error('Error:', error);
        showToast('Error sending message. Please try again.');
      });
  });
});

function showToast(message) {
  var toastEl = document.getElementById('liveToast');
  if (!toastEl || typeof bootstrap === "undefined") return;
  var toastMsg = document.getElementById('toast-message');
  if (message && toastMsg && toastMsg.childNodes[0]) {
    toastMsg.childNodes[0].textContent = message + ' ';
  }
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}