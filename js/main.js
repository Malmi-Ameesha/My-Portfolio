// Navbar Active Status
document.addEventListener("DOMContentLoaded", function () {
    var navLinks = document.querySelectorAll(".nav-link");
  
    navLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
  
        // Remove the 'active' class from all links
        navLinks.forEach(function (navLink) {
          navLink.classList.remove("active");
        });
  
        // Add the 'active' class to the clicked link
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

// Auto Typed
var typed = new Typed(".typed",{
  strings : ["Undegrduate","Web Developer","Mobile Developer","UI/UX Designer"],
  typeSpeed:150,
  backSpeed:150,
  loop:true
})

// Download Button 
document.getElementById("resume-btn").addEventListener("click", function() {
  // shareable link of CV file
  var downloadLink = 'https://drive.google.com/file/d/1NHF661nOHiHDSa30EKBheBILjJOLFJbc/view?usp=sharing';
  window.open(downloadLink, '_blank');
});

//Transparent navbar

document.addEventListener("DOMContentLoaded", function () {
  var navbar = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > document.getElementById("resume",).offsetTop) {
      navbar.classList.add("transparent-navbar");
    } else {
      navbar.classList.remove("transparent-navbar");
    }
  });
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

//project section

$(document).ready(function() {
  var $galleryContainer = $('#Project.gallery').isotope({
    itemSelector: '.item',
    layoutMode: 'fitRows',
    filter: ':lt(0)' 
  });

   $('#Project .button-group .button').on('click', function() {   
    $('#Project .button-group .button').removeClass('active');  
    $(this).addClass('active');

    var value = $(this).attr('data-filter');
    $galleryContainer.isotope({
      filter: value
    });
  });
});


//contact section
// Formspree Form  https://formspree.io/f/xrgwwegb
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); 

  var form = e.target;
  var formData = new FormData(form);

  var formAction = 'https://formspree.io/f/mrgngeda';

  fetch(formAction, {
      method: form.method,
      body: formData,
      headers: {
          'Accept': 'application/json'
      }
  })
  .then(response => response.json())
  .then(data => {
      if (data.success) {
          showToast('Your message has been sent. Thank you!', 'bg-success');
      } else {
          showToast('Error sending message. Please try again.', 'bg-danger');
      }
  })
  .catch(error => {
      console.error('Error:', error);
      // Handle error with Bootstrap Toast
      showToast('Error sending message. Please try again.', 'bg-danger');
  });
});

function showToast() {
  var toastEl = document.getElementById('liveToast');
  var toast = new bootstrap.Toast(toastEl);
  toast.show();
}

