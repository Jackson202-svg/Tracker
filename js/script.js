// 1. Setup the Map
const map = L.map('map').setView([90, 0], 2);
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

// 2. Data & Markers
const santaRoute = [
    { name: "North Pole", lat: 90, lng: 0 },
    { name: "Provideniya, Russia", lat: 64.43, lng: -173.23 },
    { name: "Auckland, NZ", lat: -36.84, lng: 174.76 },
    { name: "Sydney, Australia", lat: -33.86, lng: 151.20 },
    { name: "Tokyo, Japan", lat: 35.68, lng: 139.69 },
    { name: "Paris, France", lat: 48.85, lng: 2.35 },
    { name: "New York, USA", lat: 40.71, lng: -74.00 }
];

const santaIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744546.png',
    iconSize: [40, 40], iconAnchor: [20, 20]
});

const marker = L.marker([90, 0], { icon: santaIcon }).addTo(map);
const flightPath = L.polyline([], { color: 'red', dashArray: '5, 10' }).addTo(map);

let currentIndex = 0;
let presents = 0;
let isAudioOn = false;

// 3. Audio Control
function toggleAudio() {
    isAudioOn = !isAudioOn;
    document.getElementById('audio-btn').innerText = isAudioOn ? "🔊 Sound On" : "🔇 Sound Off";
}

// 4. Update Function
function moveSanta() {
    const loc = santaRoute[currentIndex];
    
    marker.setLatLng([loc.lat, loc.lng]);
    flightPath.addLatLng([loc.lat, loc.lng]);
    map.flyTo([loc.lat, loc.lng], 4);
    
    document.getElementById('location').innerText = loc.name;
    presents += 1250000;
    document.getElementById('presents').innerText = presents.toLocaleString();

    if (isAudioOn) {
        const sfx = document.getElementById('santa-sound');
        sfx.currentTime = 0;
        sfx.play();
    }

    currentIndex = (currentIndex + 1) % santaRoute.length;
}

// 5. Snowfall
function snow() {
    const container = document.getElementById('snow');
    const flake = document.createElement('div');
    flake.className = 'snowflake';
    flake.innerHTML = '❄';
    flake.style.left = Math.random() * 100 + 'vw';
    flake.style.animationDuration = (Math.random() * 3 + 2) + 's';
    container.appendChild(flake);
    setTimeout(() => flake.remove(), 5000);
}

// Start
setInterval(moveSanta, 8000); // Move every 8 seconds
setInterval(snow, 200);
moveSanta();
