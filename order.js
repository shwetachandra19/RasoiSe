const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const orderContainer = document.getElementById("orderItems");
  const totalPriceEl = document.getElementById("orderTotal");
  const placeOrderBtn = document.getElementById("placeOrderBtn");
  const thankYouBox = document.getElementById("thankYouBox");

  let orderItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function renderOrderItems() {
    if (orderItems.length === 0) {
      orderContainer.innerHTML = "<p class='empty-text'>🛒 No items to display in your order.</p>";
      totalPriceEl.innerText = "₹0";
      return;
    }

    let total = 0;
    orderContainer.innerHTML = "";

    orderItems.forEach((item) => {
      const card = document.createElement("div");
      card.className = "order-card";
      card.innerHTML = `
        <img src="${item.img}" alt="${item.name}">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price}</p>
        </div>
      `;

      orderContainer.appendChild(card);
      total += parseInt(item.price);
    });

    totalPriceEl.innerText = `₹${total}`;
  }

  renderOrderItems();

  placeOrderBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();

    if (!email || !phone || !address) {
      showToast("⚠️ Please fill in all the details.");
      return;
    }

    // Simulate order success
    showToast("✅ Order placed successfully!");
    localStorage.removeItem("cartItems");

    setTimeout(() => {
      document.querySelector(".order-form").style.display = "none";
      document.querySelector(".order-items-container").style.display = "none";
      document.querySelector(".total-order-amount").style.display = "none";
      thankYouBox.style.display = "block";
    }, 1000);
  });

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
});
