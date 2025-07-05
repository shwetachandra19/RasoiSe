const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
  if (link.href === window.location.href) {
    link.classList.add("active-link");
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("vendorForm");
  const toast = document.getElementById("toast");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
      form.reset();
    }, 3000);
  });
});
