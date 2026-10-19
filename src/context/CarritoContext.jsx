import { useContext, useEffect, useState } from 'react'
import { CarritoContext, ProductosContext } from './tiendaContext.js'
import { datosGuardados, limitarCantidad } from '../utils/tienda.js'

export function CarritoProvider({ children }) {
  const { productos } = useContext(ProductosContext)
  const [carrito, setCarrito] = useState(() => {
    const datos = datosGuardados('carrito', [])
    return Array.isArray(datos) ? datos : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  function agregarAlCarrito(id, cantidad = 1) {
    const producto = productos.find(p => p.id === id)
    if (!producto || producto.stock <= 0) return false
    setCarrito(actual => {
      const existe = actual.find(p => p.id === id)
      const nuevaCantidad = limitarCantidad((existe?.cantidad || 0) + Number(cantidad), producto.stock)
      if (existe) return actual.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p)
      return [...actual, { id, cantidad: nuevaCantidad }]
    })
    return true
  }

  function cambiarCantidad(id, cantidad) {
    const producto = productos.find(p => p.id === id)
    if (!producto || producto.stock <= 0) return
    const nuevaCantidad = limitarCantidad(cantidad, producto.stock)
    setCarrito(actual => actual.map(p => p.id === id ? { ...p, cantidad: nuevaCantidad } : p))
  }

  function eliminarDelCarrito(id) {
    setCarrito(actual => actual.filter(p => p.id !== id))
  }

  function vaciarCarrito() { setCarrito([]) }
  const productosActuales = carrito.filter(item => productos.some(p => p.id === item.id))
  const cantidadTotal = productosActuales.reduce((total, item) => total + item.cantidad, 0)
  return (
    <CarritoContext.Provider value={{ carrito: productosActuales, agregarAlCarrito, cambiarCantidad, eliminarDelCarrito, vaciarCarrito, cantidadTotal }}>
      {children}
    </CarritoContext.Provider>
  )
}
