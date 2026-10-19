import { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import { formatoPrecio } from '../utils/tienda.js'

function AdminProductoDetalle() {
  const [parametros] = useSearchParams()
  const { productos } = useContext(ProductosContext)
  const p = productos.find(item => item.id === parametros.get('id'))
  if (!p) return <div><h1>Producto no encontrado</h1><Link to="/admin/productos">Volver</Link></div>
  return <>
    <div className="admin-encabezado"><p className="admin-etiqueta">DETALLE DE PRODUCTO</p><h1>{p.nombre}</h1></div>
    <div className="admin-detalle">
      <div className="admin-detalle-imagen"><img src={p.imagen} alt={p.nombre}/></div>
      <div>
        {[['Código',p.id],['Categoría',p.categoria],['Fabricante',p.fabricante],['Precio',formatoPrecio(p.precio)],['Stock',p.stock],['Stock crítico',p.stockCritico ?? 'No definido']].map(([etiqueta,valor]) =>
          <div className="admin-detalle-dato" key={etiqueta}><strong>{etiqueta}</strong><span>{valor}</span></div>
        )}
        <p className="admin-detalle-descripcion">{p.descripcion}</p>
        {p.stockCritico != null && p.stock <= p.stockCritico && <p className="admin-alerta-critico">Stock crítico: revisa la cantidad disponible.</p>}
        <div className="admin-form-acciones"><Link className="admin-boton" to={`/admin/producto-editar?id=${encodeURIComponent(p.id)}`}>Editar</Link><Link className="admin-cancelar" to="/admin/productos">Volver</Link></div>
      </div>
    </div>
  </>
}
export default AdminProductoDetalle
