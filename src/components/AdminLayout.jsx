import { useContext } from 'react'
import { Link, NavLink, Navigate, Outlet } from 'react-router-dom'
import { SesionContext } from '../context/tiendaContext.js'

function AdminLayout() {
  const { sesion } = useContext(SesionContext)
  if (!sesion) return <Navigate to="/login" replace />
  if (!['Administrador', 'Vendedor'].includes(sesion.tipo)) return <Navigate to="/" replace />
  return (
    <div className="admin-layout">
      <aside className="admin-menu">
        <Link to="/admin" className="admin-logo"><span>LEVEL-UP</span><small>ADMIN</small></Link>
        <nav className="admin-nav">
          <NavLink to="/admin" end className={({isActive})=>isActive?'activo':''}>Inicio</NavLink>
          <NavLink to="/admin/productos" className={({isActive})=>isActive?'activo':''}>Productos</NavLink>
          <NavLink to="/admin/usuarios" className={({isActive})=>isActive?'activo':''}>Usuarios</NavLink>
        </nav>
        <Link to="/" className="admin-volver">← Volver a la tienda</Link>
      </aside>
      <main className="admin-contenido"><Outlet /></main>
    </div>
  )
}
export default AdminLayout
