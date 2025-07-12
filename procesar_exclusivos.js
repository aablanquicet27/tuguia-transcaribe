const fs = require('fs');

const geojsonPath = 'rutas_transcaribe.geojson';
const paraderosJsonPath = 'paraderos.json';

const geojson = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));
const paraderos = JSON.parse(fs.readFileSync(paraderosJsonPath, 'utf8'));

function normalizarNombre(nombre) {
  return (nombre || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\s+/g, ' ').trim();
}

let actualizados = 0, agregados = 0;

paraderos.forEach(p => {
  const nombreNorm = normalizarNombre(p.nombre);
  // Buscar por nombre normalizado o coordenadas cercanas (tolerancia 0.0002 grados ~20m)
  let feature = geojson.features.find(f => {
    if (!f.properties || !f.geometry || f.geometry.type !== 'Point') return false;
    const nombreGeo = normalizarNombre(f.properties.nombre_paradero);
    const coords = f.geometry.coordinates;
    const lat = coords[1], lon = coords[0];
    const latOk = Math.abs(lat - p.coords[0]) < 0.0002;
    const lonOk = Math.abs(lon - p.coords[1]) < 0.0002;
    return nombreGeo === nombreNorm || (latOk && lonOk);
  });
  if (feature) {
    // Actualizar nombre y coordenadas
    feature.properties.nombre_paradero = p.nombre;
    feature.geometry.coordinates = [p.coords[1], p.coords[0]];
    feature.properties.coordenadas = `${p.coords[0]}, ${p.coords[1]}`;
    feature.properties.es_exclusivo = true;
    actualizados++;
  } else {
    // Agregar nuevo feature
    geojson.features.push({
      type: 'Feature',
      geometry: { type: 'Point', coordinates: [p.coords[1], p.coords[0]] },
      properties: {
        nombre_paradero: p.nombre,
        coordenadas: `${p.coords[0]}, ${p.coords[1]}`,
        es_exclusivo: true
      }
    });
    agregados++;
  }
});

fs.writeFileSync(geojsonPath, JSON.stringify(geojson, null, 2));
console.log(`Actualizados: ${actualizados}, Agregados: ${agregados}`); 