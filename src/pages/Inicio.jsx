import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import ProductCard from '../components/ProductCard.jsx'
function Inicio() {
  const { productos } = useContext(ProductosContext)
  return <main>
    <section className="hero"><div className="hero-contenido">
      <p className="hero-etiqueta">EQUIPA TU PRÓXIMA PARTIDA</p>
      <h1>Tu juego.<br/>Tu mundo.<br/><span>Tu siguiente nivel.</span></h1>
      <p className="hero-descripcion">Consolas, accesorios y todo lo que necesitas para hacer tuyo el juego.</p>
      <div className="hero-botones"><Link to="/productos" className="boton-principal">Explorar productos</Link><Link to="/nosotros" className="boton-secundario">Conoce la comunidad</Link></div>
    </div></section>
    <section className="beneficios"><article><span>01</span><p>Productos para tu setup</p></article><article><span>02</span><p>Comunidad gamer en Chile</p></article><article><span>03</span><p>Beneficio exclusivo Duoc</p></article></section>
    <section className="seccion-productos"><div className="titulo-seccion"><h2>Elige tu próximo upgrade</h2><Link to="/productos">Ver todo →</Link></div>
      <div className="productos-grid">{productos.slice(0, 4).map(producto => <ProductCard key={producto.id} producto={producto}/>)}</div>
    </section>
    <section className="beneficio-duoc"><div><p className="etiqueta-duoc">BENEFICIO DUOC</p><h2>Tu cuenta tiene un 20% extra.</h2><p>Regístrate con tu correo Duoc y recibe un 20% de descuento en tus productos.</p></div><Link className="boton-principal" to="/registro">Crear mi cuenta</Link></section>
  </main>
}
export default Inicio
