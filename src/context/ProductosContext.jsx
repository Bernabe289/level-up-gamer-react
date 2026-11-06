import { useCallback, useEffect, useState } from 'react'
import { listarProductos, crearProducto, editarProducto, desactivarProducto } from '../api/productosApi.js'
import { ProductosContext } from './tiendaContext.js'

export function ProductosProvider({ children }) {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  // Carga inicial: se pide la lista al backend una vez, al abrir la tienda.
  useEffect(() => {
    let vigente = true
    listarProductos()
      .then(lista => { if (vigente) { setProductos(lista); setError(null) } })
      .catch(e => { if (vigente) setError(e.message) })
      .finally(() => { if (vigente) setCargando(false) })
    return () => { vigente = false }
  }, [])

  // Recarga manual: se usa después de crear, editar o desactivar.
  const recargar = useCallback(async () => {
    try {
      setProductos(await listarProductos())
      setError(null)
    } catch (e) {
      setError(e.message)
    }
  }, [])

  async function crear(producto) {
    await crearProducto(producto)
    await recargar()
  }
  async function editar(id, producto) {
    await editarProducto(id, producto)
    await recargar()
  }
  async function desactivar(id) {
    await desactivarProducto(id)
    await recargar()
  }

  return (
    <ProductosContext.Provider value={{ productos, cargando, error, recargar, crear, editar, desactivar }}>
      {children}
    </ProductosContext.Provider>
  )
}