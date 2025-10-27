# 🚀 HuertoHogar React - Guía de Inicio Rápido

## ⚡ Inicio Rápido (5 minutos)

### 1. Instalar Dependencias

```powershell
# En la raíz del proyecto
npm install
```

### 2. Iniciar la Aplicación

```powershell
# Inicia el servidor de desarrollo
npm run dev
```

La aplicación se abrirá en: **http://localhost:5173**

### 3. (Opcional) Iniciar el Backend

Si quieres probar la integración con el backend:

```powershell
# En otra terminal
cd api
npm install
npm run dev
```

El backend estará en: **http://localhost:3000**

## 📂 Estructura Principal

```
src-react/
├── components/     # Componentes reutilizables
├── context/        # Estado global (Auth, Cart)
├── pages/          # Páginas de la aplicación
├── App.jsx         # Componente principal
└── main.jsx        # Punto de entrada
```

## 🎯 Características Implementadas

- ✅ Página de inicio con hero y features
- ✅ Catálogo de productos con filtros
- ✅ Sistema de autenticación (Login/Registro)
- ✅ Carrito de compras funcional
- ✅ Navegación responsive
- ✅ Context API para estado global
- ✅ Diseño con Bootstrap 5

## 🔑 Páginas Disponibles

| Ruta | Descripción | Estado |
|------|-------------|--------|
| `/` | Página principal | ✅ Completo |
| `/productos` | Catálogo de productos | ✅ Completo |
| `/login` | Inicio de sesión | ✅ Completo |
| `/registro` | Registro de usuarios | ✅ Completo |
| `/carrito` | Carrito de compras | ✅ Completo |
| `/perfil` | Perfil de usuario | 🚧 Esqueleto |
| `/nosotros` | Sobre nosotros | 🚧 Esqueleto |
| `/contacto` | Contacto | 🚧 Esqueleto |
| `/blog` | Blog | 🚧 Esqueleto |
| `/admin` | Administración | 🚧 Esqueleto |

## 🛠️ Scripts Disponibles

```powershell
npm run dev      # Desarrollo (con HMR)
npm run build    # Build para producción
npm run preview  # Previsualizar build
npm run lint     # Ejecutar ESLint
```

## 🔐 Cuentas de Prueba

Puedes crear tu propia cuenta o usar datos de prueba:

**Usuario Demo:**
- Email: `demo@huertohogar.cl`
- Contraseña: `demo1234`

(Nota: Se debe crear manualmente al registrarse la primera vez)

## 🎨 Personalización

### Colores del Tema

Edita `src-react/index.css`:

```css
:root {
  --primary-green: #2d5016;    /* Verde principal */
  --accent-green: #7cb342;      /* Verde acento */
  --fresh-green: #8bc34a;       /* Verde fresco */
  --light-bg: #f8fdf4;          /* Fondo claro */
}
```

## 📱 Responsive

La aplicación es completamente responsive:
- 📱 Mobile: < 768px
- 📱 Tablet: 768px - 991px
- 💻 Desktop: > 992px

## 🐛 Solución Rápida de Problemas

### Puerto ya en uso
```powershell
# Cambia el puerto en vite.config.js
server: { port: 5174 }
```

### Imágenes no se cargan
Las imágenes deben estar en `public/assets/img/productos/`

### Errores de ESLint
```powershell
npm run lint -- --fix
```

## 📚 Documentación Completa

- **README-REACT.md**: Documentación detallada
- **MIGRACION.md**: Guía de migración HTML → React
- **README.md**: Documentación original del proyecto

## 🎯 Próximos Pasos

1. ✅ Explora la aplicación
2. ✅ Crea una cuenta de prueba
3. ✅ Agrega productos al carrito
4. 🚧 Completa las páginas esqueleto
5. 🚧 Integra con el backend real
6. 🚧 Agrega más funcionalidades

## 💡 Tips

- Usa **React DevTools** para debugging
- El estado se guarda en **localStorage**
- Hot reload está habilitado (HMR)
- Bootstrap components en **react-bootstrap**

## 🆘 Ayuda

¿Problemas? Revisa:
1. La consola del navegador (F12)
2. La terminal donde corre `npm run dev`
3. Los archivos de documentación

---

**¡Disfruta desarrollando con React! 🎉**
