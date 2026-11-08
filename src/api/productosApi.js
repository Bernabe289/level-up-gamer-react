import { pedir } from './cliente.js'

const RUTA = '/api/v1/productos'

export const listarProductos = () => pedir(RUTA)

export const crearProducto = (producto) =>
  pedir(RUTA, { method: 'POST', body: JSON.stringify(producto) })

export const editarProducto = (id, producto) =>
  pedir(`${RUTA}/${encodeURIComponent(id)}`, { method: 'PUT', body: JSON.stringify(producto) })

export const desactivarProducto = (id) =>
  pedir(`${RUTA}/${encodeURIComponent(id)}`, { method: 'DELETE' })