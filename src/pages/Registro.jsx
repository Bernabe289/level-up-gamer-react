
import { useContext, useState } from 'react'
import { UsuariosContext } from '../context/tiendaContext.js'
import { Link, useNavigate } from 'react-router-dom'

// Regiones y comunas del proyecto original
const regiones = [
  { nombre: 'Arica y Parinacota', comunas: ['Arica', 'Camarones', 'Putre', 'General Lagos'] },
  { nombre: 'Tarapacá', comunas: ['Iquique', 'Alto Hospicio', 'Pozo Almonte'] },
  { nombre: 'Antofagasta', comunas: ['Antofagasta', 'Calama', 'Tocopilla'] },
  { nombre: 'Atacama', comunas: ['Copiapó', 'Caldera', 'Vallenar'] },
  { nombre: 'Coquimbo', comunas: ['La Serena', 'Coquimbo', 'Ovalle'] },
  { nombre: 'Valparaíso', comunas: ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana'] },
  { nombre: 'Metropolitana de Santiago', comunas: ['Santiago', 'Maipú', 'Puente Alto', 'La Florida', 'Las Condes', 'Providencia', 'Ñuñoa'] },
  { nombre: "O'Higgins", comunas: ['Rancagua', 'Machalí', 'San Fernando'] },
  { nombre: 'Maule', comunas: ['Talca', 'Curicó', 'Linares'] },
  { nombre: 'Ñuble', comunas: ['Chillán', 'Chillán Viejo', 'San Carlos'] },
  { nombre: 'Biobío', comunas: ['Concepción', 'Talcahuano', 'Los Ángeles', 'San Pedro de la Paz'] },
  { nombre: 'La Araucanía', comunas: ['Temuco', 'Padre Las Casas', 'Villarrica'] },
  { nombre: 'Los Ríos', comunas: ['Valdivia', 'La Unión', 'Río Bueno'] },
  { nombre: 'Los Lagos', comunas: ['Puerto Montt', 'Osorno', 'Castro'] },
  { nombre: 'Aysén', comunas: ['Coyhaique', 'Aysén', 'Chile Chico'] },
  { nombre: 'Magallanes y la Antártica Chilena', comunas: ['Punta Arenas', 'Puerto Natales', 'Porvenir'] }
]

const datosIniciales = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  contrasena: '',
  repetirContrasena: '',
  fechaNacimiento: '',
  region: '',
  comuna: '',
  direccion: ''
}

// Validar RUN chileno
function validarRun(run) {
  if (!/^[0-9]{6,8}[0-9Kk]$/.test(run)) {
    return false
  }

  const cuerpo = run.slice(0, -1)
  const digitoIngresado = run.slice(-1).toUpperCase()

  let suma = 0
  let multiplicador = 2

  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplicador
    multiplicador++

    if (multiplicador === 8) {
      multiplicador = 2
    }
  }

  const resultado = 11 - (suma % 11)

  let digitoCorrecto

  if (resultado === 11) {
    digitoCorrecto = '0'
  } else if (resultado === 10) {
    digitoCorrecto = 'K'
  } else {
    digitoCorrecto = resultado.toString()
  }

  return digitoIngresado === digitoCorrecto
}

// Validar mayoría de edad
function esMayorDeEdad(fecha) {
  const nacimiento = new Date(fecha + 'T00:00:00')
  const hoy = new Date()

  if (Number.isNaN(nacimiento.getTime()) || nacimiento > hoy) {
    return false
  }

  let edad = hoy.getFullYear() - nacimiento.getFullYear()

  const diferenciaMes = hoy.getMonth() - nacimiento.getMonth()

  if (
    diferenciaMes < 0 ||
    (diferenciaMes === 0 && hoy.getDate() < nacimiento.getDate())
  ) {
    edad--
  }

  return edad >= 18
}

function Registro() {
  const navigate = useNavigate()
  const { usuarios, setUsuarios } = useContext(UsuariosContext)

  const [datos, setDatos] = useState(datosIniciales)
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  // Fecha máxima permitida
  const fechaMaxima = new Date()
  fechaMaxima.setFullYear(fechaMaxima.getFullYear() - 18)

  const maxFecha = [
    fechaMaxima.getFullYear(),
    String(fechaMaxima.getMonth() + 1).padStart(2, '0'),
    String(fechaMaxima.getDate()).padStart(2, '0')
  ].join('-')

  const regionSeleccionada = regiones.find(
    item => item.nombre === datos.region
  )

  // Actualizar campos
  function cambiarCampo(e) {
    const { name, value } = e.target

    setDatos(actual => ({
      ...actual,
      [name]: value,
      ...(name === 'region' ? { comuna: '' } : {})
    }))

    setErrores(actual => ({
      ...actual,
      [name]: ''
    }))

    setMensaje('')
  }

  // Registrar usuario
  function registrarUsuario(e) {
    e.preventDefault()

    const nuevosErrores = {}

    const usuario = {
      ...datos,
      run: datos.run.trim().toUpperCase(),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim(),
      direccion: datos.direccion.trim(),
      tipo: 'Cliente'
    }

    // RUN
    if (!usuario.run) {
      nuevosErrores.run = 'Ingresa tu RUN.'
    } else if (!validarRun(usuario.run)) {
      nuevosErrores.run = 'El RUN ingresado no es válido.'
    }

    // Nombre
    if (!usuario.nombre) {
      nuevosErrores.nombre = 'Ingresa tu nombre.'
    } else if (usuario.nombre.length > 50) {
      nuevosErrores.nombre = 'El nombre no puede superar los 50 caracteres.'
    }

    // Apellidos
    if (!usuario.apellidos) {
      nuevosErrores.apellidos = 'Ingresa tus apellidos.'
    } else if (usuario.apellidos.length > 100) {
      nuevosErrores.apellidos = 'Los apellidos no pueden superar los 100 caracteres.'
    }

    // Correo
    const correoPermitido =
      /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i

    if (!usuario.correo) {
      nuevosErrores.correo = 'Ingresa tu correo electrónico.'
    } else if (usuario.correo.length > 100) {
      nuevosErrores.correo = 'El correo no puede superar los 100 caracteres.'
    } else if (!correoPermitido.test(usuario.correo)) {
      nuevosErrores.correo =
        'Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.'
    }

    // Contraseña
    if (!usuario.contrasena) {
      nuevosErrores.contrasena = 'Ingresa una contraseña.'
    } else if (
      usuario.contrasena.length < 4 ||
      usuario.contrasena.length > 10
    ) {
      nuevosErrores.contrasena =
        'La contraseña debe tener entre 4 y 10 caracteres.'
    }

    // Repetir contraseña
    if (!datos.repetirContrasena) {
      nuevosErrores.repetirContrasena = 'Repite tu contraseña.'
    } else if (datos.repetirContrasena !== usuario.contrasena) {
      nuevosErrores.repetirContrasena = 'Las contraseñas no coinciden.'
    }

    // Fecha de nacimiento
    if (!datos.fechaNacimiento) {
      nuevosErrores.fechaNacimiento = 'Selecciona tu fecha de nacimiento.'
    } else if (!esMayorDeEdad(datos.fechaNacimiento)) {
      nuevosErrores.fechaNacimiento =
        'Debes tener al menos 18 años para registrarte.'
    }

    // Región
    if (!datos.region) {
      nuevosErrores.region = 'Selecciona una región.'
    }

    // Comuna
    if (!datos.comuna) {
      nuevosErrores.comuna = 'Selecciona una comuna.'
    }

    // Dirección
    if (!usuario.direccion) {
      nuevosErrores.direccion = 'Ingresa tu dirección.'
    } else if (usuario.direccion.length > 300) {
      nuevosErrores.direccion =
        'La dirección no puede superar los 300 caracteres.'
    }

    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      return
    }

    // Evitar RUN duplicado
    if (usuarios.some(item =>
      item.run?.toUpperCase() === usuario.run
    )) {
      setErrores({
        run: 'Este RUN ya se encuentra registrado.'
      })
      return
    }

    if (usuarios.some(item => item.correo?.toLowerCase() === usuario.correo.toLowerCase())) {
      setErrores({ correo: 'Este correo ya se encuentra registrado.' })
      return
    }

    // Guardar usuario
    delete usuario.repetirContrasena

    setUsuarios(actual => [...actual, usuario])

    setMensaje('Cuenta creada correctamente.')
    setDatos(datosIniciales)
    setErrores({})

    // Ir al login
    setTimeout(() => {
      navigate('/login')
    }, 1500)
  }

  // Campos del formulario
  const campos = [
    {
      id: 'run',
      label: 'RUN',
      max: 9,
      placeholder: '19011022K',
      ayuda: 'Sin puntos ni guion. Ejemplo: 19011022K.'
    },
    { id: 'nombre', label: 'Nombre', max: 50 },
    { id: 'apellidos', label: 'Apellidos', max: 100 },
    {
      id: 'correo',
      label: 'Correo electrónico',
      tipo: 'email',
      max: 100,
      ayuda: '@duoc.cl, @profesor.duoc.cl o @gmail.com'
    },
    {
      id: 'contrasena',
      label: 'Contraseña',
      tipo: 'password',
      max: 10,
      ayuda: 'De 4 a 10 caracteres.'
    },
    {
      id: 'repetirContrasena',
      label: 'Repetir contraseña',
      tipo: 'password',
      max: 10
    },
    {
      id: 'fechaNacimiento',
      label: 'Fecha de nacimiento',
      tipo: 'date',
      ayuda: 'Debes tener al menos 18 años.'
    }
  ]

  return (
    <main className="registro-main">
      <section className="registro-contenedor">

        <div className="ruta-productos">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Únete a LEVEL-UP</span>
        </div>

        <div className="encabezado-registro">
          <p className="hero-etiqueta">CREA TU CUENTA</p>
          <h1>Únete a LEVEL-UP</h1>
          <p>Crea tu cuenta y empieza a armar tu próximo setup.</p>
        </div>

        <form
          className="form-registro"
          onSubmit={registrarUsuario}
          noValidate
        >
          <p className="mensaje-formulario">
            Todos los campos son obligatorios.
          </p>

          <div className="registro-grid">

            {/* Campos principales */}
            {campos.map(campo => (
              <div className="campo-registro" key={campo.id}>
                <label htmlFor={campo.id}>
                  {campo.label}
                </label>

                <input
                  id={campo.id}
                  name={campo.id}
                  type={campo.tipo || 'text'}
                  maxLength={campo.max}
                  max={campo.tipo === 'date' ? maxFecha : undefined}
                  placeholder={campo.placeholder || ''}
                  value={datos[campo.id]}
                  onChange={cambiarCampo}
                  className={errores[campo.id] ? 'campo-error' : ''}
                />

                {campo.ayuda && <small>{campo.ayuda}</small>}

                <p className="error">
                  {errores[campo.id]}
                </p>
              </div>
            ))}

            {/* Región */}
            <div className="campo-registro">
              <label htmlFor="region">Región</label>

              <select
                id="region"
                name="region"
                value={datos.region}
                onChange={cambiarCampo}
                className={errores.region ? 'campo-error' : ''}
              >
                <option value="">Selecciona una región</option>

                {regiones.map(item => (
                  <option key={item.nombre} value={item.nombre}>
                    {item.nombre}
                  </option>
                ))}
              </select>

              <p className="error">{errores.region}</p>
            </div>

            {/* Comuna */}
            <div className="campo-registro">
              <label htmlFor="comuna">Comuna</label>

              <select
                id="comuna"
                name="comuna"
                value={datos.comuna}
                onChange={cambiarCampo}
                disabled={!datos.region}
                className={errores.comuna ? 'campo-error' : ''}
              >
                <option value="">Selecciona una comuna</option>

                {regionSeleccionada?.comunas.map(comuna => (
                  <option key={comuna} value={comuna}>
                    {comuna}
                  </option>
                ))}
              </select>

              <p className="error">{errores.comuna}</p>
            </div>

            {/* Dirección */}
            <div className="campo-registro campo-completo">
              <label htmlFor="direccion">Dirección</label>

              <input
                id="direccion"
                name="direccion"
                type="text"
                maxLength={300}
                value={datos.direccion}
                onChange={cambiarCampo}
                className={errores.direccion ? 'campo-error' : ''}
              />

              <p className="error">{errores.direccion}</p>
            </div>

          </div>

          <button type="submit" className="boton-registro">
            Crear cuenta
          </button>

          <p className="registro-exitoso">{mensaje}</p>

          <p className="texto-login">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login">Iniciar sesión</Link>
          </p>

        </form>
      </section>
    </main>
  )
}

export default Registro
