// 1. Highlight active nav link based on URL
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".view-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const card = this.closest(".event-card");
      const name = card.querySelector("h3").innerText;
      const priceEl = card.querySelector("p");
      const price = priceEl.getAttribute("data-price");
      const bgImage = card.style.backgroundImage;
      const img = bgImage.slice(5, -2); // remove url("...")

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const exists = cartItems.some(item => item.name === name);
      if (exists) {
        showToast("⚠️ Package already in cart");
        return;
      }

      cartItems.push({ name, price, img });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      showToast(name+" added to cart!");
    });
  });
});

// Toast
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
