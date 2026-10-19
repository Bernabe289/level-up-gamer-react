import { createRoot } from 'react-dom/client'
import { flushSync } from 'react-dom'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from '../src/components/ProductCard.jsx'
import { CarritoContext } from '../src/context/tiendaContext.js'

window.LevelUpTest = {
  renderCard(contenedor, producto, agregar = () => {}) {
    const root = createRoot(contenedor)
    flushSync(() => {
      root.render(
        <MemoryRouter>
          <CarritoContext.Provider value={{ agregarAlCarrito: agregar }}>
            <ProductCard producto={producto} />
          </CarritoContext.Provider>
        </MemoryRouter>
      )
    })
    return () => root.unmount()
  }
}
