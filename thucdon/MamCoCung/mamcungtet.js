// ==================== SLIDER ====================
let currentSlide = 0;
let autoSlide;

// Lấy các phần tử cần dùng
const slider = document.getElementById("menuSlider");
const slides = slider.children;
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const sliderContainer = document.querySelector(".slider-container");

// Hàm chuyển slide
function moveSlide(step) {
  currentSlide = (currentSlide + step + slides.length) % slides.length;
  slider.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
}

// Tạo chấm chỉ báo (dots)
function createDots() {
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
}

// Cập nhật trạng thái dots
function updateDots() {
  const dots = document.querySelectorAll(".dots span");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

// Tự động chạy slide mỗi 4 giây
function startAutoSlide() {
  autoSlide = setInterval(() => moveSlide(1), 4000);
}
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Bắt sự kiện nút điều hướng
prevBtn.addEventListener("click", () => moveSlide(-1));
nextBtn.addEventListener("click", () => moveSlide(1));

// Khi rê chuột thì dừng, rời chuột thì chạy lại
sliderContainer.addEventListener("mouseenter", stopAutoSlide);
sliderContainer.addEventListener("mouseleave", startAutoSlide);

// Khởi tạo
createDots();
startAutoSlide();

// ==================== HIỆU ỨNG SCROLL (REVEAL) ====================
const revealElements = document.querySelectorAll(".reveal");
function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;
  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < trigger) el.classList.add("active");
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

hjjkkej;
