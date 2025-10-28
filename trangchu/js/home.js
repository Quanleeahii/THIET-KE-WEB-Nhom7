document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".custom-navbar");
  const fadeEls = document.querySelectorAll(
    "#about, #stats, .service-section, #feedback, .footer"
  );
  const backToTop = document.getElementById("backToTop");

  // Đổi màu Navbar khi cuộn
  window.addEventListener(
    "scroll",
    () => {
      if (window.scrollY > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    },
    { passive: true }
  );

  // Cuộn mượt đến section
  document.querySelectorAll(".smoothScroll").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        const offset = 80;
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: "smooth" });
      }
    });
  });

  // Hiệu ứng fade-in khi cuộn
  const showOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    fadeEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  };
  showOnScroll();
  window.addEventListener("scroll", showOnScroll, { passive: true });

  // Nút Back to Top
  if (backToTop) {
    window.addEventListener(
      "scroll",
      () => {
        backToTop.style.display = window.scrollY > 400 ? "block" : "none";
      },
      { passive: true }
    );
    backToTop.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }
});
