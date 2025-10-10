document.addEventListener("DOMContentLoaded", () => {
  const targetDate = new Date("2025-10-10T23:50:00");

  // const targetDate = new Date();
  // targetDate.setSeconds(targetDate.getSeconds() + 7);

  const timerText = document.querySelector(".timer-text");
  const image = document.querySelector(".image");
  const img = document.querySelector(".image img");

  var isDate = (targetDate - new Date()) <= 0;
  var didThing = false;

  function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
      timerText.textContent = "00:00:00:00";
      clearInterval(timer);
      
      // Fade out timer and fade in image
      setTimeout(() => {
        timerText.style.opacity = "0";
        setTimeout(() => {
          image.style.opacity = "1";
          img.style.opacity = "1";
        }, 1000); // Start fading in image after timer is completely gone (1s transition)
      }, 100);
      
      return;
    }

    const days = String(Math.floor(diff / (1000 * 60 * 60 * 24))).padStart(2, '0');
    const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, '0');

    timerText.textContent = `${days}:${hours}:${minutes}:${seconds}`;
  }

  if (!isDate) updateCountdown();
  else if (!didThing) {
    timerText.style.opacity = "0";
    timerText.textContent = '';
    image.style.opacity = "1";
    img.style.opacity = "1";

    didThing = true;
  }
  const timer = setInterval(updateCountdown, 1000);
});
