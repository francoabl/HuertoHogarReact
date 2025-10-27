# 🎯 Quick Reference - HuertoHogar React

## 🚀 Comandos Rápidos

```powershell
npm run dev      # Iniciar desarrollo (localhost:5173)
npm run build    # Build producción
npm run preview  # Previsualizar build
npm run lint     # ESLint
```

## 📁 Estructura

```
src-react/
├── components/   # Componentes reutilizables
├── context/      # Estado global (Auth, Cart)
├── pages/        # Páginas de la app
├── App.jsx       # Rutas principales
└── main.jsx      # Entry point
```

## 🔑 Hooks Principales

### useAuth()
```javascript
const { 
  currentUser,      // Usuario actual
  login,            // (email, password, remember)
  register,         // (userData)
  logout,           // ()
  isAdmin,          // ()
  isAuthenticated   // boolean
} = useAuth()
```

### useCart()
```javascript
const { 
  cart,                // Array de productos
  addToCart,           // (product, quantity)
  removeFromCart,      // (productId)
  updateQuantity,      // (productId, quantity)
  clearCart,           // ()
  getCartCount,        // ()
  getCartTotal,        // ()
  isInCart,            // (productId)
  getProductQuantity   // (productId)
} = useCart()
```

## 🎨 Variables CSS

```css
--primary-green: #2d5016
--accent-green: #7cb342
--fresh-green: #8bc34a
--light-bg: #f8fdf4
--text-dark: #2c3e50
```

## 📱 Rutas

| Ruta | Componente | Protegida |
|------|-----------|-----------|
| `/` | Home | No |
| `/productos` | Products | No |
| `/login` | Login | No |
| `/registro` | Register | No |
| `/carrito` | Cart | No |
| `/perfil` | Profile | Sí |
| `/admin` | Admin | Sí (Admin) |

## 🧩 Componentes Bootstrap

```javascript
import { Button, Card, Form, Nav, Container } from 'react-bootstrap'

<Button variant="primary">Clic</Button>
<Card>...</Card>
<Form>...</Form>
<Nav>...</Nav>
<Container>...</Container>
```

## 🔗 Navegación

```javascript
import { Link, useNavigate } from 'react-router-dom'

// Link
<Link to="/productos">Productos</Link>

// Navegación programática
const navigate = useNavigate()
navigate('/productos')
```

## 📝 Formularios

```javascript
const [formData, setFormData] = useState({ email: '', password: '' })

const handleChange = (e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
}

<Form.Control
  name="email"
  value={formData.email}
  onChange={handleChange}
/>
```

## ✅ Estado

```javascript
// Local
const [count, setCount] = useState(0)

// Global
const { currentUser } = useAuth()
const { cart } = useCart()
```

## 🎯 Crear Componente

```javascript
// src-react/components/MiComponente.jsx
import { Container } from 'react-bootstrap'
import './MiComponente.css'

const MiComponente = () => {
  return (
    <Container>
      <h1>Hola</h1>
    </Container>
  )
}

export default MiComponente
```

## 🛡️ Ruta Protegida

```javascript
<Route 
  path="/perfil" 
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  } 
/>
```

## 📦 Dependencias Principales

- React 18.3
- React Router 6
- Bootstrap 5.3
- React Bootstrap 2.10
- Vite 5
- Axios 1.7

## 🌐 URLs

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:3000

## 📚 Docs

- `README-REACT.md` - Completa
- `MIGRACION.md` - Guía migración
- `INICIO-RAPIDO.md` - Quick start
- `TRANSFORMACION-COMPLETA.md` - Todo

## 🎉 Estado

✅ **PROYECTO COMPLETADO Y FUNCIONAL**
