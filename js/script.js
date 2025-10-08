document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map').setView([48.8566, 2.3522], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  L.marker([48.8566, 2.3522]).addTo(map)
    .bindPopup('Paris')
    .openPopup();
});

