// Countdown to 1 December (her birthday)
const now = new Date();
let year = now.getFullYear();
let target = new Date(year, 1, 18, 0, 0, 0); // 1 Dec, month index 11
if (now > target) {
  year += 1;
  target = new Date(year, 11, 1, 0, 0, 0);
}
const targetMs = target.getTime();

const dEl = document.getElementById("d");
const hEl = document.getElementById("h");
const mEl = document.getElementById("m");
const sEl = document.getElementById("s");

function tick() {
  const current = Date.now();
  const diff = targetMs - current;

  if (diff <= 0) {
    dEl.textContent = "00";
    hEl.textContent = "00";
    mEl.textContent = "00";
    sEl.textContent = "00";
    celebrate();
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs = Math.floor((diff % (1000 * 60)) / 1000);

  dEl.textContent = String(days).padStart(2, "0");
  hEl.textContent = String(hours).padStart(2, "0");
  mEl.textContent = String(mins).padStart(2, "0");
  sEl.textContent = String(secs).padStart(2, "0");

  requestAnimationFrame(tick);
}

requestAnimationFrame(tick);

// Scroll + confetti when button clicked
const wishesSection = document.getElementById("wishes");
const openBtn = document.getElementById("openWishes");
const confettiLayer = document.getElementById("confetti-layer");

openBtn.addEventListener("click", () => {
  // optional: small confetti before leaving
  shootConfetti(200);

  // redirect to your other birthday page
  window.location.href = "file:///F:/Birthday/birthday.html#gallery";
});


function createPiece() {
  const piece = document.createElement("div");
  piece.className = "confetti-bit";
  piece.style.left = Math.random() * 100 + "vw";
  piece.style.animationDuration = 2 + Math.random() * 1.5 + "s";
  confettiLayer.appendChild(piece);
  setTimeout(() => piece.remove(), 3500);
}

function shootConfetti(count = 150) {
  for (let i = 0; i < count; i++) {
    setTimeout(createPiece, i * 8);
  }
}

function celebrate() {
  document.title = "🎂 Happy Birthday, Arpita!";
  shootConfetti(300);
}


