import { Link, useParams } from 'react-router-dom'
const articulos = {
  blog1: { categoria:'GUÍA DE SETUP', titulo:'Tu primer setup: empieza por lo que juegas', imagen:'/assets/img/blog-setup.jpg', entrada:'Antes de elegir, piensa en los juegos que disfrutas, el espacio disponible y los accesorios que ya tienes.', secciones:[
    ['1. Parte por tu plataforma','En consola, revisa la compatibilidad de controles y auriculares. En PC, mejora los periféricos que más utilizas.'],
    ['2. Elige comodidad','Un mouse adecuado, auriculares cómodos y una silla ergonómica pueden mejorar tus sesiones.'],
    ['3. Ordena tu espacio','Mide tu escritorio, organiza cables y deja un lugar para tus accesorios.'] ] },
  blog2: { categoria:'COMUNIDAD', titulo:'Una buena partida se juega en equipo', imagen:'/assets/img/blog-comunidad.jpg', entrada:'Disfrutar videojuegos en grupo también significa cuidar el ambiente en cada partida.', secciones:[
    ['1. Respeta a tu equipo','Escucha, comparte información y evita comentarios que dañen la experiencia.'],
    ['2. Comparte lo que sabes','Ayudar a quienes comienzan fortalece la comunidad.'],
    ['3. Disfruta la experiencia','Jugar en equipo es mejor cuando todas las personas pueden participar.'] ] }
}
function ArticuloBlog() {
  const { articulo } = useParams()
  const a = articulos[articulo]
  if (!a) return <main className="container py-5">Artículo no encontrado.</main>
  return <main><article className="articulo"><Link to="/blog" className="volver-blog">← Volver al blog</Link>
    <p className="articulo-categoria">{a.categoria}</p><h1>{a.titulo}</h1><p className="articulo-info">Equipo LEVEL-UP · Lectura de 3 minutos</p>
    <img className="articulo-imagen" src={a.imagen} alt={a.titulo}/><p>{a.entrada}</p>
    {a.secciones.map(([titulo,contenido])=><section className="articulo-seccion" key={titulo}><h2>{titulo}</h2><p>{contenido}</p></section>)}
    <Link className="boton-principal articulo-boton" to="/productos">Explorar productos</Link>
  </article></main>
}
export default ArticuloBlog
