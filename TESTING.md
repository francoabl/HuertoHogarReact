# Testing Documentation - HuertoHogar React

## Configuración del Entorno de Pruebas

El proyecto HuertoHogar utiliza **Jasmine** y **Karma** para ejecutar pruebas unitarias en los componentes React, asegurando la calidad y funcionalidad del código frontend.

### Instalación de Dependencias de Testing

```bash
# Instalar Jasmine y Karma
npm install --save-dev jasmine karma karma-jasmine karma-chrome-launcher karma-webpack

# Instalar utilidades para testing React
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### Configuración de Karma

Archivo `karma.conf.js`:

```javascript
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'src/**/*.test.js',
      'src/**/*.spec.js'
    ],
    browsers: ['Chrome'],
    singleRun: true,
    autoWatch: false
  });
};
```

## Escritura de Pruebas Unitarias

### Estructura de Pruebas

```
src/
├── components/
│   ├── Navigation/
│   │   ├── Navigation.jsx
│   │   └── Navigation.spec.js
│   ├── ProductCard/
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.spec.js
└── pages/
    ├── Home/
    │   ├── Home.jsx
    │   └── Home.spec.js
```

### Ejemplo de Prueba Unitaria - Navigation Component

```javascript
describe('Navigation Component', () => {
  let component;

  beforeEach(() => {
    component = render(<Navigation />);
  });

  it('should render navigation menu', () => {
    expect(component.getByText('Inicio')).toBeInTheDocument();
    expect(component.getByText('Productos')).toBeInTheDocument();
    expect(component.getByText('Contacto')).toBeInTheDocument();
  });

  it('should show cart icon with item count', () => {
    const cartIcon = component.getByTestId('cart-icon');
    expect(cartIcon).toBeInTheDocument();
  });

  it('should toggle mobile menu on hamburger click', () => {
    const hamburgerButton = component.getByTestId('hamburger-menu');
    fireEvent.click(hamburgerButton);
    
    const mobileMenu = component.getByTestId('mobile-menu');
    expect(mobileMenu).toHaveClass('show');
  });
});
```

### Ejemplo de Prueba con Mock - ProductCard Component

```javascript
describe('ProductCard Component', () => {
  const mockProduct = {
    id: 1,
    nombre: 'Tomates Frescos',
    precio: 2500,
    imagen: 'tomates.jpg',
    categoria: 'Verduras'
  };

  const mockAddToCart = jasmine.createSpy('addToCart');

  beforeEach(() => {
    spyOn(useCart, 'addToCart').and.returnValue(mockAddToCart);
  });

  it('should display product information correctly', () => {
    const component = render(<ProductCard product={mockProduct} />);
    
    expect(component.getByText('Tomates Frescos')).toBeInTheDocument();
    expect(component.getByText('$2.500')).toBeInTheDocument();
    expect(component.getByText('Verduras')).toBeInTheDocument();
  });

  it('should call addToCart when button is clicked', () => {
    const component = render(<ProductCard product={mockProduct} />);
    const addButton = component.getByText('Agregar');
    
    fireEvent.click(addButton);
    
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
```

## Uso de Mocks

### Mock de Context API

```javascript
// Mock del CartContext
const mockCartContext = {
  cartItems: [],
  addToCart: jasmine.createSpy('addToCart'),
  removeFromCart: jasmine.createSpy('removeFromCart'),
  getCartCount: jasmine.createSpy('getCartCount').and.returnValue(0)
};

beforeEach(() => {
  spyOn(React, 'useContext').and.returnValue(mockCartContext);
});
```

### Mock de React Router

```javascript
const mockNavigate = jasmine.createSpy('navigate');

beforeEach(() => {
  spyOn(require('react-router-dom'), 'useNavigate').and.returnValue(mockNavigate);
});
```

## Ejecución de Pruebas

### Comandos de Testing

```bash
# Ejecutar todas las pruebas
npm test

# Ejecutar pruebas en modo watch
npm run test:watch

# Ejecutar pruebas con coverage
npm run test:coverage

# Ejecutar pruebas específicas
npm test -- --grep "Navigation Component"
```

### Scripts en package.json

```json
{
  "scripts": {
    "test": "karma start",
    "test:watch": "karma start --auto-watch --no-single-run",
    "test:coverage": "karma start --coverage"
  }
}
```

## Análisis de Resultados

### Interpretación de Coverage

```bash
# Ejemplo de salida de coverage
=============================== Coverage summary ===============================
Statements   : 85.5% ( 142/166 )
Branches     : 78.2% ( 43/55 )
Functions    : 90.9% ( 20/22 )
Lines        : 84.8% ( 140/165 )
================================================================================
```

### Métricas de Calidad

- **Statements**: Porcentaje de declaraciones ejecutadas
- **Branches**: Porcentaje de ramas condicionales probadas
- **Functions**: Porcentaje de funciones llamadas
- **Lines**: Porcentaje de líneas de código ejecutadas

## Casos de Prueba Implementados

### 1. Componentes de UI
- ✅ Renderizado correcto de elementos
- ✅ Interacciones de usuario (clicks, inputs)
- ✅ Estados visuales (loading, error, success)

### 2. Gestión de Estado
- ✅ useState hooks


### 3. Navegación
- ✅ React Router navigation
- ✅ Dynamic routing
- ✅ Route protection

### 4. Formularios
- ✅ Validación de campos
- ✅ Submits exitosos y con errores
- ✅ Estados de formulario

## Mejores Prácticas

1. **Usar data-testid** para elementos críticos
2. **Mockear dependencias externas** (APIs, Context)
3. **Probar comportamientos**, no implementación
4. **Mantener pruebas simples** y enfocadas
5. **Usar beforeEach/afterEach** para setup/cleanup
6. **Verificar tanto casos exitosos como de error**

## Configuración CI/CD

```yaml
# .github/workflows/test.yml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

Este enfoque asegura que todos los componentes funcionen correctamente y mantengan la calidad del código a lo largo del desarrollo.