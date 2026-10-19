export function formatoPrecio(valor) {
  return '$' + Number(valor || 0).toLocaleString('es-CL')
}

export function correoDuoc(correo = '') {
  const normalizado = String(correo).trim().toLowerCase()
  return normalizado.endsWith('@duoc.cl') || normalizado.endsWith('@profesor.duoc.cl')
}

export function calcularTotales(items, productos, correo = '') {
  const subtotal = items.reduce((acumulado, item) => {
    const producto = productos.find(p => p.id === item.id)
    return acumulado + (producto ? producto.precio * item.cantidad : 0)
  }, 0)
  const descuento = correoDuoc(correo) ? Math.round(subtotal * 0.2) : 0
  return { subtotal, descuento, total: subtotal - descuento }
}

export function filtrarProductos(productos, busqueda = '', categoria = 'todos', orden = 'normal') {
  const texto = busqueda.trim().toLowerCase()
  const resultado = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(texto) &&
    (categoria === 'todos' || producto.categoria === categoria)
  )
  if (orden === 'menor') return [...resultado].sort((a, b) => a.precio - b.precio)
  if (orden === 'mayor') return [...resultado].sort((a, b) => b.precio - a.precio)
  return resultado
}

export function limitarCantidad(valor, stock) {
  const cantidad = Math.max(1, Math.floor(Number(valor) || 1))
  return Math.min(cantidad, Math.max(0, Number(stock) || 0))
}

export function validarCorreo(correo) {
  return /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i.test(String(correo).trim())
}

export function validarRun(run) {
  const limpio = String(run).replace(/[.\-\s]/g, '').toUpperCase()
  if (!/^\d{6,8}[0-9K]$/.test(limpio)) return false
  const cuerpo = limpio.slice(0, -1)
  let suma = 0
  let factor = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * factor
    factor = factor === 7 ? 2 : factor + 1
  }
  const resto = 11 - (suma % 11)
  const verificador = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return limpio.at(-1) === verificador
}

export function datosGuardados(clave, fallback) {
  try {
    const valor = JSON.parse(localStorage.getItem(clave))
    return valor ?? fallback
  } catch {
    return fallback
  }
}
