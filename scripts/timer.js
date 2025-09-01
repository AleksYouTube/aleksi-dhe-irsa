// Set your target date and time
const targetDate = new Date("2025-09-28T00:00:00");

function updateCountdown() {
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    document.getElementById("timer").textContent = "Countdown complete!";
    clearInterval(timer);
    return;
  }

  var days = Math.floor(diff / (1000 * 60 * 60 * 24));
  var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  var minutes = Math.floor((diff / (1000 * 60)) % 60);
  var seconds = Math.floor((diff / 1000) % 60);

  if (days < 10) days = '0' + days;
  if (hours < 10) hours = '0' + hours;
  if (minutes < 10) minutes = '0' + minutes;
  if (seconds < 10) seconds = '0' + seconds;

  document.getElementById("timer").textContent = `${days}:${hours}:${minutes}:${seconds}`;
}

updateCountdown(); // Initial call
const timer = setInterval(updateCountdown, 1000); // Update every second
