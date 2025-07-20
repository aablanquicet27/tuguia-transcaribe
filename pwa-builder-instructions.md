# 🚀 Generar APK con PWA Builder (Método Fácil)

## Paso 1: Subir tu proyecto a un servidor web

### Opción A: GitHub Pages (Gratis)
1. Crea una cuenta en GitHub.com
2. Crea un nuevo repositorio llamado `tu-guia-cartagena`
3. Sube todos los archivos de tu proyecto
4. Ve a Settings → Pages → Source: Deploy from a branch → main
5. Tu app estará disponible en: `https://tu-usuario.github.io/tu-guia-cartagena`

### Opción B: Netlify (Gratis)
1. Ve a https://netlify.com
2. Arrastra tu carpeta del proyecto
3. Tu app estará disponible en: `https://tu-app.netlify.app`

### Opción C: Vercel (Gratis)
1. Ve a https://vercel.com
2. Conecta tu repositorio de GitHub
3. Tu app estará disponible en: `https://tu-app.vercel.app`

## Paso 2: Generar APK con PWA Builder

1. **Ve a PWA Builder**: https://www.pwabuilder.com

2. **Ingresa la URL** de tu app (ejemplo: `https://tu-usuario.github.io/tu-guia-cartagena`)

3. **PWA Builder analizará** tu app automáticamente

4. **Haz clic en "Build My PWA"**

5. **Selecciona "Android"** y descarga el APK

## Paso 3: Instalar el APK

1. **Transfiere el APK** a tu dispositivo Android
2. **Habilita "Fuentes desconocidas"** en Configuración → Seguridad
3. **Instala el APK** tocando el archivo
4. **¡Listo!** La app aparecerá en tu pantalla de inicio

## 🎯 Ventajas de PWA Builder:

- ✅ **No requiere instalación** de software
- ✅ **Proceso automático** y rápido
- ✅ **APK optimizado** para Android
- ✅ **Gratis** para uso personal
- ✅ **Interfaz web** fácil de usar

## 📱 Características del APK generado:

- **Tamaño**: ~2-5MB
- **Compatibilidad**: Android 5.0+
- **Funcionalidad**: Completa (offline, geolocalización, etc.)
- **Actualizaciones**: Automáticas desde tu servidor web

## 🔧 Si prefieres instalar Node.js:

### Descargar Node.js manualmente:
1. Ve a https://nodejs.org
2. Descarga la versión LTS (recomendada)
3. Instala siguiendo las instrucciones
4. Reinicia tu terminal
5. Ejecuta: `npm install -g @bubblewrap/cli`

### Luego usar Bubblewrap:
```bash
npm install
bubblewrap init --manifest ./manifest.json
bubblewrap build --release
```

## 🚨 Nota Importante:

**Tu app debe estar en HTTPS** para que funcione correctamente como PWA. GitHub Pages, Netlify y Vercel proporcionan HTTPS automáticamente.

## 📞 ¿Necesitas ayuda?

Si tienes problemas con alguno de estos pasos, puedo ayudarte a:
- Configurar GitHub Pages
- Usar Netlify o Vercel
- Resolver problemas con PWA Builder
- Configurar el dominio personalizado 