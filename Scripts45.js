// === Countdown setup ===
// Set target birthday: 1 December of this year
const now = new Date();
let targetYear = now.getFullYear();
let targetDate = new Date(targetYear, 11, 1, 0, 0, 0); // month 11 = Dec

// If this year's 1 Dec has passed, use next year
if (now > targetDate) {
  targetYear += 1;
  targetDate = new Date(targetYear, 11, 1, 0, 0, 0);
}

const countdownTarget = targetDate.getTime();

// Circle lengths (circumference = 2πr, r = 50)
const CIRC = 2 * Math.PI * 50;
const maxDays = 365;

const circles = {
  days: document.getElementById("days-circle"),
  hours: document.getElementById("hours-circle"),
  minutes: document.getElementById("minutes-circle"),
  seconds: document.getElementById("seconds-circle")
};

Object.values(circles).forEach(c => {
  c.style.strokeDasharray = CIRC;
  c.style.strokeDashoffset = CIRC;
});

const confettiContainer = document.getElementById("confetti-container");
let confettiInterval = null;
let finished = false;

function updateCountdown() {
  const current = new Date().getTime();
  const distance = countdownTarget - current;

  if (distance <= 0) {
    document.getElementById("days").textContent = "00";
    document.getElementById("hours").textContent = "00";
    document.getElementById("minutes").textContent = "00";
    document.getElementById("seconds").textContent = "00";

    if (!finished) {
      finished = true;
      launchConfetti();
      flashTitle();
    }
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor(
    (distance % (1000 * 60 * 60)) / (1000 * 60)
  );
  const seconds = Math.floor(
    (distance % (1000 * 60)) / 1000
  );

  document.getElementById("days").textContent = String(days).padStart(2, "0");
  document.getElementById("hours").textContent = String(hours).padStart(2, "0");
  document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");

  // Circle progress (0 = full, CIRC = empty)
  const dayRatio = Math.min(days / maxDays, 1);
  circles.days.style.strokeDashoffset = CIRC * dayRatio;

  const hourRatio = hours / 24;
  circles.hours.style.strokeDashoffset = CIRC * hourRatio;

  const minRatio = minutes / 60;
  circles.minutes.style.strokeDashoffset = CIRC * minRatio;

  const secRatio = seconds / 60;
  circles.seconds.style.strokeDashoffset = CIRC * secRatio;

  requestAnimationFrame(updateCountdown);
}

requestAnimationFrame(updateCountdown);

// === Confetti ===

function createConfettiPiece() {
  const confetti = document.createElement("div");
  confetti.classList.add("confetti");
  confetti.style.left = Math.random() * 100 + "vw";
  confetti.style.animationDuration = 2.5 + Math.random() * 1.5 + "s";
  confetti.style.transform = `translate3d(0, -100%, 0) rotate(${Math.random() * 360}deg)`;
  confettiContainer.appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 4000);
}

function launchConfetti() {
  if (confettiInterval) return;
  confettiInterval = setInterval(() => {
    for (let i = 0; i < 12; i++) {
      createConfettiPiece();
    }
  }, 250);

  // stop after 7 seconds
  setTimeout(() => {
    clearInterval(confettiInterval);
  }, 7000);
}

// Small tab-title effect when time is up
function flashTitle() {
  const original = document.title;
  let flag = false;
  const interval = setInterval(() => {
    document.title = flag
      ? "🎂 Happy Birthday, Shaguna!"
      : original;
    flag = !flag;
  }, 900);

  setTimeout(() => {
    clearInterval(interval);
    document.title = original;
  }, 9000);
}
