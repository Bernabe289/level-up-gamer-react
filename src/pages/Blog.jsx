import { Link } from 'react-router-dom'
const articulos = [
  { id:'blog1', imagen:'/assets/img/blog-setup.jpg', categoria:'GUÍA DE SETUP', titulo:'Tu primer setup: empieza por lo que juegas', texto:'Tres decisiones para elegir periféricos y organizar tu espacio sin comprar de más.' },
  { id:'blog2', imagen:'/assets/img/blog-comunidad.jpg', categoria:'COMUNIDAD', titulo:'Una buena partida se juega en equipo', texto:'Ideas para disfrutar videojuegos con amigos y construir una comunidad respetuosa.' }
]
function Blog() { return <main><section className="blog">
  <div className="ruta-productos"><Link to="/">Inicio</Link><span>/</span><span>Fuera de la partida</span></div>
  <div className="encabezado-blog"><p className="hero-etiqueta">COMUNIDAD LEVEL-UP</p><h1>Fuera de la partida</h1><p>Guías, ideas y comunidad para seguir disfrutando del juego.</p></div>
  <div className="blog-grid">{articulos.map(a=><article className="blog-card" key={a.id}><Link to={`/${a.id}`} className="blog-imagen"><img src={a.imagen} alt={a.titulo}/></Link>
    <div className="blog-contenido"><p className="blog-categoria">{a.categoria}</p><h2>{a.titulo}</h2><p className="blog-descripcion">{a.texto}</p><Link to={`/${a.id}`} className="boton-articulo">Leer artículo →</Link></div>
  </article>)}</div>
  </section></main> }
export default Blog
