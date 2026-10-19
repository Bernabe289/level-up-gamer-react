# LEVEL-UP GAMER

LEVEL-UP GAMER es una tienda web de productos gamer desarrollada como proyecto académico para la asignatura Desarrollo Fullstack II.

El proyecto comenzó utilizando HTML, CSS y JavaScript durante la Evaluación Parcial 1. Para la Evaluación Parcial 2, la tienda fue actualizada utilizando React, incorporando componentes reutilizables, navegación mediante React Router, manejo de estados y pruebas unitarias.

El sitio permite navegar por un catálogo de productos, revisar información detallada, utilizar un carrito de compras, registrarse, iniciar sesión y acceder a funcionalidades administrativas según el tipo de usuario.

## Objetivo del proyecto

El objetivo de esta segunda etapa fue actualizar la tienda web utilizando React como framework de frontend, manteniendo las funcionalidades desarrolladas anteriormente e incorporando nuevas herramientas y conceptos aprendidos durante la asignatura.

El proyecto incluye componentes React, propiedades (props), estados, contextos, navegación entre páginas, formularios con validaciones, almacenamiento local, sesiones de usuario, carrito de compras y un panel de administración.

Además, se implementaron pruebas unitarias utilizando Jasmine y Karma para comprobar la lógica y el comportamiento de distintas funcionalidades.

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- React
- Vite
- Bootstrap
- React Router
- React Hooks (useState, useEffect y useContext)
- LocalStorage
- Jasmine
- Karma
- Git
- GitHub
- Visual Studio Code
- Node.js y npm

No se utilizó backend ni base de datos. La información se almacena localmente en el navegador mediante LocalStorage.

## Funcionalidades

### Tienda

- Página de inicio.
- Catálogo de productos.
- Filtro de productos por categoría.
- Búsqueda de productos.
- Ordenamiento por precio.
- Vista detallada de cada producto.
- Carrito de compras.
- Modificación de cantidades.
- Eliminación de productos del carrito.
- Control de stock disponible.
- Cálculo automático de subtotal y total.
- Persistencia del carrito mediante LocalStorage.
- Diseño adaptable a diferentes tamaños de pantalla.

### Usuarios

- Registro de usuarios.
- Validación de RUN chileno.
- Validación de correo electrónico.
- Validación de contraseña.
- Validación de mayoría de edad.
- Selección dinámica de región y comuna.
- Inicio de sesión.
- Sesión persistente utilizando LocalStorage.
- Cierre de sesión.

Tipos de usuario:

- Administrador.
- Cliente.
- Vendedor.

### Beneficio Duoc

Los usuarios registrados con correos pertenecientes a los dominios:

- @duoc.cl
- @profesor.duoc.cl

reciben automáticamente un 20% de descuento en el carrito de compras.

El descuento se calcula sobre el subtotal de los productos.

### Panel de administración

El proyecto incluye un panel independiente para administrar la información del sistema.

**Productos**

- Listar productos.
- Crear productos.
- Editar productos.
- Ver detalle de productos.
- Controlar stock.
- Configurar stock crítico.
- Identificar productos con stock crítico.
- Persistir los cambios mediante LocalStorage.

**Usuarios**

- Listar usuarios registrados.
- Crear usuarios.
- Editar usuarios.
- Ver detalle de usuarios.
- Eliminar usuarios.
- Asignar tipos de usuario.
- Administrar región, comuna y dirección.

### Sesiones y acceso

El sistema identifica el tipo de usuario al iniciar sesión y utiliza esa información para controlar el acceso al panel administrativo.

Los usuarios sin una sesión válida no pueden acceder directamente a las páginas administrativas.

Este control se realiza desde el frontend y está pensado para fines académicos.

### Blog y contacto

El sitio también contiene:

- Sección Nosotros.
- Blog.
- Artículos individuales.
- Contenido multimedia.
- Formulario de contacto.
- Validaciones de los campos mediante JavaScript y React.

El formulario de contacto es una demostración y no realiza envíos reales de correo electrónico.

## Implementación con React

Para la Evaluación Parcial 2 se migró el proyecto original a React, manteniendo su diseño y sus principales funcionalidades.

Se utilizaron componentes reutilizables para separar las distintas partes de la aplicación, como el Navbar, Footer y tarjetas de productos.

También se incorporaron:

- **Props:** para enviar información entre componentes.
- **useState:** para gestionar datos que cambian en las páginas y formularios.
- **useEffect:** para ejecutar efectos y mantener información sincronizada.
- **useContext:** para compartir información de productos, carrito, usuarios y sesiones.
- **React Router:** para navegar entre páginas sin recargar completamente la aplicación.
- **Bootstrap:** para apoyar el diseño responsivo.

## Pruebas unitarias

Se implementaron pruebas unitarias utilizando Jasmine y Karma para verificar diferentes funcionalidades de la tienda.

Las pruebas comprueban aspectos como:

- Formato de precios en pesos chilenos.
- Identificación de correos Duoc.
- Aplicación del descuento del 20%.
- Cálculo de subtotal y total.
- Búsqueda y filtros de productos.
- Ordenamiento por precio.
- Validación de stock.
- Validación de correos electrónicos.
- Validación del RUN chileno.
- Visualización de información en componentes React.
- Funcionamiento del botón de agregar al carrito.
- Comportamiento de productos sin stock.

### Resultados

Se ejecutaron las pruebas en Google Chrome mediante Karma y Jasmine.

**Resultados obtenidos:**

- Pruebas Jasmine y Karma: 13 de 13 aprobadas.
- Pruebas adicionales de lógica con Node.js: 12 de 12 aprobadas.
- Cobertura de sentencias: 82,05%.
- Cobertura de ramas: 58,82%.
- Cobertura de funciones: 84,61%.
- Cobertura de líneas: 87,50%.

Los porcentajes corresponden al código instrumentado para las pruebas de cobertura.

### Ubicación de las pruebas

Las pruebas se encuentran en:

- `tests/tienda.spec.js`: pruebas unitarias Jasmine.
- `tests/node-smoke.mjs`: pruebas adicionales de lógica.
- `tests/ui-entry.jsx`: preparación de componentes React para testing.
- `tests/browser-setup.js`: configuración necesaria para las pruebas en el navegador.
- `karma.conf.cjs`: configuración de Karma.
- `src/utils/tienda.js`: funciones utilizadas en las pruebas.

Los informes de cobertura se generan en la carpeta `coverage/` al ejecutar las pruebas.

## Instalación y ejecución

Para ejecutar el proyecto es necesario tener instalado Node.js, npm y un navegador web.

Abrir la carpeta del proyecto en Visual Studio Code y ejecutar:

```bash
npm install
npm run dev
```

Después abrir la dirección indicada por Vite, normalmente:

`http://localhost:5173/`

### Ejecutar pruebas y verificaciones

Comprobar el código con ESLint:

```bash
npm run lint
```

Generar la versión de producción:

```bash
npm run build
```

Ejecutar pruebas adicionales de lógica:

```bash
npm run test:smoke
```

Ejecutar pruebas unitarias con Jasmine y Karma:

```bash
npm test
```

Karma utiliza ChromeHeadless para ejecutar automáticamente las pruebas en el navegador.

## Integrantes

- Pablo Rico
- Bastian Diaz
- Gabriel Bustamante
- Cristian Flores

## Asignatura

DSY1104 - Desarrollo Fullstack II

Evaluación Parcial 2

## Declaración de IA

Durante el desarrollo del proyecto se utilizó ChatGPT de OpenAI como herramienta de apoyo para resolver dudas, desarrollar y adaptar código, revisar errores y orientar diferentes implementaciones.

En esta segunda evaluación, el uso de Inteligencia Artificial se concentró principalmente en apoyar la migración del proyecto original a React, la organización de componentes, la integración de funcionalidades, la revisión del código, la configuración de pruebas unitarias con Jasmine y Karma y la preparación de documentación.

El proyecto fue revisado en el entorno de desarrollo y se realizaron comprobaciones de funcionamiento y ejecución de pruebas. La revisión de los resultados, la entrega y la defensa del proyecto corresponden al equipo.

## Estructura del proyecto

```text
level-up-gamer-react/
│
├── public/
│   └── assets/
│       ├── css/
│       └── img/
│
├── src/
│   ├── components/
│   │   ├── navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Productos.jsx
│   │   ├── DetalleProducto.jsx
│   │   ├── Carrito.jsx
│   │   ├── Login.jsx
│   │   ├── Registro.jsx
│   │   ├── Nosotros.jsx
│   │   ├── Blog.jsx
│   │   ├── ArticuloBlog.jsx
│   │   ├── Contacto.jsx
│   │   ├── Admin.jsx
│   │   ├── AdminProductos.jsx
│   │   ├── AdminProductoFormulario.jsx
│   │   ├── AdminProductoDetalle.jsx
│   │   ├── AdminUsuarios.jsx
│   │   ├── AdminUsuarioFormulario.jsx
│   │   └── AdminUsuarioDetalle.jsx
│   │
│   ├── context/
│   │   ├── CarritoContext.jsx
│   │   ├── ProductosContext.jsx
│   │   ├── UsuariosContext.jsx
│   │   └── tiendaContext.js
│   │
│   ├── data/
│   │   └── productos.js
│   │
│   ├── utils/
│   │   └── tienda.js
│   │
│   ├── styles/
│   │   ├── style.css
│   │   ├── admin.css
│   │   └── ajustes.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── tests/
│   ├── tienda.spec.js
│   ├── node-smoke.mjs
│   ├── ui-entry.jsx
│   └── browser-setup.js
│
├── index.html
├── package.json
├── karma.conf.cjs
├── vite.config.js
├── vite.karma.config.js
└── README.md
```

## Repositorio

Proyecto disponible en GitHub:

https://github.com/Bernabe289/level-up-gamer-react

---

Proyecto académico desarrollado para la asignatura Desarrollo Fullstack II, Duoc UC.
