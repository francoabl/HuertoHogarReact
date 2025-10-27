import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Card, InputGroup, Spinner } from 'react-bootstrap'
import { useSearchParams, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import productosData from '../../src/data/productos.json'
import './Products.css'

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categoria') || 'todos')
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(productosData.productos)
      setLoading(false)
    }, 500)
  }, [])

  useEffect(() => {
    filterProducts()
  }, [products, searchTerm, selectedCategory, minPrice, maxPrice])

  const filterProducts = () => {
    let filtered = [...products]

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'todos') {
      filtered = filtered.filter(product =>
        product.categoria.toLowerCase().includes(selectedCategory.toLowerCase())
      )
    }

    // Filter by price range
    if (minPrice) {
      filtered = filtered.filter(product => product.precio >= parseInt(minPrice))
    }
    if (maxPrice) {
      filtered = filtered.filter(product => product.precio <= parseInt(maxPrice))
    }

    setFilteredProducts(filtered)
  }

  const handleAddToCart = (product) => {
    addToCart(product)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('todos')
    setMinPrice('')
    setMaxPrice('')
    setSearchParams({})
  }

  const categories = [
    { value: 'todos', label: 'Todos los productos' },
    { value: 'frutas', label: 'Frutas Frescas' },
    { value: 'verduras', label: 'Verduras' },
    { value: 'organicos', label: 'Orgánicos' },
    { value: 'lacteos', label: 'Lácteos' }
  ]

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-3">Cargando productos...</p>
      </div>
    )
  }

  return (
    <div className="products-page">
      <Container>
        {/* Header */}
        <div className="products-header text-center mb-5">
          <h1 className="products-title">Nuestros Productos</h1>
          <p className="lead text-muted">Descubre la frescura del campo chileno</p>
        </div>

        {/* Search and Filters */}
        <div className="search-filter-section mb-4">
          <Row className="g-3">
            <Col md={6}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-secondary">
                  <i className="fas fa-search"></i>
                </Button>
              </InputGroup>
            </Col>
            <Col md={6}>
              <Row className="g-2">
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    placeholder="Precio mín."
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                  />
                </Col>
                <Col xs={6}>
                  <Form.Control
                    type="number"
                    placeholder="Precio máx."
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                  />
                </Col>
              </Row>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col md={8}>
              <div className="category-filters">
                {categories.map(cat => (
                  <Button
                    key={cat.value}
                    variant={selectedCategory === cat.value ? 'success' : 'outline-success'}
                    size="sm"
                    className="me-2 mb-2"
                    onClick={() => setSelectedCategory(cat.value)}
                  >
                    {cat.label}
                  </Button>
                ))}
              </div>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                <i className="fas fa-times me-2"></i>
                Limpiar filtros
              </Button>
            </Col>
          </Row>
        </div>

        {/* Results count */}
        <div className="results-info mb-4">
          <p className="text-muted">
            Mostrando {filteredProducts.length} de {products.length} productos
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h3>No se encontraron productos</h3>
            <p className="text-muted">Intenta ajustar tus filtros de búsqueda</p>
            <Button variant="success" onClick={clearFilters}>
              Ver todos los productos
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            {filteredProducts.map(product => (
              <Col key={product.id} sm={6} md={4} lg={3}>
                <Card className="product-card h-100">
                  <Link to={`/producto/${product.id}`} className="product-link">
                    <Card.Img
                      variant="top"
                      src={`/public/${product.imagen}`}
                      alt={product.nombre}
                      className="product-image"
                    />
                  </Link>
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <span className="badge bg-success">{product.categoria}</span>
                    </div>
                    <Card.Title className="product-name">
                      <Link to={`/producto/${product.id}`} className="product-link">
                        {product.nombre}
                      </Link>
                    </Card.Title>
                    <Card.Text className="product-description text-muted">
                      {product.descripcion}
                    </Card.Text>
                    <div className="mt-auto">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <span className="product-price">${product.precio.toLocaleString()}</span>
                        <span className="text-muted small">por unidad</span>
                      </div>
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => handleAddToCart(product)}
                      >
                        <i className="fas fa-cart-plus me-2"></i>
                        Agregar
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  )
}

export default Products

