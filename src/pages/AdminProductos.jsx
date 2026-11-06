import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import { formatoPrecio } from '../utils/tienda.js'

function AdminProductos() {
  const { productos, cargando, error, desactivar } = useContext(ProductosContext)
  const [errorAccion, setErrorAccion] = useState('')

  async function quitar(p) {
    if (!window.confirm(`¿Desactivar "${p.nombre}"? Dejará de aparecer en la tienda.`)) return
    setErrorAccion('')
    try {
      await desactivar(p.id)
    } catch (e) {
      setErrorAccion(e.message)
    }
  }

  return <>
    <div className="admin-encabezado admin-encabezado-fila">
      <div><p className="admin-etiqueta">GESTIÓN DE PRODUCTOS</p><h1>Productos</h1></div>
      <Link className="admin-boton" to="/admin/producto-nuevo">+ Nuevo producto</Link>
    </div>
    {error && <p className="admin-error" role="alert">{error}</p>}
    {errorAccion && <p className="admin-error" role="alert">{errorAccion}</p>}
    <div className="admin-tabla-contenedor"><table className="admin-tabla"><thead><tr>
      <th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
    </tr></thead><tbody>
      {productos.map(p => <tr key={p.id}>
        <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td>{formatoPrecio(p.precio)}</td>
        <td>{p.stock} {p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico && <span className="admin-critico">Crítico</span>}</td>
        <td>
          <Link className="admin-accion" to={`/admin/producto-detalle?id=${encodeURIComponent(p.id)}`}>Ver</Link>
          <Link className="admin-accion" to={`/admin/producto-editar?id=${encodeURIComponent(p.id)}`}>Editar</Link>
          <button type="button" className="admin-accion" onClick={() => quitar(p)}>Desactivar</button>
        </td>
      </tr>)}
    </tbody></table>
    {cargando && <p className="p-4">Cargando productos...</p>}
    {!cargando && productos.length === 0 && !error && <p className="p-4">No hay productos registrados.</p>}
    </div>
  </>
}
export default AdminProductos