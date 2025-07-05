//  Highlight active nav link based on URL
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  showToast("✨ Explore the menu — where every bite tells a story! ✨");

  // Add to Cart
  document.querySelectorAll(".nav-cart-icon").forEach(icon => {
    icon.addEventListener("click", function () {
      const card = this.closest(".product-card");
      const name = card.querySelector("h3").innerText;
      const price = card.querySelector(".price").getAttribute("data-price");
      const img = card.querySelector("img").getAttribute("src");

      const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

      const exists = cartItems.some(item => item.name === name);
      if (exists) {
        showToast("⚠️ Item already in cart");
        return;
      }

      cartItems.push({ name, price, img });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      showToast(name+" added to cart!");
      this.classList.add("filled");
    });
  });

  // Filter
  document.getElementById("categoryFilter").addEventListener("change", function () {
    const selected = this.value.toLowerCase();
    document.querySelectorAll(".product-card").forEach(card => {
      const category = card.getAttribute("data-category").toLowerCase();
      card.style.display = (selected === "all" || selected === category) ? "block" : "none";
    });
  });

  // Sort
  document.getElementById("sortPrice").addEventListener("change", function () {
    const order = this.value;
    const cards = Array.from(document.querySelectorAll(".product-card"));
    const container = document.querySelector(".product-grid");

    const sorted = cards.sort((a, b) => {
      const priceA = parseInt(a.getAttribute("data-price"));
      const priceB = parseInt(b.getAttribute("data-price"));
      return order === "low" ? priceA - priceB : priceB - priceA;
    });

    container.innerHTML = "";
    sorted.forEach(card => container.appendChild(card));
  });
});

// Toast function
function showToast(message) {
  let toast = document.createElement("div");
  toast.className = "toast-message";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add("show"), 100);
  setTimeout(() => {
    toast.classList.remove("show");
    toast.remove();
  }, 3000);
}
