// Initialize the Map
const map = L.map('map').setView([0, 0], 2);

// Add a dark, festive map layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

// Santa's Route (Simplified for example)
const route = [
    { name: "North Pole", lat: 90, lng: 0 },
    { name: "Tokyo, Japan", lat: 35.6895, lng: 139.6917 },
    { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093 },
    { name: "Paris, France", lat: 48.8566, lng: 2.3522 },
    { name: "New York, USA", lat: 40.7128, lng: -74.0060 },
    { name: "The North Pole", lat: 90, lng: 0 }
];

let currentIndex = 0;
let presentsDelivered = 0;

// Custom Santa Icon
const santaIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/744/744546.png', // Sleigh icon
    iconSize: [40, 40],
    iconAnchor: [20, 20]
});

const marker = L.marker([90, 0], { icon: santaIcon }).addTo(map);

function updateSanta() {
    const destination = route[currentIndex];
    
    // Update Marker position
    marker.setLatLng([destination.lat, destination.lng]);
    map.flyTo([destination.lat, destination.lng], 4);

    // Update Dashboard
    document.getElementById('location').innerText = destination.name;
    presentsDelivered += Math.floor(Math.random() * 1000000);
    document.getElementById('presents').innerText = presentsDelivered.toLocaleString();

    // Loop through the route
    currentIndex = (currentIndex + 1) % route.length;
}

// Move Santa every 5 seconds
setInterval(updateSanta, 5000);
updateSanta();
