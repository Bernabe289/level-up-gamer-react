import { useContext, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { UsuariosContext, SesionContext } from '../context/tiendaContext.js'
import { validarCorreo, validarRun } from '../utils/tienda.js'

const vacio = { run:'', nombre:'', apellidos:'', correo:'', contrasena:'', fechaNacimiento:'', region:'', comuna:'', direccion:'', tipo:'Cliente' }
function AdminUsuarioFormulario({ editar = false }) {
  const [parametros] = useSearchParams()
  const navigate = useNavigate()
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const { sesion, iniciarSesion } = useContext(SesionContext)
  const original = usuarios.find(u => u.run === parametros.get('run'))
  const [datos, setDatos] = useState(() => editar && original ? { ...original, contrasena: '' } : vacio)
  const [errores, setErrores] = useState({})
  if (editar && !original) return <div><h1>Usuario no encontrado</h1><Link to="/admin/usuarios">Volver</Link></div>
  function cambiar(e) { setDatos(actual => ({ ...actual, [e.target.name]: e.target.value })); setErrores({}) }
  function guardar(e) {
    e.preventDefault()
    const usuario = {
      ...datos,
      run: datos.run.replace(/[.\-\s]/g,'').toUpperCase(),
      nombre: datos.nombre.trim(), apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim().toLowerCase(), direccion: datos.direccion.trim()
    }
    const erroresNuevos = {}
    if (!validarRun(usuario.run)) erroresNuevos.run = 'RUN inválido.'
    if (!editar && usuarios.some(u => u.run === usuario.run)) erroresNuevos.run = 'RUN ya registrado.'
    if (!usuario.nombre || usuario.nombre.length > 50) erroresNuevos.nombre = 'Nombre requerido (máx. 50).'
    if (!usuario.apellidos || usuario.apellidos.length > 100) erroresNuevos.apellidos = 'Apellidos requeridos (máx. 100).'
    if (!validarCorreo(usuario.correo)) erroresNuevos.correo = 'Usa correo Duoc, profesor Duoc o Gmail.'
    if (usuarios.some(u => u.correo?.toLowerCase() === usuario.correo && (!editar || u.run !== original.run))) erroresNuevos.correo = 'Correo duplicado.'
    if ((!editar || usuario.contrasena) && (usuario.contrasena.length < 4 || usuario.contrasena.length > 10)) erroresNuevos.contrasena = 'Contraseña de 4 a 10 caracteres.'
    if (usuario.direccion.length > 300) erroresNuevos.direccion = 'Máximo 300 caracteres.'
    setErrores(erroresNuevos)
    if (Object.keys(erroresNuevos).length) return
    if (editar && !usuario.contrasena) usuario.contrasena = original.contrasena
    setUsuarios(actual => editar ? actual.map(u => u.run===original.run ? usuario : u) : [...actual, usuario])
    if (editar && original.run === sesion?.run) iniciarSesion(usuario)
    navigate('/admin/usuarios')
  }
  const campos = [['run','RUN'], ['nombre','Nombre'], ['apellidos','Apellidos'], ['correo','Correo electrónico'], ['contrasena',editar?'Nueva contraseña (opcional)':'Contraseña'], ['fechaNacimiento','Fecha de nacimiento'], ['region','Región'], ['comuna','Comuna'], ['direccion','Dirección']]
  return <>
    <div className="admin-encabezado"><p className="admin-etiqueta">GESTIÓN DE USUARIOS</p><h1>{editar?'Editar usuario':'Nuevo usuario'}</h1></div>
    <form className="admin-form" onSubmit={guardar} noValidate>
      <div className="admin-form-grid">
        {campos.map(([id,label])=><div className="admin-campo" key={id}>
          <label htmlFor={id}>{label}</label>
          <input id={id} name={id} type={id==='contrasena'?'password':id==='correo'?'email':id==='fechaNacimiento'?'date':'text'} value={datos[id]||''} onChange={cambiar} readOnly={editar&&id==='run'} maxLength={id==='direccion'?300:undefined}/>
          <p className="admin-error">{errores[id]}</p>
        </div>)}
        <div className="admin-campo"><label htmlFor="tipo">Rol</label>
          <select id="tipo" name="tipo" value={datos.tipo} onChange={cambiar}>
            <option>Cliente</option><option>Vendedor</option><option>Administrador</option>
          </select>
        </div>
      </div>
      <div className="admin-form-acciones"><button type="submit" className="admin-boton">Guardar usuario</button><Link className="admin-cancelar" to="/admin/usuarios">Cancelar</Link></div>
    </form>
  </>
}
export default AdminUsuarioFormulario
