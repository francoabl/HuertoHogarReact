# HuertoHogar - React Application

Aplicación web moderna desarrollada con React, React Router, y Bootstrap 5 para la gestión de productos agrícolas frescos.

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18.3** - Biblioteca de JavaScript para construir interfaces de usuario
- **React Router DOM 6** - Enrutamiento para aplicaciones React
- **Bootstrap 5.3** - Framework CSS para diseño responsive
- **React Bootstrap 2.10** - Componentes Bootstrap como componentes React
- **Vite 5** - Herramienta de construcción rápida
- **Axios** - Cliente HTTP para peticiones API
- **React Hook Form** - Manejo de formularios
- **Font Awesome** - Iconos

### Backend
- **Node.js** + **Express** - API REST
- **MySQL 8.0** - Base de datos
- **JWT** - Autenticación
- **Bcrypt** - Encriptación de contraseñas

## 📋 Requisitos Previos

- Node.js 16+ instalado
- MySQL 8.0+ instalado
- npm o yarn

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd HuertoHogar-main
```

### 2. Instalar dependencias del frontend (React)

```bash
npm install
```

### 3. Instalar dependencias del backend (API)

```bash
cd api
npm install
cd ..
```

### 4. Configurar variables de entorno

Copia el archivo `.env.example` a `.env` en la raíz del proyecto:

```bash
cp .env.example .env
```

Edita el archivo `.env` con tu configuración:

```env
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=HuertoHogar
VITE_APP_VERSION=2.0.0
```

Para el backend (api/.env):

```env
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_NAME=huertohogar_db
DB_USER=root
DB_PASSWORD=tu_password
JWT_SECRET=tu_clave_secreta_jwt
JWT_EXPIRES_IN=7d
CORS_ORIGIN=http://localhost:5173
```

### 5. Configurar la base de datos

Ejecuta el script SQL en MySQL:

```bash
cd api
mysql -u root -p < create_database.sql
```

## 🚀 Ejecutar la Aplicación

### Modo Desarrollo

#### Iniciar el backend (API):

```bash
cd api
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

#### Iniciar el frontend (React):

En otra terminal, desde la raíz del proyecto:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Modo Producción

#### Construir el frontend:

```bash
npm run build
```

#### Previsualizar la construcción:

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
HuertoHogar-main/
├── src-react/                  # Código fuente de React
│   ├── components/             # Componentes reutilizables
│   │   ├── Layout/            # Componentes de diseño
│   │   │   ├── Navigation.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Layout.jsx
│   │   └── ProtectedRoute.jsx # Rutas protegidas
│   ├── context/               # Context API (estado global)
│   │   ├── AuthContext.jsx    # Contexto de autenticación
│   │   └── CartContext.jsx    # Contexto del carrito
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── Home.jsx           # Página principal
│   │   ├── Products.jsx       # Lista de productos
│   │   ├── ProductDetail.jsx  # Detalle de producto
│   │   ├── Cart.jsx           # Carrito de compras
│   │   ├── Login.jsx          # Inicio de sesión
│   │   ├── Register.jsx       # Registro de usuario
│   │   ├── Profile.jsx        # Perfil de usuario
│   │   ├── About.jsx          # Sobre nosotros
│   │   ├── Contact.jsx        # Contacto
│   │   ├── Blog.jsx           # Blog
│   │   ├── BlogDetail.jsx     # Detalle de blog
│   │   └── Admin.jsx          # Panel de administración
│   ├── App.jsx                # Componente principal
│   ├── App.css                # Estilos principales
│   ├── main.jsx               # Punto de entrada
│   └── index.css              # Estilos globales
├── api/                       # Backend (Node.js + Express)
│   ├── config/                # Configuración
│   ├── middleware/            # Middlewares
│   ├── routes/                # Rutas de la API
│   ├── server.js              # Servidor Express
│   └── package.json           # Dependencias del backend
├── public/                    # Archivos públicos
│   └── assets/                # Imágenes y recursos
├── src/                       # Código fuente antiguo (HTML/JS)
├── index.html                 # HTML principal
├── vite.config.js             # Configuración de Vite
├── package.json               # Dependencias del frontend
└── README-REACT.md            # Este archivo
```

## 🔑 Características Principales

### Autenticación
- Sistema de registro e inicio de sesión
- Persistencia de sesión con localStorage
- Rutas protegidas para usuarios autenticados
- Panel de administración para usuarios admin

### Gestión de Productos
- Catálogo de productos con imágenes
- Filtros por categoría y precio
- Búsqueda de productos
- Vista detallada de productos

### Carrito de Compras
- Agregar/eliminar productos
- Modificar cantidades
- Persistencia con localStorage
- Resumen del pedido

### Diseño Responsive
- Optimizado para móviles, tablets y escritorio
- Componentes de Bootstrap adaptables
- Navegación intuitiva

## 🎨 Personalización

### Colores del Tema

Los colores principales se definen en `src-react/index.css`:

```css
:root {
  --primary-green: #2d5016;
  --light-green: #4a7c59;
  --accent-green: #7cb342;
  --fresh-green: #8bc34a;
  --light-bg: #f8fdf4;
  --text-dark: #2c3e50;
}
```

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Construye la aplicación
npm run preview      # Previsualiza la construcción

# Backend
cd api
npm run dev          # Inicia API en modo desarrollo
npm start            # Inicia API en modo producción
```

## 🔒 Seguridad

- Autenticación basada en JWT (backend)
- Validación de formularios en frontend y backend
- Protección CORS
- Rate limiting en API
- Helmet para headers de seguridad

## 🐛 Solución de Problemas

### El frontend no se conecta al backend
- Verifica que el backend esté corriendo en el puerto 3000
- Revisa la variable `VITE_API_URL` en `.env`
- Verifica la configuración CORS en `api/server.js`

### Errores de base de datos
- Asegúrate de que MySQL esté corriendo
- Verifica las credenciales en `api/.env`
- Ejecuta el script `create_database.sql` si no lo has hecho

### Problemas con las imágenes
- Verifica que las imágenes estén en `public/assets/img/productos/`
- Las rutas deben empezar con `/public/`

## 📦 Despliegue

### Frontend (Vite Build)

```bash
npm run build
# Los archivos estarán en la carpeta dist/
```

### Backend

```bash
cd api
npm start
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia ISC.

## 👨‍💻 Autor

Franco - HuertoHogar

## 🙏 Agradecimientos

- Bootstrap por el framework CSS
- React por la biblioteca de UI
- Vite por la herramienta de construcción
- La comunidad open source

---

**Nota:** Esta es una aplicación de demostración. Para uso en producción, implementa las siguientes mejoras:

- Autenticación real con backend (JWT)
- Encriptación de contraseñas con bcrypt
- Validación exhaustiva de datos
- Manejo de errores robusto
- Tests unitarios y de integración
- Optimización de imágenes
- CDN para assets estáticos
- Monitoreo y logging
