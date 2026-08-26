document.addEventListener("DOMContentLoaded", () => {
  initConfettiBurst();
  initClickParticles();
  initScrollAnimations();
  initTypingEffect();
  initPhotoLightbox();
  initContentProtection();
});

function initConfettiBurst() {
  if (typeof confetti === "function") {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }
}

function initClickParticles() {
  const emojis = ["✨", "💖", "🎂", "🌸", "⭐"];
  const particleCount = 6;

  document.addEventListener("click", (e) => {
    if (e.target.closest("a, button")) return;

    for (let i = 0; i < particleCount; i++) {
      createParticle(e.clientX, e.clientY, emojis);
    }
  });
}

function createParticle(x, y, emojis) {
  const particle = document.createElement("span");
  particle.className = "click-particle";
  particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  const destinationX = (Math.random() - 0.5) * 120;
  const destinationY = (Math.random() - 0.5) * 120 - 40;

  particle.style.setProperty("--dx", `${destinationX}px`);
  particle.style.setProperty("--dy", `${destinationY}px`);

  document.body.appendChild(particle);

  setTimeout(() => particle.remove(), 1000);
}

function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(
    ".card-hover-item, .gallery-item, .message-card"
  );

  animatedElements.forEach((el) => el.classList.add("reveal-on-scroll"));

  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observerInstance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observerInstance.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach((el) => observer.observe(el));
}

function initTypingEffect() {
  const subtitle = document.querySelector(".subtitle");
  if (!subtitle) return;

  const originalText = subtitle.textContent.trim();
  subtitle.textContent = "";
  let charIndex = 0;

  function typeNextChar() {
    if (charIndex < originalText.length) {
      subtitle.textContent += originalText.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextChar, 40);
    }
  }

  setTimeout(typeNextChar, 500);
}

function initPhotoLightbox() {
  const galleryImages = document.querySelectorAll(".gallery-item img");
  if (galleryImages.length === 0) return;

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  const lightboxImg = document.createElement("img");
  lightboxImg.alt = "Enlarged memory";

  lightbox.appendChild(lightboxImg);
  document.body.appendChild(lightbox);

  galleryImages.forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.style.display = "none";
  });
}

function initContentProtection() {
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });

  document.addEventListener("keydown", (e) => {
    const isControlOrCmd = e.ctrlKey || e.metaKey;
    if (isControlOrCmd && e.key.toLowerCase() === "u") {
      e.preventDefault();
      alert("View Source is disabled.");
    }
  });
}
