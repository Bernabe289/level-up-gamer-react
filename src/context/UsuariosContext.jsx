import { useEffect, useState } from 'react'
import { datosGuardados } from '../utils/tienda.js'
import { SesionContext, UsuariosContext } from './tiendaContext.js'

export function UsuariosProvider({ children }) {
  const [usuarios, setUsuarios] = useState(() => {
    const guardados = datosGuardados('usuariosLevelUp', [])
    return Array.isArray(guardados) ? guardados : []
  })
  const [sesion, setSesion] = useState(() => datosGuardados('sesionLevelUp', null))
  useEffect(() => { localStorage.setItem('usuariosLevelUp', JSON.stringify(usuarios)) }, [usuarios])
  useEffect(() => {
    if (sesion) localStorage.setItem('sesionLevelUp', JSON.stringify(sesion))
    else localStorage.removeItem('sesionLevelUp')
  }, [sesion])
  function iniciarSesion(usuario) {
    setSesion({ run: usuario.run, nombre: usuario.nombre, correo: usuario.correo, tipo: usuario.tipo || 'Cliente' })
  }
  function cerrarSesion() { setSesion(null) }
  return (
    <UsuariosContext.Provider value={{ usuarios, setUsuarios }}>
      <SesionContext.Provider value={{ sesion, iniciarSesion, cerrarSesion }}>
        {children}
      </SesionContext.Provider>
    </UsuariosContext.Provider>
  )
}
