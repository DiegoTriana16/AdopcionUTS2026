Pasos para Desplegar y Correr el Proyecto
1. Clonar el Repositorio
Abrir la terminal o consola y ejecutar:

Bash
git clone https://github.com/DiegoTriana16/AdopcionUTS2026.git
cd AdopcionUTS2026
2. Iniciar el Servidor (AdopcionServer)
Abrir una terminal en VS Code y ejecutar:

Bash
# Entrar a la carpeta del servidor
cd AdopcionServer

# Instalar dependencias
npm install

# Iniciar el servidor
npm start  # o npm run dev
💡 Nota: El servidor quedará escuchando en el puerto configurado (ejemplo: http://localhost:3000).

3. Iniciar la App Móvil (Adopcion-UTS)
Abrir una segunda terminal en VS Code (sin cerrar la del servidor) y ejecutar:

Bash
# Entrar a la carpeta de la app
cd Adopcion-UTS

# Instalar dependencias
npm install

# Crear el archivo de entorno local si aplica
# Reemplazar las credenciales con las de prueba/Firebase
cp .env.example .env

# Iniciar Expo
npx expo start
📱 ¿Cómo probar la App?
En la terminal de Adopcion-UTS aparecerá un código QR grandes en pantalla.

Abrir la app Expo Go en el celular.

Escanear el código QR:

Android: Directamente desde la opción "Scan QR code" dentro de Expo Go.

iPhone: Escanearlo con la cámara del celular y abrir en Expo Go version 57

https://www.apkmirror.com/apk/expo-project/expo-go/expo-go-57-0-9-release/expo-go-57-0-9-android-apk-download/

¡Listo! La app se cargará e interactuará con el servidor backend local.
