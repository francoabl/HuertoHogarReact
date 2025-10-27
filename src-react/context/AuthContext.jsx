import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('huertohogar_currentUser')
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser))
      } catch (error) {
        console.error('Error loading user:', error)
        localStorage.removeItem('huertohogar_currentUser')
      }
    }
    setLoading(false)
  }, [])

  // Hash password (simple hash for demo - use bcrypt in production)
  const hashPassword = (password) => {
    return btoa(password) // Simple base64 encoding for demo
  }

  // Verify password
  const verifyPassword = (password, hashedPassword) => {
    return hashPassword(password) === hashedPassword
  }

  // Sanitize user data (remove password)
  const sanitizeUser = (user) => {
    const { password, ...userWithoutPassword } = user
    return userWithoutPassword
  }

  // Register new user
  const register = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('huertohogar_users')) || []
      
      // Validate email doesn't exist
      if (users.find(user => user.email === userData.email.toLowerCase())) {
        throw new Error('El correo electrónico ya está registrado')
      }

      // Validate required fields
      if (!userData.firstName || !userData.lastName || !userData.email || !userData.password) {
        throw new Error('Todos los campos son obligatorios')
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(userData.email)) {
        throw new Error('Formato de email inválido')
      }

      // Validate password
      if (userData.password.length < 8) {
        throw new Error('La contraseña debe tener al menos 8 caracteres')
      }

      // Create new user
      const newUser = {
        id: Date.now().toString(),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email.toLowerCase(),
        password: hashPassword(userData.password),
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        zipCode: userData.zipCode || '',
        role: 'user',
        createdAt: new Date().toISOString(),
        isActive: true
      }

      users.push(newUser)
      localStorage.setItem('huertohogar_users', JSON.stringify(users))

      return {
        success: true,
        message: 'Usuario registrado exitosamente',
        user: sanitizeUser(newUser)
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Login user
  const login = async (email, password, remember = false) => {
    try {
      const users = JSON.parse(localStorage.getItem('huertohogar_users')) || []
      const user = users.find(u => u.email === email.toLowerCase())

      if (!user) {
        throw new Error('Credenciales inválidas')
      }

      if (!verifyPassword(password, user.password)) {
        throw new Error('Credenciales inválidas')
      }

      if (!user.isActive) {
        throw new Error('Cuenta desactivada')
      }

      // Update last login
      user.lastLogin = new Date().toISOString()
      localStorage.setItem('huertohogar_users', JSON.stringify(users))

      // Save session
      const sanitizedUser = sanitizeUser(user)
      setCurrentUser(sanitizedUser)
      localStorage.setItem('huertohogar_currentUser', JSON.stringify(sanitizedUser))

      if (remember) {
        localStorage.setItem('huertohogar_remember', 'true')
      }

      return {
        success: true,
        message: 'Inicio de sesión exitoso',
        user: sanitizedUser
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Logout user
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('huertohogar_currentUser')
    localStorage.removeItem('huertohogar_remember')
  }

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('huertohogar_users')) || []
      const userIndex = users.findIndex(u => u.id === currentUser.id)

      if (userIndex === -1) {
        throw new Error('Usuario no encontrado')
      }

      // Update user data
      users[userIndex] = {
        ...users[userIndex],
        ...userData,
        email: users[userIndex].email, // Email can't be changed
        id: users[userIndex].id, // ID can't be changed
        updatedAt: new Date().toISOString()
      }

      localStorage.setItem('huertohogar_users', JSON.stringify(users))
      
      const updatedUser = sanitizeUser(users[userIndex])
      setCurrentUser(updatedUser)
      localStorage.setItem('huertohogar_currentUser', JSON.stringify(updatedUser))

      return {
        success: true,
        message: 'Perfil actualizado exitosamente',
        user: updatedUser
      }
    } catch (error) {
      return {
        success: false,
        message: error.message
      }
    }
  }

  // Check if user is admin
  const isAdmin = () => {
    return currentUser?.role === 'admin'
  }

  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateProfile,
    isAdmin,
    isAuthenticated: !!currentUser
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}
