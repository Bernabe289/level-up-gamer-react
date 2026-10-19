import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Footer from './components/Footer.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import Inicio from './pages/Inicio.jsx'
import Productos from './pages/Productos.jsx'
import DetalleProducto from './pages/DetalleProducto.jsx'
import Carrito from './pages/Carrito.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Nosotros from './pages/Nosotros.jsx'
import Blog from './pages/Blog.jsx'
import ArticuloBlog from './pages/ArticuloBlog.jsx'
import Contacto from './pages/Contacto.jsx'
import Admin from './pages/Admin.jsx'
import AdminProductos from './pages/AdminProductos.jsx'
import AdminProductoFormulario from './pages/AdminProductoFormulario.jsx'
import AdminProductoDetalle from './pages/AdminProductoDetalle.jsx'
import AdminUsuarios from './pages/AdminUsuarios.jsx'
import AdminUsuarioFormulario from './pages/AdminUsuarioFormulario.jsx'
import AdminUsuarioDetalle from './pages/AdminUsuarioDetalle.jsx'

function App() {
  const { pathname } = useLocation()
  const esAdmin = pathname.startsWith('/admin')
  return <>
    {!esAdmin && <><div className="barra-duoc">COMUNIDAD DUOC · 20% de descuento con tu cuenta Duoc</div><Navbar /></>}
    <Routes>
      <Route path="/" element={<Inicio/>}/>
      <Route path="/productos" element={<Productos/>}/>
      <Route path="/detalle-producto" element={<DetalleProducto/>}/>
      <Route path="/carrito" element={<Carrito/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/registro" element={<Registro/>}/>
      <Route path="/nosotros" element={<Nosotros/>}/>
      <Route path="/blog" element={<Blog/>}/>
      <Route path="/:articulo" element={<ArticuloBlog/>}/>
      <Route path="/contacto" element={<Contacto/>}/>
      <Route path="/admin" element={<AdminLayout/>}>
        <Route index element={<Admin/>}/>
        <Route path="productos" element={<AdminProductos/>}/>
        <Route path="producto-nuevo" element={<AdminProductoFormulario/>}/>
        <Route path="producto-editar" element={<AdminProductoFormulario editar/>}/>
        <Route path="producto-detalle" element={<AdminProductoDetalle/>}/>
        <Route path="usuarios" element={<AdminUsuarios/>}/>
        <Route path="usuario-nuevo" element={<AdminUsuarioFormulario/>}/>
        <Route path="usuario-editar" element={<AdminUsuarioFormulario editar/>}/>
        <Route path="usuario-detalle" element={<AdminUsuarioDetalle/>}/>
      </Route>
      <Route path="*" element={<main className="container py-5"><h1>Página no encontrada</h1><a href="/">Volver al inicio</a></main>}/>
    </Routes>
    {!esAdmin && <Footer/>}
  </>
}
export default App
