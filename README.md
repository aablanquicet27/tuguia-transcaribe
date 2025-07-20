# Tu Guia Cartagena - Aplicación Móvil

Tu guía turística completa para Cartagena de Indias. Encuentra rutas, paraderos de Transcaribe y planifica tu viaje.

## 🚀 Características

- ✅ **PWA (Progressive Web App)** - Instalable en Android
- ✅ **Funcionalidad Offline** - Service Worker para trabajar sin internet
- ✅ **Geolocalización** - Ubicación en tiempo real
- ✅ **Rutas Transcaribe** - Paraderos y rutas del sistema de transporte
- ✅ **Interfaz Responsiva** - Optimizada para móviles
- ✅ **Notificaciones Push** - Para futuras actualizaciones

## 📱 Instalación en Android

### Opción 1: Instalación Directa (PWA)
1. Abre la aplicación en Chrome Android
2. Toca el menú (⋮) → "Instalar aplicación"
3. Confirma la instalación
4. La app aparecerá en tu pantalla de inicio

### Opción 2: Generar APK (Recomendado para Play Store)

## 🛠️ Preparación para Play Store

### Prerrequisitos
- Node.js 14+ instalado
- Java JDK 11+ instalado
- Android Studio instalado
- Cuenta de Google Play Console

### 1. Instalar Dependencias
```bash
npm install
npm install -g @bubblewrap/cli
```

### 2. Configurar Bubblewrap
```bash
# Inicializar proyecto Bubblewrap
bubblewrap init --manifest https://tu-dominio.com/manifest.json

# O usar configuración local
bubblewrap init --manifest ./manifest.json
```

### 3. Generar APK
```bash
# Construir APK de debug
bubblewrap build

# Construir APK firmado para producción
bubblewrap build --release
```

### 4. Configurar Firma Digital
```bash
# Generar keystore para firma
keytool -genkey -v -keystore android.keystore -alias android -keyalg RSA -keysize 2048 -validity 10000
```

## 📋 Preparación para Google Play Store

### 1. Crear Cuenta de Desarrollador
- Ve a [Google Play Console](https://play.google.com/console)
- Paga la cuota única de $25 USD
- Completa la información de tu cuenta

### 2. Crear Nueva Aplicación
1. En Play Console → "Crear aplicación"
2. Selecciona "Aplicación"
3. Completa la información básica:
   - **Nombre**: Tu Guia Cartagena
   - **Idioma predeterminado**: Español
   - **Aplicación o juego**: Aplicación
   - **Gratuita o de pago**: Gratuita

### 3. Configurar Información de la App

#### Información de la aplicación:
- **Nombre**: Tu Guia Cartagena
- **Descripción corta**: Tu guía turística completa para Cartagena
- **Descripción completa**: 
```
Tu Guia Cartagena es tu compañero perfecto para explorar la hermosa ciudad de Cartagena de Indias. 

✨ CARACTERÍSTICAS:
• 🗺️ Mapas interactivos con rutas de Transcaribe
• 🚌 Paraderos y horarios del sistema de transporte
• 📍 Geolocalización en tiempo real
• 🛣️ Planificación de rutas optimizadas
• 🏨 Búsqueda de hoteles, restaurantes y sitios turísticos
• 📱 Funciona offline
• 🎯 Interfaz intuitiva y fácil de usar

🚌 SISTEMA TRANSCARIBE:
• Rutas troncales, pretroncales y alimentadoras
• Paraderos con información detallada
• Horarios y frecuencias
• Cálculo de rutas óptimas

🌍 EXPLORA CARTAGENA:
• Sitios turísticos históricos
• Restaurantes y gastronomía local
• Hoteles y alojamientos
• Playas y actividades recreativas

Descarga ahora y descubre la magia de Cartagena de Indias con la mejor guía turística disponible.
```

#### Categorías:
- **Categoría principal**: Viajes y locales
- **Categoría secundaria**: Estilo de vida

#### Etiquetas:
- cartagena, turismo, transcaribe, rutas, guía, viajes, colombia

### 4. Subir APK

#### Versión de producción:
1. Ve a "Producción" → "Versiones de la app"
2. Crea nueva versión
3. Sube el APK generado con Bubblewrap
4. Completa la información de la versión

#### Información de la versión:
- **Notas de la versión**:
```
🎉 Primera versión de Tu Guia Cartagena

✨ Nuevas características:
• Interfaz completamente rediseñada
• Mapas interactivos con Transcaribe
• Geolocalización en tiempo real
• Búsqueda de lugares turísticos
• Funcionalidad offline
• Optimización para móviles

🚌 Sistema Transcaribe integrado:
• Todas las rutas y paraderos
• Cálculo de rutas óptimas
• Información en tiempo real

🌍 Exploración de Cartagena:
• Sitios turísticos históricos
• Restaurantes y hoteles
• Playas y actividades

¡Descarga y disfruta de la mejor experiencia turística en Cartagena!
```

### 5. Configurar Contenido de la App

#### Capturas de pantalla:
- **Teléfono**: 1080x1920px (mínimo 2, máximo 8)
- **Tablet 7"**: 1200x1920px
- **Tablet 10"**: 1920x1200px

#### Imagen destacada:
- **Resolución**: 1024x500px
- **Formato**: PNG o JPEG

#### Icono de la app:
- **Resolución**: 512x512px
- **Formato**: PNG

### 6. Configurar Precios y Distribución

#### Precios:
- **Modelo de monetización**: Gratuita
- **Países**: Colombia (o todos los países)

#### Clasificación de contenido:
- **Clasificación**: 3+ (Todos)
- **Contenido**: Sin contenido inapropiado

### 7. Revisión y Publicación

1. **Revisar toda la información**
2. **Guardar borrador**
3. **Enviar para revisión**
4. **Esperar aprobación** (1-3 días)

## 🔧 Comandos Útiles

```bash
# Servir aplicación localmente
npm start

# Validar configuración PWA
bubblewrap validate

# Actualizar configuración
bubblewrap update

# Instalar en dispositivo conectado
bubblewrap install

# Generar APK de debug
bubblewrap build

# Generar APK de producción
bubblewrap build --release
```

## 📁 Estructura del Proyecto

```
public/
├── index.html              # Página principal
├── yotellevo.html          # Página secundaria
├── manifest.json           # Configuración PWA
├── sw.js                   # Service Worker
├── package.json            # Dependencias Node.js
├── bubblewrap.json         # Configuración Android
├── logoagapai-ok2.png      # Icono de la app
├── paraderos.json          # Datos de paraderos
├── rutas_transcaribe.geojson # Rutas del sistema
└── README.md               # Este archivo
```

## 🚨 Notas Importantes

1. **Dominio HTTPS**: La PWA debe estar en HTTPS para funcionar correctamente
2. **Iconos**: Asegúrate de tener iconos en 192x192 y 512x512px
3. **Testing**: Prueba la app en diferentes dispositivos Android
4. **Actualizaciones**: Mantén la app actualizada regularmente

## 📞 Soporte

Para soporte técnico o preguntas:
- Email: soporte@agapai.com.co
- Web: https://brochure.agapai.com.co/

---

**Desarrollado por AGAPAI** 🚀 