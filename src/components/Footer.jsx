import { Link } from 'react-router-dom'
function Footer() {
  return <footer>
    <div className="footer-contenido">
      <div><h3>LEVEL-UP</h3><p>GAMER</p><p>Tu siguiente nivel empieza aquí.</p></div>
      <div className="footer-links"><Link to="/nosotros">Nosotros</Link><Link to="/blog">Comunidad</Link><Link to="/contacto">Contacto</Link></div>
    </div>
    <p className="copyright">© 2026 LEVEL-UP GAMER · Proyecto académico.</p>
  </footer>
}
export default Footer
