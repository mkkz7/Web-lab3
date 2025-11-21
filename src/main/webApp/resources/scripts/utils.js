export function updateClock() {
    const now = new Date();
    const dateString = now.toLocaleDateString(undefined, {day:'numeric', month:'short', year:'numeric'});
    const timeString = now.toLocaleTimeString(undefined, {hour:'2-digit', minute:'2-digit', second:'2-digit'});
    const dateElement = document.getElementById(clientIdDate);
    const timeElement = document.getElementById(clientIdTime);

    if (dateElement && timeElement) {
        dateElement.innerHTML = dateString;
        timeElement.innerHTML = timeString;
    } else {
        console.error("Error: Could not find elements using the injected IDs.");
    }
}