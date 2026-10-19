import { useContext, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CarritoContext, ProductosContext } from '../context/tiendaContext.js'
import { formatoPrecio } from '../utils/tienda.js'

function DetalleProducto() {
  const [parametros] = useSearchParams()
  const { productos } = useContext(ProductosContext)
  const { agregarAlCarrito } = useContext(CarritoContext)
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')
  const producto = productos.find(p => p.id === parametros.get('id'))
  if (!producto) return <main className="container py-5"><h1>Producto no encontrado</h1><Link to="/productos">Volver al catálogo</Link></main>
  function agregar() {
    if (agregarAlCarrito(producto.id, cantidad)) setMensaje('Producto agregado al carrito.')
  }
  return (
    <main><section className="detalle-producto container py-5">
      <Link to="/productos" className="volver-productos">← Volver a productos</Link>
      <div className="detalle-contenido">
        <div className="detalle-imagen"><img src={producto.imagen} alt={producto.nombre}/></div>
        <div className="detalle-informacion">
          <p className="producto-categoria">{producto.categoria}</p>
          <h1>{producto.nombre}</h1>
          <p className="detalle-dato">Código: <span>{producto.id}</span></p>
          <p className="detalle-descripcion">{producto.descripcion}</p>
          <p className="detalle-dato">Fabricante: <span>{producto.fabricante}</span></p>
          <p className="detalle-precio">{formatoPrecio(producto.precio)}</p>
          <p className="detalle-stock">{producto.stock > 0 ? `${producto.stock} unidades disponibles` : 'Sin stock'}</p>
          <div className="detalle-compra">
            <div className="cantidad-producto"><label htmlFor="cantidad">Cantidad</label>
              <input id="cantidad" type="number" min="1" max={producto.stock} value={cantidad} onChange={e => setCantidad(e.target.value)} disabled={!producto.stock}/>
            </div>
            <button className="boton-agregar" type="button" disabled={!producto.stock} onClick={agregar}>Añadir al carrito</button>
          </div>
          {mensaje && <p className="mensaje-duoc" role="status">{mensaje} <Link to="/carrito">Ver carrito</Link></p>}
          <p className="mensaje-duoc">Usuarios Duoc tienen 20% de descuento al iniciar sesión.</p>
        </div>
      </div>
    </section></main>
  )
}
export default DetalleProducto
