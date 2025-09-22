// Add smooth scrolling for navigation links and header hide on scroll
document.addEventListener("DOMContentLoaded", function () {
  let lastScrollTop = 0;
  const header = document.getElementById("mainHeader");
  const mobileNav = document.getElementById("mobileNavContainer");
  const menuFab = document.getElementById("menuFab");
  const scrollTopBtn = document.getElementById("scrollTop");

  // Hide header on scroll down, show on scroll up
  window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Hide/show header based on scroll direction
    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Scrolling down
      header.classList.add("hidden");
      if (mobileNav) mobileNav.classList.add("hidden");
      if (menuFab) menuFab.classList.add("hidden");
      if (scrollTopBtn) scrollTopBtn.classList.add("hidden");
    } else {
      // Scrolling up
      header.classList.remove("hidden");
      if (mobileNav) mobileNav.classList.remove("hidden");
      if (menuFab) menuFab.classList.remove("hidden");
      if (scrollTopBtn) scrollTopBtn.classList.remove("hidden");
    }

    lastScrollTop = scrollTop;

    // Show scroll to top button when scrolled down
    if (scrollTopBtn) {
      if (scrollTop > 300) {
        scrollTopBtn.classList.remove("hidden");
      } else {
        scrollTopBtn.classList.add("hidden");
      }
    }
  });

  // Mobile navigation
  const mobileNavSelect = document.getElementById("mobileNav");
  if (mobileNavSelect) {
    mobileNavSelect.addEventListener("change", function () {
      if (this.value) {
        const targetElement = document.querySelector(this.value);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 120,
            behavior: "smooth",
          });
          this.value = ""; // Reset select
        }
      }
    });
  }

  // Navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 120,
          behavior: "smooth",
        });
      }
    });
  });

  // Scroll to top button
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Menu FAB for mobile
  if (menuFab) {
    menuFab.addEventListener("click", function () {
      if (mobileNavSelect) {
        mobileNavSelect.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Make sections collapsible on mobile
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    const title = section.querySelector(".section-title");
    if (title && window.innerWidth <= 768) {
      const collapsibleSection = document.createElement("div");
      collapsibleSection.className = "collapsible-section";
      collapsibleSection.innerHTML = `
                        <span>${title.textContent}</span>
                        <i class="fas fa-chevron-down"></i>
                    `;

      // Insert collapsible section before the original section
      section.parentNode.insertBefore(collapsibleSection, section);

      // Hide the original section initially
      section.classList.add("collapsible-content");

      // Add click event to toggle
      collapsibleSection.addEventListener("click", function () {
        section.classList.toggle("active");
        const icon = collapsibleSection.querySelector("i");
        if (section.classList.contains("active")) {
          icon.classList.remove("fa-chevron-down");
          icon.classList.add("fa-chevron-up");
        } else {
          icon.classList.remove("fa-chevron-up");
          icon.classList.add("fa-chevron-down");
        }
      });
    }
  });
});
