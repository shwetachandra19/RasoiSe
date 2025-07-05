

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

const envelopes = document.querySelectorAll(".envelope");
const popup = document.getElementById("reviewPopup");
const popupText = document.getElementById("popupText");

// Show review on envelope click
// Use one event listener for ALL envelopes — even new ones
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("envelope")) {
    const reviewText = e.target.getAttribute("data-review");
    const popup = document.getElementById("reviewPopup");
    const popupText = document.getElementById("popupText");

    popupText.innerHTML = reviewText;
    popup.classList.add("active");
  }
});


// Hide popup when clicked anywhere
popup.addEventListener("click", () => {
  popup.classList.remove("active");
});
document.querySelector(".close-btn").addEventListener("click", () => {
  popup.classList.remove("active");
});

let sideToggle = true; // to alternate sides

document.addEventListener("DOMContentLoaded", function () {
  firebase.auth().onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      const reviewBtn = document.querySelector(".write-review-btn");
      const reviewForm = document.querySelector(".review-form");

      if (!reviewBtn || !reviewForm) {
        console.error("Button or form not found in DOM!");
        return;
      }

      reviewBtn.style.display = "block";

      reviewBtn.addEventListener("click", () => {
        reviewForm.style.display =
          reviewForm.style.display === "none" ? "flex" : "none";
      });

      // ✅ Attach form submit handler only when user is logged in
      document.getElementById("submitReview").addEventListener("click", () => {
        const name = document.getElementById("reviewerName").value.trim();
        const review = document.getElementById("userReview").value.trim();

        if (!name || !review) {
          alert("Please fill in both fields.");
          return;
        }

        const newEnv = document.createElement("img");
        newEnv.src = "review/envelope.png";
        newEnv.alt = "User Review";
        newEnv.className = "envelope dynamic-envelope";
        newEnv.setAttribute(
          "data-review",
          `“${review}”<br><br><strong>– ${name}</strong>`
        );

        newEnv.style.top = sideToggle ? "20%" : "60%";
        newEnv.style.left = sideToggle ? "12%" : "68%";
        sideToggle = !sideToggle;

        document.querySelector(".review-section").appendChild(newEnv);

        document.getElementById("reviewerName").value = "";
        document.getElementById("userReview").value = "";

        newEnv.style.opacity = 0;
        setTimeout(() => (newEnv.style.opacity = 1), 100);

        // Show toast
      const toast = document.getElementById("toast");
      toast.innerText = "🌸 Thank you for sharing your thoughts with RasoiSe!";
      toast.classList.add("show");

// Hide after 3 seconds
setTimeout(() => {
  toast.classList.remove("show");
}, 3000);
      });
    }
  });
});


