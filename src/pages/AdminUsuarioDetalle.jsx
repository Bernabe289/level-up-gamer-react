import { useContext } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { UsuariosContext } from '../context/tiendaContext.js'
function AdminUsuarioDetalle() {
  const [parametros] = useSearchParams()
  const { usuarios } = useContext(UsuariosContext)
  const usuario = usuarios.find(u => u.run === parametros.get('run'))
  if (!usuario) return <div><h1>Usuario no encontrado</h1><Link to="/admin/usuarios">Volver</Link></div>
  const campos = [['RUN',usuario.run],['Nombre',usuario.nombre],['Apellidos',usuario.apellidos],['Correo',usuario.correo],['Rol',usuario.tipo||'Cliente'],['Nacimiento',usuario.fechaNacimiento||'No especificado'],['Región',usuario.region||'-'],['Comuna',usuario.comuna||'-'],['Dirección',usuario.direccion||'-']]
  return <><div className="admin-encabezado"><p className="admin-etiqueta">DETALLE DE USUARIO</p><h1>{usuario.nombre} {usuario.apellidos}</h1></div>
    <div className="admin-form">{campos.map(([nombre,valor])=><div className="admin-detalle-dato" key={nombre}><strong>{nombre}</strong><span>{valor}</span></div>)}
      <div className="admin-form-acciones"><Link className="admin-boton" to={`/admin/usuario-editar?run=${encodeURIComponent(usuario.run)}`}>Editar</Link><Link className="admin-cancelar" to="/admin/usuarios">Volver</Link></div>
    </div>
  </>
}
export default AdminUsuarioDetalle
