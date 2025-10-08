// js/script.js

document.addEventListener('DOMContentLoaded', () => {
  // Création de la carte
  const map = L.map('map').setView([20, 0], 2);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
  }).addTo(map);

  // URL du fichier CSV Google Sheets
  const sheetUrl = "https://docs.google.com/spreadsheets/d/11MbzssrhE91RW_f9aJUMsont8XX9M4UrH1scD7mxl2s/export?format=csv&id=11MbzssrhE91RW_f9aJUMsont8XX9M4UrH1scD7mxl2s&gid=0";

  // Fonction pour convertir un CSV en tableau d'objets
  function csvToArray(str) {
    const rows = str.trim().split("\n").map(r => r.split(","));
    const headers = rows[0];
    const data = [];

    for (let i = 1; i < rows.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j].trim()] = rows[i][j].trim();
      }
      data.push(obj);
    }
    return data;
  }

  // Charger et afficher les données
  fetch(sheetUrl)
    .then(response => response.text())
    .then(csvText => {
      const data = csvToArray(csvText);

      console.log("✅ Données chargées :", data);

      const copList = document.getElementById('cop-list');

      data.forEach(cop => {
        // Marqueur temporaire par défaut (Paris)
        const marker = L.marker([48.8566, 2.3522]).addTo(map);

        marker.bindPopup(`
          <b>${cop["COP"] || "COP"}</b><br>
          ${cop["LOCALISATION"] || ""}<br>
          Année : ${cop["ANNEE"] || ""}<br>
          <p>${cop["INFORMATIONS"] || ""}</p>
        `);

        // Ajouter au panneau latéral
        const item = document.createElement('div');
        item.className = 'cop-item';
        item.textContent = `${cop["COP"]} (${cop["ANNEE"]}) – ${cop["LOCALISATION"]}`;
        item.onclick = () => {
          map.setView([48.8566, 2.3522], 5);
          marker.openPopup();
        };
        copList.appendChild(item);
      });
    })
    .catch(err => console.error("Erreur de chargement du Google Sheet :", err));
});

