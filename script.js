// Koordinat pusat Dusun Jetis, Desa Pakunden, Kecamatan Ngluwar, Magelang
const CENTER_COORDS = [-7.6065, 110.2325]; // Perkiraan, bisa diubah sesuai kebutuhan

// Inisialisasi peta
const map = L.map('map').setView(CENTER_COORDS, 16);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Fungsi untuk menambah marker ke peta
function addMarker(item, iconUrl) {
  const icon = iconUrl ? L.icon({
    iconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  }) : undefined;
  L.marker([item.lat, item.lng], icon ? { icon } : undefined)
    .addTo(map)
    .bindPopup(`<b>${item.nama}</b><br>${item.keterangan || ''}`);
}

// Muat data fasilitas umum
fetch('data/fasilitas.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('fasilitas-list');
    data.forEach(fasilitas => {
      // Tambahkan marker ke peta
      addMarker(fasilitas, fasilitas.icon);
      // Tambahkan ke daftar
      const li = document.createElement('li');
      li.textContent = `${fasilitas.nama} (${fasilitas.jenis})`;
      list.appendChild(li);
    });
  });

// Muat data tempat wisata
fetch('data/wisata.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('wisata-list');
    data.forEach(wisata => {
      // Tambahkan marker ke peta
      addMarker(wisata, wisata.icon);
      // Tambahkan ke daftar
      const li = document.createElement('li');
      li.textContent = wisata.nama;
      list.appendChild(li);
    });
  }); 