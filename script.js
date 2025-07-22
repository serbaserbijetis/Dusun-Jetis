// === Widget Jam & Tanggal ===
function updateClock() {
  const now = new Date();
  const hari = ['Minggu','Senin','Selasa','Rabu','Kamis','Jumat','Sabtu'];
  const bulan = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const tgl = `${hari[now.getDay()]}, ${now.getDate()} ${bulan[now.getMonth()]} ${now.getFullYear()}`;
  const jam = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  if (document.getElementById('widget-clock')) {
    document.getElementById('widget-clock').innerHTML = `<span>${tgl}</span><br><strong>${jam}</strong>`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// === Widget Cuaca (Open-Meteo, Magelang) ===
function updateCuaca() {
  // Koordinat Magelang
  const lat = -7.4706, lon = 110.2177;
  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Asia%2FBangkok`)
    .then(res => res.json())
    .then(data => {
      if (!data.current_weather) return;
      const w = data.current_weather;
      const suhu = Math.round(w.temperature);
      const kode = w.weathercode;
      // Ikon cuaca sederhana
      let icon = '☀️';
      let desc = 'Cerah';
      if ([2,3,45,48].includes(kode)) { icon = '⛅'; desc = 'Berawan'; }
      if ([51,53,55,56,57,61,63,65,66,67,80,81,82].includes(kode)) { icon = '🌦️'; desc = 'Hujan'; }
      if ([71,73,75,77,85,86].includes(kode)) { icon = '❄️'; desc = 'Salju'; }
      if ([95,96,99].includes(kode)) { icon = '⛈️'; desc = 'Badai'; }
      if (document.getElementById('widget-cuaca')) {
        document.getElementById('widget-cuaca').innerHTML = `
          <span title="${desc}">${icon}</span>
          <span><strong>${suhu}&deg;C</strong><br><span style="font-size:0.95em">${desc}</span></span>
        `;
      }
    });
}
updateCuaca();
setInterval(updateCuaca, 10*60*1000); 