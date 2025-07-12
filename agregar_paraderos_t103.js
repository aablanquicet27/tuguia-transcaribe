const fs = require('fs');
const path = require('path');

const geojsonPath = 'rutas_transcaribe.geojson';
const csvPath = 'PARADEROS_T103.csv';

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));
const csv = fs.readFileSync(csvPath, 'utf8');

const lines = csv.trim().split('\n');
const headers = lines[0].split(';');

for (let i = 1; i < lines.length; i++) {
  const row = lines[i].split(';');
  if (row.length < 5) continue;
  const nombre = row[0].trim();
  const coords = row[1].split(',').map(s => parseFloat(s.trim()));
  const ruta = row[2].trim();
  const network = row[3].trim();
  const tipoRuta = row[4].trim();
  if (isNaN(coords[0]) || isNaN(coords[1])) continue;
  geojson.features.push({
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [coords[1], coords[0]] },
    properties: {
      nombre_paradero: nombre,
      coordenadas: `${coords[0]}, ${coords[1]}`,
      rutas: ruta,
      network: network,
      tipos_ruta: tipoRuta,
      fuente: 'csv_2025'
    }
  });
}

fs.writeFileSync(geojsonPath, JSON.stringify(geojson, null, 2));
console.log('Paraderos T103 agregados a rutas_transcaribe.geojson'); 