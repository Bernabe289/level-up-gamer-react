
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CarritoContext } from '../context/tiendaContext.js'

function ProductCard({ producto }) {

  const { agregarAlCarrito } = useContext(CarritoContext)

  return (
    <article className="producto-card">

      {/* Imagen */}
      <Link to={`/detalle-producto?id=${producto.id}`}>
        <img
          src={producto.imagen}
          alt={producto.nombre}
        />
      </Link>

      {/* Categoría */}
      <p className="producto-categoria">
        {producto.categoria}
      </p>

      {/* Nombre */}
      <h3>
        <Link to={`/detalle-producto?id=${producto.id}`}>
          {producto.nombre}
        </Link>
      </h3>

      {/* Precio */}
      <p className="producto-precio">
        ${producto.precio.toLocaleString('es-CL')}
      </p>

      {/* Botón carrito */}
      <button
        type="button"
        className="boton-agregar"
        onClick={() => agregarAlCarrito(producto.id)}
        disabled={producto.stock <= 0}
      >
        {producto.stock > 0
          ? 'Añadir al carrito'
          : 'Sin stock'}
      </button>

    </article>
  )
}

export default ProductCard
