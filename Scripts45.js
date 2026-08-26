document.addEventListener("DOMContentLoaded", () => {
  // 1. Click-to-Burst Floating Hearts/Sparkles Effect
  document.addEventListener("click", (e) => {
    // Ignore clicks on buttons/links to prevent visual clutter on navigation
    if (e.target.closest("a, button")) return;

    const emojiCount = 6;
    const emojis = ["✨", "💖", "🎂", "🌸", "⭐"];

    for (let i = 0; i < emojiCount; i++) {
      const particle = document.createElement("span");
      particle.className = "click-particle";
      particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      // Position particle at click location
      particle.style.left = `${e.clientX}px`;
      particle.style.top = `${e.clientY}px`;

      // Randomize movement directions
      const destinationX = (Math.random() - 0.5) * 120;
      const destinationY = (Math.random() - 0.5) * 120 - 40;
      particle.style.setProperty("--dx", `${destinationX}px`);
      particle.style.setProperty("--dy", `${destinationY}px`);

      document.body.appendChild(particle);

      // Clean up DOM after animation completes
      setTimeout(() => particle.remove(), 1000);
    }
  });

  // 2. Intersection Observer (Smooth Fade & Slide-In on Scroll)
  const animatedElements = document.querySelectorAll(
    ".card-hover-item, .gallery-item, .message-card"
  );

  animatedElements.forEach((el) => el.classList.add("reveal-on-scroll"));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target); // Animate only once
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach((el) => observer.observe(el));

  // 3. Interactive Typing Animation for Hero Subtitle
  const subtitle = document.querySelector(".subtitle");
  if (subtitle) {
    const originalText = subtitle.textContent.trim();
    subtitle.textContent = "";
    let charIndex = 0;

    function typeWriter() {
      if (charIndex < originalText.length) {
        subtitle.textContent += originalText.charAt(charIndex);
        charIndex++;
        setTimeout(typeWriter, 40);
      }
    }

    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }
});

window.addEventListener("load", () => {
  // Fire confetti burst
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
});

// Create lightbox element dynamically
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.innerHTML = `<img src="" alt="Enlarged memory">`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");

document.querySelectorAll(".gallery-item img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImg.src = img.src;
    lightbox.style.display = "flex";
  });
});

lightbox.addEventListener("click", () => {
  lightbox.style.display = "none";
});
