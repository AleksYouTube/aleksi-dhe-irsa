document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-10-28T00:00:00");
  const timerText = document.querySelector(".timer-text");

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerText.textContent = "Countdown complete!";
      clearInterval(timer);
      return;
    }

    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    timerText.textContent = `${days}:${hours}:${minutes}:${seconds}`;
  }

  updateCountdown();
  const timer = setInterval(updateCountdown, 1000);
});
