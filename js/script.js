// document.addEventListener("DOMContentLoaded", function () {
//   // Initialize Carousel with smoother transitions and auto-play
//   const slides = document.querySelectorAll(".carousel-slide");
//   const prevButton = document.querySelector(".carousel-button.prev");
//   const nextButton = document.querySelector(".carousel-button.next");
//   let currentIndex = 0;
//   let autoplayInterval;

//   function goToSlide(index) {
//     if (index < 0) {
//       index = slides.length - 1;
//     } else if (index >= slides.length) {
//       index = 0;
//     }

//     // Add smooth transition effect
//     carousel.style.transition = "transform 0.5s ease-in-out";
//     carousel.style.transform = `translateX(-${index * 100}%)`;
//     currentIndex = index;

//     // Update active indicators if they exist
//     updateIndicators(index);
//   }

//   // Create dot indicators for the carousel
//   function createCarouselIndicators() {
//     const indicatorsContainer = document.createElement("div");
//     indicatorsContainer.className = "carousel-indicators";

//     slides.forEach((_, index) => {
//       const indicator = document.createElement("span");
//       indicator.className = "carousel-indicator";
//       if (index === 0) indicator.classList.add("active");

//       indicator.addEventListener("click", () => goToSlide(index));
//       indicatorsContainer.appendChild(indicator);
//     });

//     document.querySelector(".image-carousel").appendChild(indicatorsContainer);
//   }

//   function updateIndicators(index) {
//     const indicators = document.querySelectorAll(".carousel-indicator");
//     indicators.forEach((indicator, i) => {
//       if (i === index) {
//         indicator.classList.add("active");
//       } else {
//         indicator.classList.remove("active");
//       }
//     });
//   }

//   function startAutoplay() {
//     autoplayInterval = setInterval(() => {
//       goToSlide(currentIndex + 1);
//     }, 5000); // Change slide every 5 seconds
//   }

//   function stopAutoplay() {
//     clearInterval(autoplayInterval);
//   }

//   // Event listeners for carousel navigation
//   prevButton.addEventListener("click", () => {
//     goToSlide(currentIndex - 1);
//     stopAutoplay();
//     setTimeout(startAutoplay, 10000); // Resume autoplay after 10 seconds of inactivity
//   });

//   nextButton.addEventListener("click", () => {
//     goToSlide(currentIndex + 1);
//     stopAutoplay();
//     setTimeout(startAutoplay, 10000);
//   });

//   // Touch swipe functionality for mobile
//   let touchStartX = 0;
//   let touchEndX = 0;

//   carousel.addEventListener(
//     "touchstart",
//     (e) => {
//       touchStartX = e.changedTouches[0].screenX;
//       stopAutoplay();
//     },
//     false
//   );

//   carousel.addEventListener(
//     "touchend",
//     (e) => {
//       touchEndX = e.changedTouches[0].screenX;
//       handleSwipe();
//       setTimeout(startAutoplay, 10000);
//     },
//     false
//   );

//   function handleSwipe() {
//     if (touchEndX < touchStartX - 50) {
//       // Swipe left
//       goToSlide(currentIndex + 1);
//     } else if (touchEndX > touchStartX + 50) {
//       // Swipe right
//       goToSlide(currentIndex - 1);
//     }
//   }

//   // Initialize carousel components
//   createCarouselIndicators();
//   startAutoplay();

// Enhanced FAQ accordion with smooth transitions
document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const faqItem = item.parentElement;
    const answer = faqItem.querySelector(".faq-answer");
    const arrow = item.querySelector(".arrow");

    // Close other items
    document.querySelectorAll(".faq-item").forEach((otherItem) => {
      if (otherItem !== faqItem && otherItem.classList.contains("active")) {
        const otherAnswer = otherItem.querySelector(".faq-answer");
        const otherArrow = otherItem.querySelector(".arrow");

        otherItem.classList.remove("active");
        otherAnswer.style.maxHeight = null;
        otherArrow.style.transform = "rotate(0deg)";
      }
    });

    // Toggle current item
    if (faqItem.classList.contains("active")) {
      faqItem.classList.remove("active");
      answer.style.maxHeight = null;
      arrow.style.transform = "rotate(0deg)";
    } else {
      faqItem.classList.add("active");
      answer.style.maxHeight = answer.scrollHeight + "px";
      arrow.style.transform = "rotate(180deg)";
    }
  });
});

// Smooth scroll for all anchor links
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Offset for fixed header if needed
        behavior: "smooth",
      });

      // Update active navigation link
      document.querySelectorAll("nav a").forEach((link) => {
        link.classList.remove("active");
      });
      this.classList.add("active");
    }
  });
});

// Highlight active navigation link while scrolling
window.addEventListener("scroll", () => {
  let currentSection = "";

  // Check which section is currently in view
  document.querySelectorAll("section").forEach((section) => {
    const sectionTop = section.offsetTop - 70; // Offset for fixed header if needed
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  // Update active link based on current section
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(currentSection)) {
      link.classList.add("active");
    }
  });
});

// Back to top button with smooth animation
document.querySelector(".back-to-top").addEventListener("click", function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Add parallax effect to hero section
window.addEventListener("scroll", function () {
  const hero = document.querySelector(".hero");
  const scrollPosition = window.pageYOffset;

  if (hero) {
    hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
  }
});

// Animate timeline items on scroll
const timelineItems = document.querySelectorAll(".timeline-item");

function checkInView() {
  timelineItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    const isInView =
      rect.top >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight);

    if (isInView) {
      item.classList.add("animate");
    }
  });
}

// Check for elements in view on scroll
window.addEventListener("scroll", checkInView);
// Initial check
checkInView();

// Add hover effects for travel guide categories
document.querySelectorAll(".category").forEach((category) => {
  category.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-10px)";
    this.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";
  });

  category.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    this.style.boxShadow = "0 0 0 rgba(0,0,0,0)";
  });
});

// Add sticky navigation on scroll
const nav = document.querySelector("nav");
const navTop = nav.offsetTop;

function handleScroll() {
  if (window.scrollY >= navTop) {
    document.body.classList.add("fixed-nav");
    nav.classList.add("visible");
  } else {
    document.body.classList.remove("fixed-nav");
    nav.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);

// Add countdown timer to wedding date
const weddingDate = new Date("September 26, 2025 12:00:00").getTime();
const countdownElement = document.createElement("div");
countdownElement.className = "countdown-timer";

function updateCountdown() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.innerHTML = `
              <div class="countdown-item">
                  <span class="countdown-value">${days}</span>
                  <span class="countdown-label">Days</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-value">${hours}</span>
                  <span class="countdown-label">Hours</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-value">${minutes}</span>
                  <span class="countdown-label">Minutes</span>
              </div>
              <div class="countdown-item">
                  <span class="countdown-value">${seconds}</span>
                  <span class="countdown-label">Seconds</span>
              </div>
          `;
}

// Add countdown to the hero section
const detailsOverlay = document.querySelector(".details-overlay");
if (detailsOverlay) {
  detailsOverlay.appendChild(countdownElement);
  setInterval(updateCountdown, 1000);
  updateCountdown();
}

// Add subtle animations for page elements
function animateOnScroll() {
  const elements = document.querySelectorAll(
    ".section-title, .wedding-party, .travel-guide, .faq-section"
  );

  elements.forEach((element) => {
    const position = element.getBoundingClientRect();

    // If element is in viewport
    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add("fade-in");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
animateOnScroll(); // Initial check
