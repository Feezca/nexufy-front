README for Frontend

Nexufy Frontend
Introduction
Este repositorio contiene el frontend de Nexufy, una plataforma que conecta productores y proveedores de insumos, facilitando la publicación y gestión de productos. La interfaz está desarrollada en React y utiliza varias librerías para un diseño dinámico y responsivo.
Technologies Used
- Framework: React con Vite
- Librerías principales:
  - Axios (para comunicación HTTP)
  - Bootstrap (para diseño responsivo)
  - visx (para gráficos)
  - Moment (para manejo de fechas)
  - SweetAlert2 (para alertas interactivas)
Prerequisites
- Node.js y npm
- Git
Clone the Repository
Clona el repositorio e ingresa en el directorio del proyecto:
```bash
git clone https://github.com/Feezca/nexufy-front.git
cd nexufy-front
```
Configuration and Execution
Instala las dependencias y arranca el servidor de desarrollo:
```bash
npm install
npm run dev
```
El frontend estará disponible en `http://localhost:5173`.
Backend Connection
El frontend está configurado para comunicarse con el backend en `https://nexufy-2.onrender.com`. Asegúrate de que el backend esté funcionando para una funcionalidad completa.
Project Architecture
- Servicios: Servicios como `loginService`, `registerService`, y `getProductsByCustomerId` utilizan `axios` y `fetch` para interactuar con la API del backend.
- Componentes de UI: Se utiliza Bootstrap para el diseño responsivo y visx para gráficos.
Main Features
- Navegación en la plataforma: Todos los usuarios pueden ver listados y buscar productos.
- Gestión de productos: Los administradores pueden crear y gestionar sus propios productos.
- Estadísticas: Los super administradores pueden ver estadísticas sobre productos y usuarios.
Vercel Rewrite Configuration
El archivo `vercel.json` configura los rewrites para conectar el frontend con el backend:
```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://nexufy-2.onrender.com/api/:path*"
    }
  ]
}
```
Usage Instructions
- Registro e inicio de sesión: Los usuarios pueden registrarse e iniciar sesión para acceder a funcionalidades según su rol.
- Preferencias de usuario:
  - Modo Claro-Oscuro.
  - Selección de idioma: español e inglés.
- Publicación de productos: Solo los usuarios con `ROLE_ADMIN` o superior pueden publicar productos.
- Estadísticas: El acceso a estadísticas está restringido a `ROLE_SUPERADMIN`.

