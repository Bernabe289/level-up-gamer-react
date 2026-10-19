import { Link } from 'react-router-dom'
function Nosotros() { return <main><section className="nosotros">
  <div className="ruta-productos"><Link to="/">Inicio</Link><span>/</span><span>Nosotros</span></div>
  <div className="encabezado-nosotros"><p className="hero-etiqueta">CONOCE LEVEL-UP</p><h1>Gamers construyendo para gamers</h1><p>Somos una tienda online enfocada en productos y experiencias para la comunidad gamer en Chile.</p></div>
  <div className="nosotros-contenido"><div className="nosotros-imagen"><img src="/assets/img/nosotros.png" alt="Setup gamer con iluminación RGB"/></div>
  <div className="nosotros-informacion"><div className="nosotros-bloque"><p className="hero-etiqueta">NUESTRA MISIÓN</p><h2>Misión</h2><p>Proporcionar productos de calidad a gamers en Chile, ofreciendo una experiencia de compra personalizada, con foco en la satisfacción del cliente y en la comunidad.</p></div>
  <div className="nosotros-bloque"><p className="hero-etiqueta">HACIA DÓNDE VAMOS</p><h2>Visión</h2><p>Ser una tienda online destacada por su innovación, servicio al cliente y beneficios para nuestra comunidad.</p></div></div></div>
  <div className="historia-nosotros"><p className="hero-etiqueta">NUESTRA HISTORIA</p><h2>Level-Up Gamer</h2><p>Level-Up Gamer nació para responder a la demanda de productos gamers en Chile. Nuestro catálogo reúne consolas, accesorios, computadores, sillas y artículos personalizados.</p></div>
  <div className="equipo-nosotros"><p className="hero-etiqueta">DETRÁS DEL PROYECTO</p><h2>Equipo de desarrollo</h2><p>Proyecto de Desarrollo Fullstack II, actualizado de HTML, CSS y JavaScript a React y Bootstrap.</p></div>
  </section></main> }
export default Nosotros
