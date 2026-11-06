import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import { listarCategorias } from '../api/categoriasApi.js'

const vacio = { id: '', nombre: '', categoriaId: '', fabricante: '', precio: '', stock: '', stockCritico: '', imagen: '', descripcion: '' }

function AdminProductoFormulario({ editar = false }) {
  const [parametros] = useSearchParams()
  const { productos, cargando, error } = useContext(ProductosContext)
  const original = productos.find(p => p.id === parametros.get('id'))

  if (cargando) return <p className="p-4">Cargando...</p>
  if (error && productos.length === 0) return <div><h1>No se pudo cargar</h1><p>{error}</p><Link to="/admin/productos">Volver</Link></div>
  if (editar && !original) return <div><h1>Producto no encontrado</h1><Link to="/admin/productos">Volver</Link></div>
  return <Formulario editar={editar} original={original} />
}

function Formulario({ editar, original }) {
  const navigate = useNavigate()
  const { productos, crear, editar: guardarEdicion } = useContext(ProductosContext)
  const [datos, setDatos] = useState(() => editar ? {
    ...original,
    categoriaId: String(original.categoriaId),
    stockCritico: original.stockCritico ?? ''
  } : vacio)
  const [errores, setErrores] = useState({})
  const [categorias, setCategorias] = useState([])
  const [errorServidor, setErrorServidor] = useState('')
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    let vigente = true
    listarCategorias()
      .then(lista => { if (vigente) setCategorias(lista) })
      .catch(e => { if (vigente) setErrorServidor(e.message) })
    return () => { vigente = false }
  }, [])

  function cambiar(e) {
    setDatos(actual => ({ ...actual, [e.target.name]: e.target.value }))
    setErrores({})
    setErrorServidor('')
  }

  async function guardar(e) {
    e.preventDefault()
    const id = datos.id.trim().toUpperCase()
    const nombre = datos.nombre.trim()
    const precio = Number(datos.precio)
    const stock = Number(datos.stock)
    const stockCritico = datos.stockCritico === '' ? null : Number(datos.stockCritico)
    const erroresNuevos = {}
    if (!/^[A-Z0-9-]{3,20}$/.test(id)) erroresNuevos.id = 'Código de 3 a 20 caracteres (letras, números o guion).'
    else if (!editar && productos.some(p => p.id === id)) erroresNuevos.id = 'Ese código ya existe.'
    if (!nombre || nombre.length > 100) erroresNuevos.nombre = 'Nombre obligatorio (máximo 100 caracteres).'
    if (!datos.categoriaId) erroresNuevos.categoriaId = 'Selecciona una categoría.'
    if (!datos.fabricante.trim()) erroresNuevos.fabricante = 'Ingresa el fabricante.'
    if (datos.precio === '' || !Number.isInteger(precio) || precio <= 0) erroresNuevos.precio = 'Precio debe ser un entero mayor a 0.'
    if (datos.stock === '' || !Number.isInteger(stock) || stock < 0) erroresNuevos.stock = 'Stock debe ser un entero positivo o cero.'
    if (stockCritico !== null && (!Number.isInteger(stockCritico) || stockCritico < 0)) erroresNuevos.stockCritico = 'Stock crítico no válido.'
    if (datos.descripcion.length > 500) erroresNuevos.descripcion = 'Máximo 500 caracteres.'
    let imagen = datos.imagen.trim() || '/assets/img/foto1.png'
    if (!/^https?:\/\//i.test(imagen)) imagen = '/' + imagen.replace(/^\/+/, '')
    if (imagen.length > 255) erroresNuevos.imagen = 'Máximo 255 caracteres.'
    setErrores(erroresNuevos)
    if (Object.keys(erroresNuevos).length) return

    const producto = { id, nombre, categoriaId: Number(datos.categoriaId), fabricante: datos.fabricante.trim(), precio, stock, stockCritico, imagen, descripcion: datos.descripcion.trim() }
    setEnviando(true)
    setErrorServidor('')
    try {
      if (editar) await guardarEdicion(original.id, producto)
      else await crear(producto)
      navigate('/admin/productos')
    } catch (err) {
      // Errores de validación del servidor: se muestran bajo cada campo.
      const porCampo = {}
      for (const { campo, mensaje } of err.errores ?? []) porCampo[campo] = mensaje
      setErrores(porCampo)
      setErrorServidor(err.message)
      setEnviando(false)
    }
  }

  const campos = [
    ['id', 'Código', 'text'], ['nombre', 'Nombre', 'text'], ['fabricante', 'Fabricante', 'text'],
    ['precio', 'Precio', 'number'], ['stock', 'Stock', 'number'], ['stockCritico', 'Stock crítico (opcional)', 'number'], ['imagen', 'Imagen (ruta o URL)', 'text']
  ]
  return <>
    <div className="admin-encabezado"><p className="admin-etiqueta">GESTIÓN DE PRODUCTOS</p><h1>{editar ? 'Editar producto' : 'Agregar producto'}</h1></div>
    <form className="admin-form" onSubmit={guardar} noValidate>
      {errorServidor && <p className="admin-error" role="alert">{errorServidor}</p>}
      <div className="admin-form-grid">
        {campos.slice(0, 2).map(([id,label,tipo]) => <div className="admin-campo" key={id}>
          <label htmlFor={id}>{label}</label><input id={id} name={id} type={tipo} value={datos[id]} onChange={cambiar} readOnly={editar && id==='id'}/><p className="admin-error">{errores[id]}</p>
        </div>)}
        <div className="admin-campo"><label htmlFor="categoriaId">Categoría</label>
          <select id="categoriaId" name="categoriaId" value={datos.categoriaId} onChange={cambiar}><option value="">Selecciona</option>{categorias.map(c=><option key={c.id} value={c.id}>{c.nombre}</option>)}</select><p className="admin-error">{errores.categoriaId}</p>
        </div>
        {campos.slice(2).map(([id,label,tipo]) => <div className="admin-campo" key={id}>
          <label htmlFor={id}>{label}</label><input id={id} name={id} type={tipo} min={tipo==='number'?0:undefined} step="1" value={datos[id]} onChange={cambiar}/><p className="admin-error">{errores[id]}</p>
        </div>)}
        <div className="admin-campo admin-campo-completo"><label htmlFor="descripcion">Descripción</label><textarea id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiar} maxLength={500}/><p className="admin-error">{errores.descripcion}</p></div>
      </div>
      <div className="admin-form-acciones"><button className="admin-boton" type="submit" disabled={enviando}>{enviando ? 'Guardando...' : editar ? 'Guardar cambios' : 'Guardar producto'}</button><Link to="/admin/productos" className="admin-cancelar">Cancelar</Link></div>
    </form>
  </>
}
export default AdminProductoFormulario