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

// // Add parallax effect to hero section
// window.addEventListener("scroll", function () {
//   const hero = document.querySelector(".hero");
//   const scrollPosition = window.pageYOffset;

//   if (hero) {
//     hero.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
//   }
// });

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

// RSVP Functions
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("rsvpForm");
  const nameInput = document.getElementById("name");
  const dietInput = document.getElementById("diet");
  const dietaryTextContainer = document.getElementById("dietaryText");
  const mainRsvpRadios = document.querySelectorAll('input[name="main_rsvp"]');
  const detailsFieldset = document.getElementById("detailsFieldset");
  const submitButton = document.getElementById("rsvpBtn");

  // Toggle fieldset based on RSVP choice
  mainRsvpRadios.forEach((radio) => {
    radio.addEventListener("change", () => {
      detailsFieldset.disabled = radio.value === "No";
    });
  });

  // Show/hide dietary textarea
  document.querySelectorAll('input[name="has_dietary"]').forEach((radio) => {
    radio.addEventListener("change", () => {
      if (radio.value === "Yes" && radio.checked) {
        dietaryTextContainer.style.display = "block";
      } else {
        dietaryTextContainer.style.display = "none";
        dietInput.value = "";
      }
    });
  });

  // Handle form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    submitButton.disabled = true; // Disable submit button immediately

    const name = nameInput.value.trim();
    const mainRSVP = document.querySelector(
      'input[name="main_rsvp"]:checked'
    )?.value;

    if (!name) {
      alert("Please enter your name.");
      nameInput.focus();
      submitButton.disabled = false;
      return;
    }

    if (!mainRSVP) {
      alert("Please select Yes or No for attending.");
      submitButton.disabled = false;
      return;
    }

    if (mainRSVP === "No") {
      const message = `Dear Nico and Shini,

Thank you so much for the kind invitation to your wedding!

Unfortunately, I won’t be able to attend, but I’m wishing you both a beautiful and memorable wedding day!

Warm regards,  
${name}`;
      sendEmail(name, message);
      return;
    }

    const welcomeParty = document.querySelector(
      'input[name="welcome_party"]:checked'
    )?.value;
    const ceremony = document.querySelector(
      'input[name="ceremony"]:checked'
    )?.value;
    const hasDietary = document.querySelector(
      'input[name="has_dietary"]:checked'
    )?.value;

    if (!welcomeParty) {
      alert("Please select your Welcome Party preference.");
      submitButton.disabled = false;
      return;
    }

    if (!ceremony) {
      alert("Please select your Ceremony & Reception preference.");
      submitButton.disabled = false;
      return;
    }

    if (!hasDietary) {
      alert("Please indicate if you have dietary requirements.");
      submitButton.disabled = false;
      return;
    }

    let diet = "None";
    if (hasDietary === "Yes") {
      diet = dietInput.value.trim();
      if (!diet) {
        alert("Please specify your dietary requirements.");
        dietInput.focus();
        submitButton.disabled = false;
        return;
      }
    }

    const message = `Dear Nico and Shini,

Thank you so much for the kind invitation to your wedding!

Here is my RSVP:
- Attending: Yes
- Welcome Party (26th Sept): ${welcomeParty}
- Ceremony & Reception (27th Sept): ${ceremony}
- Dietary requirements: ${diet}

Wishing you all the best as you prepare for your big day!

Warm regards,  
${name}`;

    sendEmail(name, message);
  });

  function sendEmail(name, message) {
    emailjs
      .send("service_jn6cwza", "template_8lpsqz9", {
        name: name,
        rsvp_message: message,
      })
      .then(() => {
        alert("RSVP sent successfully!");
        form.reset();
        dietaryTextContainer.style.display = "none";
        detailsFieldset.disabled = true;
        submitButton.disabled = false;
      })
      .catch((error) => {
        alert("Failed to send RSVP: " + JSON.stringify(error));
        submitButton.disabled = false;
      });
  }
});

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

function openTransportOverlay() {
  document.getElementById("transportOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function openEatOverlay() {
  document.getElementById("eatOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function openLodgingOverlay() {
  document.getElementById("lodgingOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function openDresscodeOverlay() {
  document.getElementById("dresscodeOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function openActivitiesOverlay() {
  document.getElementById("activitiesOverlay").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeOverlay(overlayId) {
  document.getElementById(overlayId).classList.remove("active");
  document.body.style.overflow = "auto";
}

// Close overlay when clicking outside content
document.querySelectorAll(".overlay").forEach((overlay) => {
  overlay.addEventListener("click", function (e) {
    if (e.target === this) {
      this.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });
});

// Close overlay with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    document.querySelectorAll(".overlay.active").forEach((overlay) => {
      overlay.classList.remove("active");
    });
    document.body.style.overflow = "auto";
  }
});
