
import { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ProductosContext } from '../context/tiendaContext.js'
import ProductCard from '../components/ProductCard.jsx'

function Productos() {

  // Productos compartidos
  const { productos } = useContext(ProductosContext)

  // Estados de los filtros
  const [busqueda, setBusqueda] = useState('')
  const [categoria, setCategoria] = useState('todos')
  const [orden, setOrden] = useState('normal')

  // Obtener categorías
  const categorias = [...new Set(
    productos.map(producto => producto.categoria)
  )]

  // Filtrar y ordenar productos
  const productosFiltrados = productos
    .filter(producto =>
      producto.nombre.toLowerCase().includes(
        busqueda.trim().toLowerCase()
      )
    )
    .filter(producto =>
      categoria === 'todos' ||
      producto.categoria === categoria
    )
    .sort((a, b) => {
      if (orden === 'menor') return a.precio - b.precio
      if (orden === 'mayor') return b.precio - a.precio
      return 0
    })

  return (
    <main>
      <section className="catalogo">

        {/* Ruta */}
        <div className="ruta-productos">
          <Link to="/">Inicio</Link>
          <span>/</span>
          <span>Encuentra tu siguiente nivel</span>
        </div>

        {/* Encabezado */}
        <div className="encabezado-productos">
          <h1>Encuentra tu siguiente nivel</h1>
          <p>
            Explora nuestro catálogo y prepara tu próxima partida.
          </p>
        </div>

        {/* Filtros */}
        <div className="filtros-productos">

          {/* Buscar */}
          <div className="campo-filtro">
            <label htmlFor="buscar-producto">
              Buscar producto
            </label>

            <input
              type="text"
              id="buscar-producto"
              placeholder="Nombre del producto"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>

          {/* Categorías */}
          <div className="campo-filtro">
            <label htmlFor="filtro-categoria">
              Categoría
            </label>

            <select
              id="filtro-categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              <option value="todos">
                Todas las categorías
              </option>

              {categorias.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Ordenar */}
          <div className="campo-filtro">
            <label htmlFor="orden-precio">
              Ordenar por precio
            </label>

            <select
              id="orden-precio"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="normal">
                Orden del catálogo
              </option>

              <option value="menor">
                Precio: menor a mayor
              </option>

              <option value="mayor">
                Precio: mayor a menor
              </option>
            </select>
          </div>

        </div>

        {/* Cantidad de productos */}
        <p className="cantidad-productos">
          {productosFiltrados.length === 1
            ? '1 producto'
            : `${productosFiltrados.length} productos`}
        </p>

        {/* Catálogo */}
        <div className="productos-grid">

          {productosFiltrados.map(producto => (
            <ProductCard
              key={producto.id}
              producto={producto}
            />
          ))}

        </div>

        {/* Sin resultados */}
        {productosFiltrados.length === 0 && (
          <p className="text-center py-4">
            No se encontraron productos.
          </p>
        )}

      </section>
    </main>
  )
}

export default Productos
