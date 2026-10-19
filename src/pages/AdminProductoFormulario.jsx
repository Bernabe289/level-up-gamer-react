import { useContext, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'

const categorias = ['Juegos de Mesa', 'Accesorios', 'Consolas', 'Computadores Gamers', 'Sillas Gamers', 'Mouse', 'Mousepad', 'Poleras Personalizadas']
const vacio = { id: '', nombre: '', categoria: '', fabricante: '', precio: '', stock: '', stockCritico: '', imagen: '', descripcion: '' }

function AdminProductoFormulario({ editar = false }) {
  const navigate = useNavigate()
  const [parametros] = useSearchParams()
  const { productos, setProductos } = useContext(ProductosContext)
  const original = productos.find(p => p.id === parametros.get('id'))
  const [datos, setDatos] = useState(() => editar && original ? {
    ...original,
    stockCritico: original.stockCritico ?? ''
  } : vacio)
  const [errores, setErrores] = useState({})

  if (editar && !original) return <div><h1>Producto no encontrado</h1><Link to="/admin/productos">Volver</Link></div>
  function cambiar(e) { setDatos(actual => ({ ...actual, [e.target.name]: e.target.value })); setErrores({}) }
  function guardar(e) {
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
    if (!datos.categoria) erroresNuevos.categoria = 'Selecciona una categoría.'
    if (!datos.fabricante.trim()) erroresNuevos.fabricante = 'Ingresa el fabricante.'
    if (datos.precio === '' || !Number.isFinite(precio) || precio <= 0) erroresNuevos.precio = 'Precio debe ser mayor a 0.'
    if (datos.stock === '' || !Number.isInteger(stock) || stock < 0) erroresNuevos.stock = 'Stock debe ser un entero positivo o cero.'
    if (stockCritico !== null && (!Number.isInteger(stockCritico) || stockCritico < 0)) erroresNuevos.stockCritico = 'Stock crítico no válido.'
    if (datos.descripcion.length > 500) erroresNuevos.descripcion = 'Máximo 500 caracteres.'
    setErrores(erroresNuevos)
    if (Object.keys(erroresNuevos).length) return
    let imagen = datos.imagen.trim() || '/assets/img/foto1.png'
    if (!/^https?:\/\//i.test(imagen)) imagen = '/' + imagen.replace(/^\/+/, '')
    const producto = { id, nombre, categoria: datos.categoria, fabricante: datos.fabricante.trim(), precio, stock, stockCritico, imagen, descripcion: datos.descripcion.trim() }
    setProductos(actual => editar ? actual.map(p => p.id === original.id ? producto : p) : [...actual, producto])
    navigate('/admin/productos')
  }
  const campos = [
    ['id', 'Código', 'text'], ['nombre', 'Nombre', 'text'], ['fabricante', 'Fabricante', 'text'],
    ['precio', 'Precio', 'number'], ['stock', 'Stock', 'number'], ['stockCritico', 'Stock crítico (opcional)', 'number'], ['imagen', 'Imagen (ruta o URL)', 'text']
  ]
  return <>
    <div className="admin-encabezado"><p className="admin-etiqueta">GESTIÓN DE PRODUCTOS</p><h1>{editar ? 'Editar producto' : 'Agregar producto'}</h1></div>
    <form className="admin-form" onSubmit={guardar} noValidate>
      <div className="admin-form-grid">
        {campos.slice(0, 2).map(([id,label,tipo]) => <div className="admin-campo" key={id}>
          <label htmlFor={id}>{label}</label><input id={id} name={id} type={tipo} value={datos[id]} onChange={cambiar} readOnly={editar && id==='id'}/><p className="admin-error">{errores[id]}</p>
        </div>)}
        <div className="admin-campo"><label htmlFor="categoria">Categoría</label>
          <select id="categoria" name="categoria" value={datos.categoria} onChange={cambiar}><option value="">Selecciona</option>{categorias.map(c=><option key={c}>{c}</option>)}</select><p className="admin-error">{errores.categoria}</p>
        </div>
        {campos.slice(2).map(([id,label,tipo]) => <div className="admin-campo" key={id}>
          <label htmlFor={id}>{label}</label><input id={id} name={id} type={tipo} min={tipo==='number'?0:undefined} step={id==='precio'?'any':'1'} value={datos[id]} onChange={cambiar}/><p className="admin-error">{errores[id]}</p>
        </div>)}
        <div className="admin-campo admin-campo-completo"><label htmlFor="descripcion">Descripción</label><textarea id="descripcion" name="descripcion" value={datos.descripcion} onChange={cambiar} maxLength={500}/><p className="admin-error">{errores.descripcion}</p></div>
      </div>
      <div className="admin-form-acciones"><button className="admin-boton" type="submit">{editar ? 'Guardar cambios' : 'Guardar producto'}</button><Link to="/admin/productos" className="admin-cancelar">Cancelar</Link></div>
    </form>
  </>
}
export default AdminProductoFormulario
