function logout() {
      // Add your Firebase signOut logic here
      alert("Logging out...");
      window.location.href = "index.html";
}

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});

const userNameEl = document.getElementById("userName");
const userEmailEl = document.getElementById("userEmail");
const welcomePoemEl = document.getElementById("welcomePoem");
const toast = document.getElementById("toast");

// Handle Auth State
firebase.auth().onAuthStateChanged((user) => {
  if (user && !user.isAnonymous) {
    const name = user.displayName || "Food Lover";
    const email = user.email;

    userNameEl.innerText = name;
    userEmailEl.innerText = email;

    welcomePoemEl.innerHTML = `
      Welcome back, ${name}! <br>
      The table is set, the flavors await,<br>
      Your taste and smile — they elevate!<br><br>
      This is your corner, cozy and neat,<br>
      To check your cart or order a treat. 🍲
    `;

  } else {
    // Guest
    userNameEl.innerText = "Guest";
    userEmailEl.innerText = "Not Logged In";

    welcomePoemEl.innerHTML = `
      Hello, Guest! 👋<br>
      Your table awaits, the flavors are near —<br>
      But sign in first to enjoy it here! 🍽️<br><br>
      Click edit or cart? Log in is the key,<br>
      To unlock the best of RasoiSe! ✨
    `;

    // Optional: toast for guest mode
    showToast("🌿 You're browsing as a guest. Sign in for full access!");
  }

  // Apply the class regardless of state
  welcomePoemEl.classList.add("welcome-box");
});

// Toast show function
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


// Handle button clicks
document.querySelectorAll(".profile-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const action = btn.getAttribute("data-action");

    const user = firebase.auth().currentUser;

    if (!user || user.isAnonymous) {
      showToast("🌸 Please log in to explore this feature!");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);
      return;
    }

    // Redirect based on action
    if (action === "orders") window.location.href = "orders.html";
    else if (action === "cart") window.location.href = "cart.html";
    else if (action === "review") window.location.href = "review.html";
  });
});

// Get elements
const editPopup = document.getElementById("editPopup");
const editBtn = document.querySelector('[data-action="edit"]');
const saveChangesBtn = document.getElementById("saveChangesBtn");

// Show popup for logged-in users
editBtn.addEventListener("click", () => {
  const user = firebase.auth().currentUser;

  if (!user || user.isAnonymous) {
    showToast("Please log in to edit your profile ✍️");
    setTimeout(() => window.location.href = "index.html", 1500);
    return;
  }

  // Pre-fill current name and email
  document.getElementById("editName").value = user.displayName || "";
  document.getElementById("editEmail").value = user.email || "";

  editPopup.style.display = "flex";
});

// Close popup when clicking outside form
editPopup.addEventListener("click", (e) => {
  if (e.target === editPopup) {
    editPopup.style.display = "none";
  }
});

// Save changes
saveChangesBtn.addEventListener("click", () => {
  const newName = document.getElementById("editName").value.trim();
  const newEmail = document.getElementById("editEmail").value.trim();
  const user = firebase.auth().currentUser;

  if (!newName || !newEmail) {
    showToast("Please fill both fields 📝");
    return;
  }

  // Update Firebase Auth Profile
  user.updateProfile({ displayName: newName })
    .then(() => user.updateEmail(newEmail))
    .then(() => {
      showToast("Profile updated successfully ✅");
      editPopup.style.display = "none";

      // Update UI instantly
      userNameEl.innerText = newName;
      userEmailEl.innerText = newEmail;
    })
    .catch((error) => {
      showToast("Update failed: " + error.message);
    });
});
