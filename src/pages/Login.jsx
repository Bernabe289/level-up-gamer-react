
import { useContext, useState } from 'react'
import { SesionContext, UsuariosContext } from '../context/tiendaContext.js'
import { Link, useNavigate } from 'react-router-dom'

function Login() {

  const navigate = useNavigate()
  const { usuarios } = useContext(UsuariosContext)
  const { iniciarSesion: guardarSesion } = useContext(SesionContext)

  const [correo, setCorreo] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [errores, setErrores] = useState({})

  function iniciarSesion(e) {
    e.preventDefault()

    const nuevosErrores = {}
    const correoLimpio = correo.trim()

    const correoPermitido =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

    // Validar correo
    if (!correoLimpio) {
      nuevosErrores.correo = 'Ingresa tu correo electrónico.'
    } else if (correoLimpio.length > 100) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.'
    } else if (!correoPermitido.test(correoLimpio)) {
      nuevosErrores.correo =
        'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    }

    // Validar contraseña
    if (!contrasena) {
      nuevosErrores.contrasena = 'Ingresa tu contraseña.'
    } else if (contrasena.length < 4 || contrasena.length > 10) {
      nuevosErrores.contrasena =
        'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    if (Object.keys(nuevosErrores).length > 0) {
      setErrores(nuevosErrores)
      return
    }

    const usuario = usuarios.find(
      item =>
        item.correo?.toLowerCase() === correoLimpio.toLowerCase() &&
        item.contrasena === contrasena
    )

    if (!usuario) {
      setErrores({
        general: 'Correo o contraseña incorrectos.'
      })
      return
    }

    guardarSesion(usuario)

    setErrores({})

    // Volver al inicio
    navigate('/')
  }

  return (
    <main className="login-main">

      <section className="login-contenedor">

        <div className="ruta-productos">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Ingresar</span>
        </div>

        <div className="encabezado-login">
          <p className="hero-etiqueta">INICIA SESIÓN</p>

          <h1>Ingresa a tu cuenta</h1>

          <p>
            Inicia sesión para seguir con tu compra
            y ver tu descuento Duoc.
          </p>
        </div>

        <form
          className="form-login"
          onSubmit={iniciarSesion}
          noValidate
        >

          {/* Correo */}
          <div className="campo-login">
            <label htmlFor="correo">
              Correo electrónico
            </label>

            <input
              id="correo"
              type="email"
              maxLength="100"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className={errores.correo ? 'campo-error' : ''}
            />

            <p className="error">{errores.correo}</p>
          </div>

          {/* Contraseña */}
          <div className="campo-login">
            <label htmlFor="contrasena">
              Contraseña
            </label>

            <input
              id="contrasena"
              type="password"
              maxLength="10"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              className={errores.contrasena ? 'campo-error' : ''}
            />

            <p className="error">{errores.contrasena}</p>
          </div>

          <button type="submit" className="boton-login">
            Ingresar
          </button>

          <p className="login-error">
            {errores.general}
          </p>

          <p className="texto-login">
            ¿No tienes cuenta?{' '}
            <Link to="/registro">Regístrate</Link>
          </p>

        </form>
      </section>
    </main>
  )
}

export default Login
