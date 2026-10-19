import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductosContext, UsuariosContext, SesionContext } from '../context/tiendaContext.js'

function Admin() {
  const { productos } = useContext(ProductosContext)
  const { usuarios } = useContext(UsuariosContext)
  const { sesion } = useContext(SesionContext)
  const criticos = productos.filter(p => p.stockCritico !== null && p.stockCritico !== undefined && p.stock <= p.stockCritico)
  return <>
    <div className="admin-encabezado"><p className="admin-etiqueta">PANEL DE ADMINISTRACIÓN</p><h1>Hola, <span>{sesion.nombre}</span></h1><p>Gestiona el catálogo y los usuarios de Level-Up Gamer.</p></div>
    <div className="admin-resumen">
      <Link className="admin-tarjeta" to="/admin/productos"><p className="admin-tarjeta-numero">{productos.length}</p><p className="admin-tarjeta-texto">Productos</p></Link>
      <Link className="admin-tarjeta" to="/admin/usuarios"><p className="admin-tarjeta-numero">{usuarios.length}</p><p className="admin-tarjeta-texto">Usuarios registrados</p></Link>
      <article className="admin-tarjeta"><p className="admin-tarjeta-numero">{criticos.length}</p><p className="admin-tarjeta-texto">Productos en stock crítico</p></article>
    </div>
    {criticos.length > 0 && <p className="admin-alerta-critico">Revisa el stock de: {criticos.map(p => p.nombre).join(', ')}.</p>}
  </>
}
export default Admin
