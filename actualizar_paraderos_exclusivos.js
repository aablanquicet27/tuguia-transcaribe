const fs = require('fs');

// Array estático de los 18 paraderos
const paraderosEstaticos = [
  "PATIO PORTAL",
  "MADRE BERNARDA", 
  "LA CASTELLANA",
  "LOS ANGELES",
  "LOS EJECUTIVOS",
  "VILLA OLIMPICA",
  "CUATRO VIENTOS",
  "REPUBLICA DEL LIBANO",
  "ESPAÑA",
  "MARIA AUXILIADORA",
  "EL PRADO",
  "MERCADO BAZURTO",
  "LAS DELICIAS",
  "PIE DE LA POPA",
  "LO AMADOR",
  "CHAMBACU",
  "CENTRO UNO",
  "MUELLE DE LA BODEGUITA"
];

// Mapeo exacto de nombres para buscar en el GeoJSON
const mapeoExacto = {
  "PATIO PORTAL": ["PATIO PORTAL"],
  "MADRE BERNARDA": ["MADRE BERNARDA"],
  "LA CASTELLANA": ["LA CASTELLANA"],
  "LOS ANGELES": ["LOS ANGELES"],
  "LOS EJECUTIVOS": ["LOS EJECUTIVOS"],
  "VILLA OLIMPICA": ["VILLA OLIMPICA"],
  "CUATRO VIENTOS": ["CUATRO VIENTOS"],
  "REPUBLICA DEL LIBANO": ["REPUBLICA DEL LIBANO"],
  "ESPAÑA": ["ESPAÑA"],
  "MARIA AUXILIADORA": ["MARIA AUXILIADORA"],
  "EL PRADO": ["EL PRADO"],
  "MERCADO BAZURTO": ["Bazurto"],
  "LAS DELICIAS": ["LAS DELICIAS"],
  "PIE DE LA POPA": ["La Popa"],
  "LO AMADOR": ["LO AMADOR"],
  "CHAMBACU": ["Chambacú"],
  "CENTRO UNO": ["Centro"],
  "MUELLE DE LA BODEGUITA": ["La Bodeguita"]
};

// Leer el archivo GeoJSON
const geojsonPath = 'rutas_transcaribe.geojson';
const geojsonData = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

console.log('🔍 Buscando paraderos del array estático en el GeoJSON...');
console.log('📊 Total de features en GeoJSON:', geojsonData.features.length);

let encontrados = 0;
let actualizados = 0;
const paraderosEncontrados = [];

// Recorrer cada feature del GeoJSON
geojsonData.features.forEach((feature, index) => {
  if (feature.geometry && feature.geometry.type === "Point" && 
      feature.properties && feature.properties.nombre_paradero) {
    
    const nombreParadero = feature.properties.nombre_paradero;
    
    // Buscar coincidencia exacta
    for (const [nombreEstatico, variantes] of Object.entries(mapeoExacto)) {
      if (variantes.some(variante => nombreParadero === variante)) {
        console.log(`✅ Encontrado: "${nombreParadero}" -> "${nombreEstatico}"`);
        encontrados++;
        paraderosEncontrados.push(nombreEstatico);
        
        // Actualizar la propiedad es_exclusivo
        if (!feature.properties.es_exclusivo) {
          feature.properties.es_exclusivo = true;
          actualizados++;
          console.log(`   🔄 Actualizado es_exclusivo = true`);
        } else {
          console.log(`   ℹ️  Ya tenía es_exclusivo = true`);
        }
        break;
      }
    }
  }
});

console.log('\n📋 Resumen:');
console.log(`✅ Paraderos encontrados: ${encontrados}/${paraderosEstaticos.length}`);
console.log(`🔄 Paraderos actualizados: ${actualizados}`);

// Mostrar los paraderos que no se encontraron
const noEncontrados = paraderosEstaticos.filter(p => !paraderosEncontrados.includes(p));
if (noEncontrados.length > 0) {
  console.log('\n❌ Paraderos NO encontrados:');
  noEncontrados.forEach(nombre => console.log(`   - ${nombre}`));
}

// Mostrar todos los paraderos con es_exclusivo = true
const exclusivos = [];
geojsonData.features.forEach(feature => {
  if (feature.properties && feature.properties.es_exclusivo === true) {
    exclusivos.push(feature.properties.nombre_paradero);
  }
});

console.log('\n📋 Todos los paraderos con es_exclusivo = true:');
exclusivos.forEach(nombre => console.log(`   - ${nombre}`));

// Agregar los paraderos no encontrados como nuevos features
if (noEncontrados.length > 0) {
  const nuevosParaderos = {
    "PATIO PORTAL": { coords: [10.395392, -75.472826] },
    "LOS ANGELES": { coords: [10.395071, -75.490330] },
    "VILLA OLIMPICA": { coords: [10.403742, -75.497435] },
    "REPUBLICA DEL LIBANO": { coords: [10.407340, -75.507542] },
    "ESPAÑA": { coords: [10.408311, -75.512971] },
    "MARIA AUXILIADORA": { coords: [10.408976, -75.515830] },
    "CHAMBACU": { coords: [10.425853, -75.540498] }
  };
  noEncontrados.forEach(nombre => {
    const info = nuevosParaderos[nombre];
    if (info) {
      const feature = {
        type: "Feature",
        properties: {
          nombre_paradero: nombre,
          coordenadas: `${info.coords[0]}, ${info.coords[1]}`,
          rutas: "",
          network: "Transcaribe",
          es_exclusivo: true
        },
        geometry: {
          type: "Point",
          coordinates: [info.coords[1], info.coords[0]] // [lon, lat]
        }
      };
      geojsonData.features.push(feature);
      console.log(`➕ Agregado nuevo paradero: ${nombre}`);
    }
  });
}

// Guardar el archivo actualizado
fs.writeFileSync(geojsonPath, JSON.stringify(geojsonData, null, 2));
console.log(`\n💾 Archivo ${geojsonPath} actualizado exitosamente`); 