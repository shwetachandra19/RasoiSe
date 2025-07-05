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


const text = "RasoiSe — Serving Emotions On a Platter...";
  let index = 0;
  const typewriter = document.getElementById("typewriter");

  function typeEffect() {
    if (index < text.length) {
      typewriter.innerHTML += text.charAt(index);
      index++;
      setTimeout(typeEffect, 80);
    }
  }
  window.onload = typeEffect;
 

 
  const button = document.querySelector('.explore-btn');
  button.addEventListener('mousemove', function(e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const moveX = (x / rect.width - 0.5) * 10;
    const moveY = (y / rect.height - 0.5) * 10;
    this.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.03)`;
  });

  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translate(0, 0) scale(1)';
  });


