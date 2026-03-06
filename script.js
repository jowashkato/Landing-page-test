
const modal = document.getElementById("modal");
const ctaBtn = document.getElementById("ctaBtn");
const heroBtn = document.getElementById("heroBtn");
const closeBtn = document.querySelector(".close");
const scrollTop = document.getElementById("scrollTop");
const cards = document.querySelectorAll(".card");
const modalForm = document.querySelector("#modal form");
const contactForm = document.getElementById("contactForm");
const navLinks = document.querySelectorAll(".nav-menu a");
const sections = document.querySelectorAll("section");
const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");


if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    
    
    const icon = navToggle.querySelector("i");
    if (navMenu.classList.contains("active")) {
      icon.classList.remove("fa-bars");
      icon.classList.add("fa-times");
    } else {
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
}


document.addEventListener("click", (e) => {
  if (navMenu && navMenu.classList.contains("active")) {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove("active");
      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  }
});


navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const icon = navToggle.querySelector("i");
      icon.classList.remove("fa-times");
      icon.classList.add("fa-bars");
    }
  });
});


function openModal() {
  if (!modal) return;
  
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; 
  
  
  const modalContent = document.querySelector(".modal-content");
  if (modalContent) {
    modalContent.style.animation = "modalSlideIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)";
  }
}


function closeModal() {
  if (!modal) return;
  
  const modalContent = document.querySelector(".modal-content");
  if (modalContent) {
    modalContent.style.animation = "modalSlideOut 0.3s ease";
  }
  
  setTimeout(() => {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; 
  }, 200);
}


if (ctaBtn) {
  ctaBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
}

if (heroBtn) {
  heroBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openModal();
  });
}


if (closeBtn) {
  closeBtn.addEventListener("click", closeModal);
}

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});


document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal && modal.style.display === "flex") {
    closeModal();
  }
});


if (modalForm) {
  modalForm.addEventListener("submit", (e) => {
    e.preventDefault();
    

    const nameInput = modalForm.querySelector('input[type="text"]');
    const emailInput = modalForm.querySelector('input[type="email"]');
    const phoneInput = modalForm.querySelector('input[type="tel"]');
    const serviceSelect = modalForm.querySelector('select');
    const messageInput = modalForm.querySelector('textarea');
    
    const name = nameInput ? nameInput.value : "";
    const email = emailInput ? emailInput.value : "";
    const phone = phoneInput ? phoneInput.value : "";
    const service = serviceSelect ? serviceSelect.value : "";
    const message = messageInput ? messageInput.value : "";
    
    
    if (!name || !email) {
      alert("Please fill in your name and email");
      return;
    }
    
   
    alert(`Thank you ${name}! We'll contact you ${phone ? "at " + phone : "via email at " + email} within 24 hours regarding ${service || "your request"}.`);
    
   
    modalForm.reset();
    closeModal();
  });
}


if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
   
    const nameInput = contactForm.querySelector('input[type="text"]');
    const emailInput = contactForm.querySelector('input[type="email"]');
    const subjectInput = contactForm.querySelector('input[type="text"]:nth-of-type(2)');
    const messageInput = contactForm.querySelector('textarea');
    
    const name = nameInput ? nameInput.value : "";
    const email = emailInput ? emailInput.value : "";
    const subject = subjectInput ? subjectInput.value : "General Inquiry";
    const message = messageInput ? messageInput.value : "";
    
   
    if (!name || !email || !message) {
      alert("Please fill in all required fields");
      return;
    }
    
   
    alert(`Thank you ${name}! Your message has been sent. We'll respond to ${email} as soon as possible.`);
    
   
    contactForm.reset();
  });
}


window.addEventListener("scroll", () => {
 
  if (scrollTop) {
    if (document.documentElement.scrollTop > 300) {
      scrollTop.classList.add("show");
    } else {
      scrollTop.classList.remove("show");
    }
  }
  
  
  animateCardsOnScroll();
  
 
  updateActiveNavLink();
});


if (scrollTop) {
  scrollTop.addEventListener("click", () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  });
}


function animateCardsOnScroll() {
  cards.forEach(card => {
    const position = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (position < windowHeight - 80) {
      card.classList.add("show");
    }
  });
}


document.addEventListener("DOMContentLoaded", () => {
  
  setTimeout(() => {
    animateCardsOnScroll();
  }, 100);
  
  
  const logo = document.querySelector(".logo img");
  if (logo) {
    logo.classList.add("pulse-animation");
  }
  
 
  initializeFeatures();
  

  setTimeout(() => {
    updateActiveNavLink();
  }, 200);
});


function updateActiveNavLink() {
  let current = "";
  const scrollPosition = window.scrollY + 100; 
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      current = section.getAttribute("id");
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);
      if (targetId === current) {
        link.classList.add("active");
      }
    }
  });
}


navLinks.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    
    const targetId = link.getAttribute("href");
    if (!targetId || targetId === "#") return;
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
   
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        const icon = navToggle.querySelector("i");
        if (icon) {
          icon.classList.remove("fa-times");
          icon.classList.add("fa-bars");
        }
      }
      
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});


function initializeFeatures() {
  
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      
    });
  });
  
  
  const socialLinks = document.querySelectorAll(".footer-social a, .social-links a");
  socialLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      console.log(`Social link clicked: ${link.href}`);
     
     
    });
  });
  
  
  const logoImg = document.querySelector(".logo img");
  if (logoImg) {
    logoImg.onerror = function() {
      this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%231E90FF\'/%3E%3Ctext x=\'50\' y=\'70\' font-size=\'50\' text-anchor=\'middle\' fill=\'white\'%3EC%3C/text%3E%3C/svg%3E';
    };
  }
  
 
  const footerLogo = document.querySelector(".footer-logo img");
  if (footerLogo) {
    footerLogo.onerror = function() {
      this.src = 'data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 100 100\'%3E%3Ccircle cx=\'50\' cy=\'50\' r=\'45\' fill=\'%23ffffff\'/%3E%3Ctext x=\'50\' y=\'70\' font-size=\'50\' text-anchor=\'middle\' fill=\'%230A2E5C\'%3EC%3C/text%3E%3C/svg%3E';
    };
  }
  
  
  const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
  phoneLinks.forEach(link => {
    link.addEventListener("click", (e) => {
     
      console.log(`Calling: ${link.href}`);
    });
  });
  
 
  const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
  emailLinks.forEach(link => {
    link.addEventListener("click", (e) => {
     
      console.log(`Emailing: ${link.href}`);
    });
  });
  
 
  const newsletterForm = document.querySelector(".newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value : "";
      
      if (email) {
        alert(`Thank you for subscribing with ${email}! You'll receive our cleaning tips and offers.`);
        newsletterForm.reset();
      } else {
        alert("Please enter your email address");
      }
    });
  }
  

  animateStats();
}


function animateStats() {
  const statNumbers = document.querySelectorAll(".stat-number");
  
  statNumbers.forEach(stat => {
    const targetValue = stat.textContent;
    if (targetValue.includes('+')) {
      const number = parseInt(targetValue);
      if (!isNaN(number)) {
        let current = 0;
        const increment = number / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= number) {
            stat.textContent = targetValue;
            clearInterval(timer);
          } else {
            stat.textContent = Math.floor(current) + '+';
          }
        }, 30);
      }
    }
  });
}


function animateCardsOnLoad() {
  cards.forEach((card, index) => {
    setTimeout(() => {
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 150);
  });
}


window.addEventListener("load", () => {
  animateCardsOnLoad();
  

  setTimeout(() => {
    animateStats();
  }, 500);
});


const style = document.createElement("style");
style.textContent = `
  @keyframes modalSlideOut {
    0% {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(-30px) scale(0.9);
    }
  }
  
  .pulse-animation {
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }
  
  .nav-menu a.active {
    color: var(--accent, #FFD700);
  }
  
  .nav-menu a.active::after {
    width: 100%;
  }
  
  /* Mobile menu animation */
  .nav-menu {
    transition: all 0.3s ease;
  }
  
  .nav-menu.active {
    display: flex !important;
    animation: slideDown 0.3s ease;
  }
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

document.head.appendChild(style);


console.log("%c🧹 Corecleen Solutions Ltd 🧹", "color: #1E90FF; font-size: 20px; font-weight: bold;");
console.log("%cProfessional Cleaning Services in Uganda", "color: #0A2E5C; font-size: 14px;");
console.log("📞 +256 707 265146 | 📧 corecleensolutions@gmail.com");
console.log("📍 Plot 97 Bukoto Street, Kampala");


window.addEventListener('error', (e) => {
  console.log('Error caught:', e.message);
});


if ('ontouchstart' in window) {
  document.body.classList.add('touch-device');
}


modal.addEventListener('touchmove', (e) => {
  e.preventDefault();
}, { passive: false });


if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
  window.addEventListener('load', () => {
    
    console.log('Service Worker support available');
  });
}