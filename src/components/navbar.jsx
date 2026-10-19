import { useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { CarritoContext, SesionContext } from '../context/tiendaContext.js'

function Navbar() {
  const { cantidadTotal } = useContext(CarritoContext)
  const { sesion, cerrarSesion } = useContext(SesionContext)
  return (
    <header>
      <nav className="navbar" aria-label="Menú principal">
        <Link to="/" className="logo"><span>LEVEL-UP</span><small>GAMER</small></Link>
        <div className="menu-principal">
          <NavLink to="/" end>Inicio</NavLink>
          <NavLink to="/productos">Productos</NavLink>
          <NavLink to="/nosotros">Nosotros</NavLink>
          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/contacto">Contacto</NavLink>
        </div>
        <div className="menu-usuario">
          {sesion ? (
            <div className="usuario-sesion" style={{ display: 'flex' }}>
              <span id="nombre-usuario">Hola, {sesion.nombre}</span>
              {(sesion.tipo === 'Administrador' || sesion.tipo === 'Vendedor') && <Link to="/admin">Panel</Link>}
              <Link to="/" id="cerrar-sesion" onClick={cerrarSesion}>Salir</Link>
            </div>
          ) : (
            <>
              <Link to="/login" id="link-ingresar">Ingresar</Link>
              <Link to="/registro" id="link-registro">Registrarse</Link>
            </>
          )}
          <Link to="/carrito" className="carrito" aria-label={`Carrito: ${cantidadTotal} productos`}>
            <svg className="carrito-icono" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M3 3h2l2.4 10.2a2 2 0 0 0 2 1.5h7.7a2 2 0 0 0 2-1.6L21 6H6" />
              <circle cx="10" cy="19" r="1"/><circle cx="18" cy="19" r="1"/>
            </svg>
            <span id="contador-carrito">{cantidadTotal}</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}
export default Navbar
