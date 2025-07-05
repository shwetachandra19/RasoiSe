// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA_6Zi8DFf8LvStIhQTu1ODXUvMkHkSsD4",
  authDomain: "rasoise-30b63.firebaseapp.com",
  projectId: "rasoise-30b63",
  storageBucket: "rasoise-30b63.firebasestorage.app",
  messagingSenderId: "726867909900",
  appId: "1:726867909900:web:323a84c0897db4c1653d29",
  measurementId: "G-XJT4E655TC"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

let isLogin = true;

// Wait until DOM is ready
window.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const passwordToggle = document.querySelector(".toggle-password");
  const guestBtn = document.querySelector(".guest-btn");
  const toggleAuthBtn = document.getElementById("toggle-auth");
  const toggleText = document.getElementById("toggle-text");
  const fullNameField = document.getElementById("fullname");
  const loginBtn = document.querySelector(".login-btn");

  if (!form || !toggleAuthBtn || !fullNameField || !loginBtn) {
    console.error("One or more elements not found in DOM");
    return;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.querySelector('input[type="email"]').value;
    const password = document.getElementById("password").value;
    const fullName = fullNameField.value;

    if (isLogin) {
      auth.signInWithEmailAndPassword(email, password)
        .then(() => {
          showToast("Login successful!", "success");
          setTimeout(() => {
            window.location.href = "home.html";
          }, 1500);
        })
        .catch((err) => showToast(err.message, "error"));
    } else {
      auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          return userCredential.user.updateProfile({ displayName: fullName });
        })
        .then(() => {
          showToast("Account created successfully!", "success");
          setTimeout(() => {
            window.location.href = "home.html";
          }, 1500);
        })
        .catch((err) => showToast(err.message, "error"));
    }
  });

  // Toggle show/hide password
  passwordToggle?.addEventListener("click", () => {
    const passwordInput = document.getElementById("password");
    const isVisible = passwordInput.type === "text";
    passwordInput.type = isVisible ? "password" : "text";
    passwordToggle.textContent = isVisible ? "👁️" : "🙈";
  });

  // Guest login
  guestBtn?.addEventListener("click", () => {
  firebase.auth().signInAnonymously()
    .then(() => {
      // Successfully signed in as guest
      window.location.href = "home.html";
    })
    .catch((error) => {
      console.error("Guest login failed:", error);
      alert("Something went wrong while logging in as guest.");
    });
});


  // Toggle login <-> sign up
  toggleAuthBtn.addEventListener("click", (e) => {
    e.preventDefault();
    isLogin = !isLogin;

    loginBtn.innerText = isLogin ? "Log In" : "Sign Up";
    toggleText.innerText = isLogin ? "Don't have an account?" : "Already have an account?";
    toggleAuthBtn.innerText = isLogin ? "Sign Up" : "Log In";

    fullNameField.classList.toggle("hidden", isLogin);
  });
});

const forgotPasswordBtn = document.getElementById("forgot-password");

forgotPasswordBtn?.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.querySelector('input[type="email"]').value;

  if (!email) {
    showToast("Please enter your email first", "error");
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(() => {
      showToast("Password reset link sent to your email", "success");
    })
    .catch((error) => {
      showToast(error.message, "error");
    });
});


// Toast messages
function showToast(message, type) {
  let toast = document.createElement("div");
  toast.className = `custom-toast ${type}`;
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
