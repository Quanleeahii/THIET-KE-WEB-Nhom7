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

  handleNavbarScroll();
  showOnScroll();

  // ==================== MENU CHỌN MÓN ====================
  const items = document.querySelectorAll(".menu-item");
  const totalEl = document.getElementById("total");
  const selectedList = document.getElementById("selectedList");
  const orderBtn = document.getElementById("orderBtn");

  if (items.length && totalEl && selectedList && orderBtn) {
    function updateMenu() {
      let total = 0;
      selectedList.innerHTML = "";

      items.forEach((item) => {
        if (item.checked) {
          const name = item.dataset.name;
          const price = parseInt(item.dataset.price);

          total += price;

          const li = document.createElement("li");
          li.innerHTML = `<span>${name}</span><span>${price.toLocaleString()}</span>`;
          selectedList.appendChild(li);
        }
      });

      totalEl.textContent = total.toLocaleString();
    }

    items.forEach((item) => {
      item.addEventListener("change", updateMenu);
    });

    orderBtn.addEventListener("click", () => {
      if (selectedList.children.length === 0) {
        alert("⚠️ Bạn chưa chọn món nào!");
      } else {
        alert("🎉 Cảm ơn bạn! Thực đơn của bạn đã được ghi nhận.");
      }
    });
  }
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
