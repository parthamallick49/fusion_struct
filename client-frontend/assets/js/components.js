// assets/js/components.js
export async function initComponents() {
  // Ensure DOM is ready
  document.addEventListener("DOMContentLoaded", async () => {
    const navbarContainer = document.getElementById("navbar");
    const footerContainer = document.getElementById("footer");

    // --- Navbar ---
    if (navbarContainer) {
      try {
        const res = await fetch("components/navbar.html"); // Adjust path relative to current HTML
        navbarContainer.innerHTML = await res.text();

        // Bind mobile menu toggle immediately
        const menuToggle = document.getElementById("menu-toggle");
        const navLinks = document.getElementById("nav-links");

        if (menuToggle && navLinks) {
          menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
          });
        }
      } catch (err) {
        console.error("Failed to load navbar:", err);
      }
    }

    // --- Footer ---
    if (footerContainer) {
      try {
        const res = await fetch("components/footer.html"); // Adjust path
        footerContainer.innerHTML = await res.text();
      } catch (err) {
        console.error("Failed to load footer:", err);
      }
    }
  });
}
