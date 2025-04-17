async function getRandomQuote() {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        
        document.getElementById('quote').textContent = `"${data.content}"`;
        document.getElementById('author').textContent = `— ${data.author}`;
    } catch (error) {
        document.getElementById('quote').textContent = "whosoever desires constant success must change his conduct with the times.";
        document.getElementById('author').textContent = "— Niccolò Machiavelli.";
    }
}

function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}

document.addEventListener('DOMContentLoaded', () => {
    getRandomQuote();
    updateClock();
    setInterval(updateClock, 60000);
});