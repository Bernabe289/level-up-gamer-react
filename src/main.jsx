import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ProductosProvider } from './context/ProductosContext.jsx'
import { CarritoProvider } from './context/CarritoContext.jsx'
import { UsuariosProvider } from './context/UsuariosContext.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'
import './styles/admin.css'
import './styles/ajustes.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <UsuariosProvider>
        <ProductosProvider>
          <CarritoProvider>
            <App />
          </CarritoProvider>
        </ProductosProvider>
      </UsuariosProvider>
    </BrowserRouter>
  </React.StrictMode>
)
