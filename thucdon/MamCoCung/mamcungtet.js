document.addEventListener("DOMContentLoaded", () => {
  // ==================== NAVBAR & SCROLL EFFECT ====================
  const navbar = document.querySelector(".custom-navbar");
  const fadeEls = document.querySelectorAll(".fade-section");
  // Đổi màu Navbar khi cuộn
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };

  // Hiệu ứng fade-in khi cuộn
  const showOnScroll = () => {
    const trigger = window.innerHeight * 0.9;
    fadeEls.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("visible");
    });
  };

  // Lắng nghe cuộn
  const onScroll = () => {
    handleNavbarScroll();
    showOnScroll();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

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

  // Dropdown trên mobile
  const dropdownLinks = document.querySelectorAll(".nav-item.dropdown > a");
  dropdownLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const parent = this.parentElement;
      if (window.innerWidth <= 991) {
        e.preventDefault();
        document.querySelectorAll(".nav-item.dropdown").forEach((item) => {
          if (item !== parent) item.classList.remove("show");
        });
        parent.classList.toggle("show");
      }
    });
  });

  // Gọi ban đầu
  handleNavbarScroll();
  showOnScroll();

  // ==================== SLIDER ====================
  const slider = document.getElementById("menuSlider");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const sliderContainer = document.querySelector(".slider-container");

  if (slider && sliderContainer && prevBtn && nextBtn) {
    let currentSlide = 0;
    let autoSlide;
    const slides = slider.children;

    // Chuyển slide
    const moveSlide = (step) => {
      currentSlide = (currentSlide + step + slides.length) % slides.length;
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
      updateDots();
    };

    // Tạo chấm chỉ báo (dots)
    const createDots = () => {
      const dotsContainer = document.createElement("div");
      dotsContainer.className = "dots";
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => {
          currentSlide = i;
          slider.style.transform = `translateX(-${currentSlide * 100}%)`;
          updateDots();
        });
        dotsContainer.appendChild(dot);
      }
      sliderContainer.appendChild(dotsContainer);
    };

    const updateDots = () => {
      const dots = document.querySelectorAll(".dots span");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentSlide);
      });
    };

    // Tự động chạy slide mỗi 4 giây
    const startAutoSlide = () => {
      autoSlide = setInterval(() => moveSlide(1), 4000);
    };
    const stopAutoSlide = () => clearInterval(autoSlide);

    // Nút điều hướng
    prevBtn.addEventListener("click", () => moveSlide(-1));
    nextBtn.addEventListener("click", () => moveSlide(1));

    // Rê chuột thì dừng, rời chuột thì chạy lại
    sliderContainer.addEventListener("mouseenter", stopAutoSlide);
    sliderContainer.addEventListener("mouseleave", startAutoSlide);

    // Khởi tạo
    createDots();
    startAutoSlide();
  }

  // ==================== HIỆU ỨNG REVEAL ====================
  const revealElements = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const trigger = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) el.classList.add("active");
    });
  };
  window.addEventListener("scroll", revealOnScroll, { passive: true });
  window.addEventListener("load", revealOnScroll);
});

// ===== XỬ LÝ FORM POPUP =====
document
  .querySelector("#datTiecModal form")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("modalName").value.trim();
    const email = document.getElementById("modalEmail").value.trim();
    const phone = document.getElementById("modalPhone").value.trim();
    if (name.length < 2) {
      alert("⚠️ Vui lòng nhập họ tên hợp lệ!");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("📧 Email không hợp lệ!");
      return;
    }
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) {
      alert("📞 Số điện thoại không hợp lệ!");
      return;
    }
    const alertBox = document.getElementById("formAlert");
    alertBox.classList.remove("d-none");
    this.reset();
    setTimeout(() => alertBox.classList.add("d-none"), 4000);
  });
