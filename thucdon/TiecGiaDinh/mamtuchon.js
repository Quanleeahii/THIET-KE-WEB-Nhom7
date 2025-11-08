const items = document.querySelectorAll(".menu-item");
const totalEl = document.getElementById("total");
const selectedList = document.getElementById("selectedList");

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

document.getElementById("orderBtn").addEventListener("click", () => {
  if (selectedList.children.length === 0) {
    alert("⚠️ Bạn chưa chọn món nào!");
  } else {
    alert("🎉 Cảm ơn bạn! Thực đơn của bạn đã được ghi nhận.");
  }
});

