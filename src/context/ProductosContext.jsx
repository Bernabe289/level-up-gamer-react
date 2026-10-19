import { useEffect, useState } from 'react'
import { productosBase } from '../data/productos.js'
import { datosGuardados } from '../utils/tienda.js'
import { ProductosContext } from './tiendaContext.js'

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState(() => {
    const guardados = datosGuardados('productosLevelUp', productosBase)
    return Array.isArray(guardados) ? guardados : productosBase
  })

  useEffect(() => {
    localStorage.setItem('productosLevelUp', JSON.stringify(productos))
  }, [productos])

  return (
    <ProductosContext.Provider value={{ productos, setProductos }}>
      {children}
    </ProductosContext.Provider>
  )
}
