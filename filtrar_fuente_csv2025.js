const fs = require('fs');

const archivo = 'rutas_transcaribe.geojson';
const respaldo = 'rutas_transcaribe_backup.geojson';

// Leer y respaldar el archivo original
const geojsonData = JSON.parse(fs.readFileSync(archivo, 'utf8'));
fs.writeFileSync(respaldo, JSON.stringify(geojsonData, null, 2));

// Filtrar features con fuente = 'csv_2025'
const featuresFiltrados = geojsonData.features.filter(f => f.properties && f.properties.fuente === 'csv_2025');

const nuevoGeojson = {
  ...geojsonData,
  features: featuresFiltrados
};

fs.writeFileSync(archivo, JSON.stringify(nuevoGeojson, null, 2));

console.log(`Archivo filtrado. Features restantes: ${featuresFiltrados.length}`);
console.log(`Respaldo creado en: ${respaldo}`); 