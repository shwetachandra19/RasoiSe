
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const cartContainer = document.getElementById("cartItems");
  const totalPriceEl = document.getElementById("totalPrice");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function updateCartUI() {
    cartContainer.innerHTML = "";

    if (cartItems.length === 0) {
      cartContainer.innerHTML = `
        <p class='empty-cart'>🛒 Your cart is empty!</p>
        <div class="cart-links">
          <a href="product.html" class="cart-btn">Explore Products</a>
          <a href="package.html" class="cart-btn">Browse Packages</a>
        </div>`;
      totalPriceEl.innerText = "₹0";
      return;
    }

    let total = 0;
    cartItems.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "cart-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}" />
        <div class="cart-info">
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
          <button class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(card);
      total += parseInt(item.price);
    });

    totalPriceEl.innerText = `₹${total}`;
    const orderBtn = document.getElementById("placeOrderBtn");
    if (orderBtn) {
    orderBtn.style.display = cartItems.length > 0 ? "inline-block" : "none";
    }
  }

  updateCartUI();

  cartContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("remove-btn")) {
      const index = e.target.getAttribute("data-index");
      cartItems.splice(index, 1);
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      updateCartUI();
      showToast("🗑️ Item removed from cart");
    }
  });

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
});
