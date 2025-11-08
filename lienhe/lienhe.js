// ===== HIỂN THỊ THÔNG BÁO TOAST =====
function showToast(message, type = "success") {
  const oldToast = document.querySelector(".custom-toast");
  if (oldToast) oldToast.remove();
  const toast = document.createElement("div");
  toast.className = `custom-toast ${type}`;
  toast.innerHTML = `
    <i class="bi ${
      type === "success"
        ? "bi-check-circle-fill"
        : "bi-exclamation-triangle-fill"
    }"></i>
    ${message}
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// Xử lý form liên hệ chính
document
  .getElementById("contactForm")
  ?.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    if (name.length < 2) {
      showToast("Vui lòng nhập họ tên hợp lệ!", "error");
      return;
    }
    if (!/^(0|\+84)[0-9]{9,10}$/.test(phone)) {
      showToast("Số điện thoại không hợp lệ!", "error");
      return;
    }
    showToast(
      "✅ Yêu cầu của bạn đã được ghi nhận! Chúng tôi sẽ liên hệ sớm nhất."
    );
    const alertBox = document.getElementById("formAlert");
    alertBox.classList.remove("d-none");
    this.reset();
    setTimeout(() => alertBox.classList.add("d-none"), 4000);
  });

// Xử lý form trong popup Đặt Tiệc
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
