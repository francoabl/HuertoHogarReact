import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import './Navigation.css'

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false)
  const { currentUser, logout, isAdmin } = useAuth()
  const { getCartCount } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const cartCount = getCartCount()

  return (
    <Navbar 
      expand="lg" 
      fixed="top" 
      className={`custom-navbar ${scrolled ? 'scrolled' : ''}`}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand">
          <i className="fas fa-seedling me-2"></i>
          HuertoHogar
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-lg-center">
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
            <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
            <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
            <Nav.Link as={Link} to="/blog">Blog</Nav.Link>
            
            {/* Cart */}
            <Nav.Link as={Link} to="/carrito" className="cart-link ms-lg-3">
              <i className="fas fa-shopping-cart"></i>
              {cartCount > 0 && (
                <Badge bg="danger" className="cart-badge">{cartCount}</Badge>
              )}
            </Nav.Link>

            {/* Auth buttons/dropdown */}
            {currentUser ? (
              <NavDropdown 
                title={
                  <span>
                    <i className="fas fa-user-circle me-2"></i>
                    {currentUser.firstName}
                  </span>
                }
                id="user-dropdown"
                className="user-dropdown ms-lg-2"
              >
                <NavDropdown.Item as={Link} to="/perfil">
                  <i className="fas fa-user me-2"></i>
                  Mi Perfil
                </NavDropdown.Item>
                {isAdmin() && (
                  <NavDropdown.Item as={Link} to="/admin">
                    <i className="fas fa-cog me-2"></i>
                    Administración
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>
                  Cerrar Sesión
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link to="/registro" className="btn btn-outline-success me-2 ms-lg-3">
                  <i className="fas fa-user-plus me-2"></i>
                  Registro
                </Link>
                <Link to="/login" className="btn btn-success">
                  <i className="fas fa-sign-in-alt me-2"></i>
                  Ingresar
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation

