import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Nav, Tab, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

function Profile() {
  const { currentUser, updateProfile } = useAuth();
  
  // Estado del formulario de perfil
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    address: currentUser?.address || '',
    city: currentUser?.city || '',
    zipCode: currentUser?.zipCode || ''
  });

  // Estado del formulario de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  // Estados de feedback
  const [showProfileSuccess, setShowProfileSuccess] = useState(false);
  const [showPasswordSuccess, setShowPasswordSuccess] = useState(false);
  const [profileError, setProfileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Manejar cambios en formulario de perfil
  const handleProfileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Manejar cambios en formulario de contraseña
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  // Enviar formulario de perfil
  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setProfileError('');
    setShowProfileSuccess(false);

    const result = await updateProfile(formData);
    
    if (result.success) {
      setShowProfileSuccess(true);
      setTimeout(() => {
        setShowProfileSuccess(false);
      }, 3000);
    } else {
      setProfileError(result.message);
    }
    
    setIsSubmitting(false);
  };

  // Enviar formulario de contraseña
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPasswordError('');
    setShowPasswordSuccess(false);

    // Validar contraseñas
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setPasswordError('Las contraseñas nuevas no coinciden');
      setIsSubmitting(false);
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setPasswordError('La contraseña debe tener al menos 8 caracteres');
      setIsSubmitting(false);
      return;
    }

    // Simular cambio de contraseña (aquí iría la llamada a la API)
    setTimeout(() => {
      setShowPasswordSuccess(true);
      setIsSubmitting(false);
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
      });
      
      setTimeout(() => {
        setShowPasswordSuccess(false);
      }, 3000);
    }, 1000);
  };

  // Formatear fecha de registro
  const getMemberSince = () => {
    if (currentUser?.createdAt) {
      return new Date(currentUser.createdAt).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
    return 'Miembro desde 2024';
  };

  return (
    <div className="profile-page">
      <Container>
        <Row className="justify-content-center">
          <Col lg={9}>
            <Card className="profile-card">
              {/* Header del Perfil */}
              <div className="profile-header">
                <div className="profile-avatar">
                  <i className="fas fa-user"></i>
                </div>
                <h2 className="mb-0">
                  {currentUser?.firstName} {currentUser?.lastName}
                </h2>
                <p className="mb-0 mt-2">{currentUser?.email}</p>
                <small className="opacity-75 mt-1">{getMemberSince()}</small>
              </div>

              {/* Tabs */}
              <Card.Body className="profile-body">
                <Tab.Container defaultActiveKey="info">
                  <Nav variant="tabs" className="profile-tabs">
                    <Nav.Item>
                      <Nav.Link eventKey="info">
                        <i className="fas fa-user me-2"></i>Información Personal
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="security">
                        <i className="fas fa-lock me-2"></i>Seguridad
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="orders">
                        <i className="fas fa-shopping-bag me-2"></i>Mis Pedidos
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  <Tab.Content className="profile-tab-content">
                    {/* Tab: Información Personal */}
                    <Tab.Pane eventKey="info">
                      {showProfileSuccess && (
                        <Alert variant="success" className="mt-3">
                          <i className="fas fa-check-circle me-2"></i>
                          Perfil actualizado correctamente
                        </Alert>
                      )}
                      {profileError && (
                        <Alert variant="danger" className="mt-3">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          {profileError}
                        </Alert>
                      )}

                      <Form onSubmit={handleProfileSubmit}>
                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <i className="fas fa-user me-2"></i>Nombre
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleProfileChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <i className="fas fa-user me-2"></i>Apellido
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleProfileChange}
                                required
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-envelope me-2"></i>Correo Electrónico
                          </Form.Label>
                          <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleProfileChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-phone me-2"></i>Teléfono
                          </Form.Label>
                          <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-map-marker-alt me-2"></i>Dirección
                          </Form.Label>
                          <Form.Control
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleProfileChange}
                          />
                        </Form.Group>

                        <Row>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <i className="fas fa-city me-2"></i>Ciudad
                              </Form.Label>
                              <Form.Select
                                name="city"
                                value={formData.city}
                                onChange={handleProfileChange}
                              >
                                <option value="">Selecciona tu ciudad</option>
                                <option value="santiago">Santiago</option>
                                <option value="valparaiso">Valparaíso</option>
                                <option value="vina-del-mar">Viña del Mar</option>
                                <option value="concepcion">Concepción</option>
                                <option value="temuco">Temuco</option>
                                <option value="la-serena">La Serena</option>
                                <option value="antofagasta">Antofagasta</option>
                                <option value="iquique">Iquique</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <Col md={6}>
                            <Form.Group className="mb-3">
                              <Form.Label>
                                <i className="fas fa-mail-bulk me-2"></i>Código Postal
                              </Form.Label>
                              <Form.Control
                                type="text"
                                name="zipCode"
                                value={formData.zipCode}
                                onChange={handleProfileChange}
                              />
                            </Form.Group>
                          </Col>
                        </Row>

                        <Button 
                          type="submit" 
                          variant="success"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>Guardando...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>Guardar Cambios
                            </>
                          )}
                        </Button>
                      </Form>
                    </Tab.Pane>

                    {/* Tab: Seguridad */}
                    <Tab.Pane eventKey="security">
                      {showPasswordSuccess && (
                        <Alert variant="success" className="mt-3">
                          <i className="fas fa-check-circle me-2"></i>
                          Contraseña cambiada correctamente
                        </Alert>
                      )}
                      {passwordError && (
                        <Alert variant="danger" className="mt-3">
                          <i className="fas fa-exclamation-circle me-2"></i>
                          {passwordError}
                        </Alert>
                      )}

                      <Form onSubmit={handlePasswordSubmit}>
                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-lock me-2"></i>Contraseña Actual
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-key me-2"></i>Nueva Contraseña
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                          <Form.Text className="text-muted">
                            Mínimo 8 caracteres
                          </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3">
                          <Form.Label>
                            <i className="fas fa-key me-2"></i>Confirmar Nueva Contraseña
                          </Form.Label>
                          <Form.Control
                            type="password"
                            name="confirmNewPassword"
                            value={passwordData.confirmNewPassword}
                            onChange={handlePasswordChange}
                            required
                          />
                        </Form.Group>

                        <Button 
                          type="submit" 
                          variant="success"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <i className="fas fa-spinner fa-spin me-2"></i>Cambiando...
                            </>
                          ) : (
                            <>
                              <i className="fas fa-save me-2"></i>Cambiar Contraseña
                            </>
                          )}
                        </Button>
                      </Form>
                    </Tab.Pane>

                    {/* Tab: Mis Pedidos */}
                    <Tab.Pane eventKey="orders">
                      <div className="text-center py-5">
                        <i className="fas fa-shopping-bag text-muted mb-3" style={{ fontSize: '3rem' }}></i>
                        <h4 className="text-muted">Sin pedidos aún</h4>
                        <p className="text-muted mb-4">
                          Cuando realices tu primer pedido, aparecerá aquí.
                        </p>
                        <Button as={Link} to="/productos" variant="success">
                          <i className="fas fa-shopping-basket me-2"></i>Ver Productos
                        </Button>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Profile;
