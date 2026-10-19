import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import { formatoPrecio } from '../utils/tienda.js'

function AdminProductos() {
  const { productos } = useContext(ProductosContext)
  return <>
    <div className="admin-encabezado admin-encabezado-fila">
      <div><p className="admin-etiqueta">GESTIÓN DE PRODUCTOS</p><h1>Productos</h1></div>
      <Link className="admin-boton" to="/admin/producto-nuevo">+ Nuevo producto</Link>
    </div>
    <div className="admin-tabla-contenedor"><table className="admin-tabla"><thead><tr>
      <th>Código</th><th>Nombre</th><th>Categoría</th><th>Precio</th><th>Stock</th><th>Acciones</th>
    </tr></thead><tbody>
      {productos.map(p => <tr key={p.id}>
        <td>{p.id}</td><td>{p.nombre}</td><td>{p.categoria}</td><td>{formatoPrecio(p.precio)}</td>
        <td>{p.stock} {p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico && <span className="admin-critico">Crítico</span>}</td>
        <td><Link className="admin-accion" to={`/admin/producto-detalle?id=${encodeURIComponent(p.id)}`}>Ver</Link><Link className="admin-accion" to={`/admin/producto-editar?id=${encodeURIComponent(p.id)}`}>Editar</Link></td>
      </tr>)}
    </tbody></table>{productos.length===0 && <p className="p-4">No hay productos registrados.</p>}</div>
  </>
}
export default AdminProductos
