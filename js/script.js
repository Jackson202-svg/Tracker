// 1. Initialize the map
const map = L.map('map', {
    center: [20, 0],
    zoom: 2,
    worldCopyJump: true
});

// 2. Add a Dark-Mode festive map layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// 3. Real-World Route Data
const santaRoute = [
    { name: "North Pole", lat: 90, lng: 0 },
    { name: "Provideniya, Russia", lat: 64.43, lng: -173.23 },
    { name: "Auckland, NZ", lat: -36.84, lng: 174.76 },
    { name: "Sydney, Australia", lat: -33.86, lng: 151.20 },
    { name: "Tokyo, Japan", lat: 35.68, lng: 139.69 },
    { name: "Beijing, China", lat: 39.90, lng: 116.40 },
    { name: "New Delhi, India", lat: 28.61, lng: 77.20 },
    { name: "Dubai, UAE", lat: 25.20, lng: 55.27 },
    { name: "Paris, France", lat: 48.85, lng: 2.35 },
    { name: "London, UK", lat: 51.50, lng: -0.12 },
    { name: "New York, USA", lat: 40.71, lng: -74.00 },
    { name: "Vancouver, Canada", lat: 49.28, lng: -123.12 },
    { name: "Honolulu, Hawaii", lat: 21.30, lng: -157.85 }
];

// 4. Santa Icon
const santaIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744546.png',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

let currentIndex = 0;
let presents = 0;
const marker = L.marker([90, 0], { icon: santaIcon }).addTo(map);

// 5. Update Function
function trackSanta() {
    const destination = santaRoute[currentIndex];
    
    // Smoothly fly to Santa
    marker.setLatLng([destination.lat, destination.lng]);
    map.flyTo([destination.lat, destination.lng], 4, { duration: 2 });

    // Update UI
    document.getElementById('location').innerText = destination.name;
    
    // Randomize presents delivered (for "realism")
    presents += Math.floor(Math.random() * 500000) + 1000000;
    document.getElementById('presents').innerText = presents.toLocaleString();

    // Loop through locations
    currentIndex = (currentIndex + 1) % santaRoute.length;
}

// Start tracking every 10 seconds
setInterval(trackSanta, 10000);
trackSanta();
