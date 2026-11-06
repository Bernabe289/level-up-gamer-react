// Dirección del backend. Sale de la variable VITE_API_URL (archivo .env); por defecto, el backend local.
const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

// Error de la API: guarda el código HTTP, el mensaje del servidor y la lista de campos inválidos.
export class ErrorApi extends Error {
  constructor(estado, mensaje, errores = []) {
    super(mensaje)
    this.estado = estado
    this.errores = errores
  }
}

export async function pedir(ruta, opciones = {}) {
  let respuesta
  try {
    respuesta = await fetch(`${BASE}${ruta}`, {
      ...opciones,
      headers: { 'Content-Type': 'application/json', ...opciones.headers }
    })
  } catch {
    throw new ErrorApi(0, 'No se pudo conectar con el servidor. Revisa que el backend esté encendido.')
  }
  if (respuesta.status === 204) return null
  const cuerpo = await respuesta.json().catch(() => null)
  if (!respuesta.ok) {
    throw new ErrorApi(respuesta.status, cuerpo?.message || 'Ocurrió un error en el servidor.', cuerpo?.errores || [])
  }
  return cuerpo
}