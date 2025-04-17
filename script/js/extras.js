function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const natureSound = document.getElementById('natureSound');
  natureSound.loop = true;
  natureSound.volume = 0.5;
  natureSound.play().catch(() => {
    console.warn('Autoplay prevented. Add a play button to start audio.');
  });

  updateClock();
  setInterval(updateClock, 60000);
});