import { useState } from 'react'
import { Link } from 'react-router-dom'
import { validarCorreo } from '../utils/tienda.js'
function Contacto() {
  const [datos, setDatos] = useState({ nombre:'', correo:'', comentario:'' })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')
  function enviar(e) {
    e.preventDefault()
    const nuevos = {}
    if (!datos.nombre.trim() || datos.nombre.trim().length > 100) nuevos.nombre = 'Ingresa un nombre válido.'
    if (!validarCorreo(datos.correo)) nuevos.correo = 'Ingresa un correo Duoc o Gmail válido.'
    if (!datos.comentario.trim() || datos.comentario.length > 500) nuevos.comentario = 'Escribe un comentario de hasta 500 caracteres.'
    setErrores(nuevos)
    if (!Object.keys(nuevos).length) { setMensaje('Mensaje validado correctamente. Este formulario es una demostración y no envía correos.'); setDatos({ nombre:'', correo:'', comentario:'' }) }
  }
  return <main className="contacto-main"><section className="contacto-contenedor">
    <div className="ruta-productos"><Link to="/">Inicio</Link><span>/</span><span>Contacto</span></div>
    <div className="encabezado-contacto"><p className="hero-etiqueta">HABLEMOS</p><h1>Contáctanos</h1><p>¿Tienes dudas sobre tu pedido o algún producto? Escríbenos.</p></div>
    <form className="form-contacto" onSubmit={enviar} noValidate>
      {[['nombre','Nombre','text'], ['correo','Correo electrónico','email'], ['comentario','Comentario','textarea']].map(([campo,label,tipo])=><div className="campo-contacto" key={campo}>
        <label htmlFor={campo}>{label}</label>
        {tipo === 'textarea' ? <textarea id={campo} maxLength={500} rows="5" value={datos[campo]} onChange={e=>setDatos(actual=>({...actual,[campo]:e.target.value}))}/> :
          <input type={tipo} id={campo} maxLength={100} value={datos[campo]} onChange={e=>setDatos(actual=>({...actual,[campo]:e.target.value}))}/>}
        <p className="error">{errores[campo]}</p>
      </div>)}
      <button type="submit" className="boton-contacto">Enviar mensaje</button><p className="registro-exitoso" role="status">{mensaje}</p>
    </form>
  </section></main>
}
export default Contacto
