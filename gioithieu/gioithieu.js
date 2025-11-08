document.addEventListener("DOMContentLoaded", () => {
  /* ========================= COUNTER-UP ========================= */
  const counters = document.querySelectorAll(".gg-counter");
  let countersActivated = false;

  const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    const duration = 2000; // 2 giây
    let startTime = null;

    const update = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const value = Math.floor(progress * target);
      counter.textContent = value.toLocaleString("en-US");

      if (progress < 1) requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  };

  // Kích hoạt khi phần thống kê xuất hiện 50% trong viewport
  const statsSection = document.querySelector(".gg-stats");
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        if (entries[0].isIntersecting && !countersActivated) {
          counters.forEach(animateCounter);
          countersActivated = true;
          observer.unobserve(statsSection);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(statsSection);
  }

  /* ========================= TESTIMONIAL CAROUSEL ========================= */
  const testimonialItems = document.querySelectorAll(".gg-carousel-item");
  const prevBtn = document.querySelector(".gg-prev-btn");
  const nextBtn = document.querySelector(".gg-next-btn");
  let currentIndex = 0;
  let autoSlide;

  const showTestimonial = (index) => {
    testimonialItems.forEach((item, i) =>
      item.classList.toggle("is-active", i === index)
    );
  };

  const nextTestimonial = () => {
    currentIndex = (currentIndex + 1) % testimonialItems.length;
    showTestimonial(currentIndex);
  };

  const prevTestimonial = () => {
    currentIndex =
      (currentIndex - 1 + testimonialItems.length) % testimonialItems.length;
    showTestimonial(currentIndex);
  };

  const startAutoSlide = () => {
    autoSlide = setInterval(nextTestimonial, 5000);
  };

  const resetAutoSlide = () => {
    clearInterval(autoSlide);
    startAutoSlide();
  };

  if (testimonialItems.length > 0) {
    showTestimonial(currentIndex);
    startAutoSlide();

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        prevTestimonial();
        resetAutoSlide();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        nextTestimonial();
        resetAutoSlide();
      });
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.querySelector(".custom-navbar");

  // ===== ĐỔI MÀU NAVBAR KHI CUỘN =====
  const handleNavbarScroll = () => {
    if (window.scrollY > 50) navbar.classList.add("scrolled");
    else navbar.classList.remove("scrolled");
  };

  // ===== CUỘN MƯỢT ĐẾN SECTION =====
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

  // ===== LẮNG NGHE SỰ KIỆN CUỘN =====
  const onScroll = () => {
    handleNavbarScroll();
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  // ===== DROPDOWN TRÊN MOBILE =====
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

  // ===== GỌI LẦN ĐẦU KHI LOAD =====
  handleNavbarScroll();
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
