const CACHE_NAME = 'tu-guia-cartagena-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/yotellevo.html',
  '/logoagapai-ok2.png',
  '/bus_moderno.png',
  '/BUS.jpeg',
  '/pin-morado.png',
  '/pin-verde-destino.png',
  '/paraderos.json',
  '/rutas_transcaribe.geojson',
  'https://unpkg.com/leaflet/dist/leaflet.css',
  'https://unpkg.com/leaflet/dist/leaflet.js',
  'https://unpkg.com/@mapbox/polyline@1.1.1/src/polyline.js',
  'https://maps.googleapis.com/maps/api/js?key=AIzaSyBUadVPYtXGXPX1vWMR5nc3lgSrW-FzUls&libraries=places'
];

// Instalación del Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache abierto');
        return cache.addAll(urlsToCache);
      })
  );
});

// Activación del Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Interceptar peticiones
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Devolver desde cache si existe
        if (response) {
          return response;
        }
        
        // Si no está en cache, hacer petición a red
        return fetch(event.request).then(response => {
          // Verificar que la respuesta sea válida
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clonar la respuesta para cachearla
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // Si falla la red, devolver página offline
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      })
  );
});

// Manejo de notificaciones push (para futuras funcionalidades)
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : '¡Nueva actualización disponible!',
    icon: '/logoagapai-ok2.png',
    badge: '/logoagapai-ok2.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Ver más',
        icon: '/logoagapai-ok2.png'
      },
      {
        action: 'close',
        title: 'Cerrar',
        icon: '/logoagapai-ok2.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Tu Guia Cartagena', options)
  );
});

// Manejo de clics en notificaciones
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
}); 