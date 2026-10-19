import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { UsuariosContext, SesionContext } from '../context/tiendaContext.js'

function AdminUsuarios() {
  const { usuarios, setUsuarios } = useContext(UsuariosContext)
  const { sesion } = useContext(SesionContext)
  function eliminar(run) {
    if (run === sesion.run) return window.alert('No puedes eliminar tu propia cuenta mientras estás conectado.')
    if (window.confirm('¿Eliminar este usuario?')) setUsuarios(actual => actual.filter(u => u.run !== run))
  }
  return <>
    <div className="admin-encabezado admin-encabezado-fila">
      <div><p className="admin-etiqueta">GESTIÓN DE USUARIOS</p><h1>Usuarios</h1></div>
      <Link className="admin-boton" to="/admin/usuario-nuevo">+ Nuevo usuario</Link>
    </div>
    <div className="admin-tabla-contenedor"><table className="admin-tabla"><thead><tr><th>RUN</th><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead><tbody>
      {usuarios.map(u=><tr key={u.run}>
        <td>{u.run}</td><td>{u.nombre} {u.apellidos}</td><td>{u.correo}</td><td>{u.tipo || 'Cliente'}</td>
        <td><Link className="admin-accion" to={`/admin/usuario-detalle?run=${encodeURIComponent(u.run)}`}>Ver</Link>
          <Link className="admin-accion" to={`/admin/usuario-editar?run=${encodeURIComponent(u.run)}`}>Editar</Link>
          <button type="button" className="admin-accion-eliminar" onClick={()=>eliminar(u.run)}>Eliminar</button>
        </td>
      </tr>)}
    </tbody></table>{usuarios.length===0 && <p className="p-4">No hay usuarios registrados.</p>}</div>
  </>
}
export default AdminUsuarios
