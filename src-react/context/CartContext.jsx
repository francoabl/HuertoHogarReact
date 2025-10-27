import { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const CartContext = createContext(null)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('huertohogar_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart:', error)
        localStorage.removeItem('huertohogar_cart')
      }
    }
    setLoading(false)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('huertohogar_cart', JSON.stringify(cart))
    }
  }, [cart, loading])

  // Add product to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingIndex = prevCart.findIndex(item => item.id === product.id)
      
      if (existingIndex !== -1) {
        // Update quantity if product exists
        const newCart = [...prevCart]
        newCart[existingIndex].quantity += quantity
        return newCart
      } else {
        // Add new product
        return [...prevCart, {
          id: product.id,
          nombre: product.nombre,
          precio: product.precio,
          imagen: product.imagen,
          categoria: product.categoria,
          quantity: quantity
        }]
      }
    })
  }

  // Remove product from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  // Update product quantity
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart(prevCart => {
      const newCart = [...prevCart]
      const index = newCart.findIndex(item => item.id === productId)
      if (index !== -1) {
        newCart[index].quantity = newQuantity
      }
      return newCart
    })
  }

  // Clear cart
  const clearCart = () => {
    setCart([])
  }

  // Get cart item count
  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  // Get cart total
  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.precio * item.quantity), 0)
  }

  // Check if product is in cart
  const isInCart = (productId) => {
    return cart.some(item => item.id === productId)
  }

  // Get product quantity in cart
  const getProductQuantity = (productId) => {
    const item = cart.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartCount,
    getCartTotal,
    isInCart,
    getProductQuantity
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
}
