@echo off
echo ========================================
echo    TU GUIA CARTAGENA - BUILD ANDROID
echo ========================================
echo.

echo [1/6] Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no está instalado
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)
echo ✓ Node.js encontrado

echo.
echo [2/6] Instalando dependencias...
npm install
if errorlevel 1 (
    echo ERROR: Fallo al instalar dependencias
    pause
    exit /b 1
)
echo ✓ Dependencias instaladas

echo.
echo [3/6] Instalando Bubblewrap CLI...
npm install -g @bubblewrap/cli
if errorlevel 1 (
    echo ERROR: Fallo al instalar Bubblewrap
    pause
    exit /b 1
)
echo ✓ Bubblewrap instalado

echo.
echo [4/6] Inicializando proyecto Android...
bubblewrap init --manifest ./manifest.json
if errorlevel 1 (
    echo ERROR: Fallo al inicializar Bubblewrap
    pause
    exit /b 1
)
echo ✓ Proyecto Android inicializado

echo.
echo [5/6] Generando APK de debug...
bubblewrap build
if errorlevel 1 (
    echo ERROR: Fallo al generar APK
    pause
    exit /b 1
)
echo ✓ APK de debug generado

echo.
echo [6/6] Generando APK de producción...
bubblewrap build --release
if errorlevel 1 (
    echo ERROR: Fallo al generar APK de producción
    pause
    exit /b 1
)
echo ✓ APK de producción generado

echo.
echo ========================================
echo    ¡BUILD COMPLETADO EXITOSAMENTE!
echo ========================================
echo.
echo Los archivos APK se encuentran en:
echo - Debug: app-debug.apk
echo - Producción: app-release.apk
echo.
echo Próximos pasos:
echo 1. Probar el APK en tu dispositivo Android
echo 2. Subir el APK a Google Play Console
echo 3. Completar la información de la app
echo 4. Enviar para revisión
echo.
pause 