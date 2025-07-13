const fs = require('fs');

const geojsonData = JSON.parse(fs.readFileSync('rutas_transcaribe.geojson', 'utf8'));

let count = 0;

geojsonData.features.forEach(feature => {
    if (feature.properties && feature.properties.fuente === 'csv_2025') {
        count++;
    }
});

console.log(`Features con fuente = csv_2025: ${count}`); 