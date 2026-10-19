# LEVEL-UP GAMER

Tienda online de demostración desarrollada con React, Vite, JavaScript y Bootstrap. Se conserva el diseño de la primera evaluación y se incorporan componentes, rutas, estados y pruebas frontend.

## Requisitos

Node.js 22 o superior, npm y Google Chrome para ejecutar Jasmine/Karma.

## Instalación

En la terminal, desde esta carpeta:

```bash
npm install
npm run dev
```

Abrir la dirección que indique Vite, normalmente `http://localhost:5173`.

## Comprobaciones

```bash
npm run lint
npm run build
npm run test:smoke
npm test
```

`npm test` ejecuta las pruebas Jasmine con Karma en ChromeHeadless. Al finalizar genera `coverage/` con un reporte de cobertura. Para ver el informe, abrir `coverage/index.html` (o el `index.html` dentro de su subcarpeta).

## Funcionalidades

- Catálogo con filtros por nombre, categoría y precio; detalle de productos.
- Carrito con control de stock y descuento del 20% para cuentas Duoc.
- Registro, login y cierre de sesión; correos Duoc, profesor Duoc y Gmail.
- Panel para Administrador/Vendedor con gestión de productos y usuarios.
- Nosotros, Blog, artículos y Contacto.
- Datos almacenados con localStorage: `productosLevelUp`, `usuariosLevelUp`, `sesionLevelUp` y `carrito`.

## Acceso al panel

El registro público crea cuentas de rol Cliente. Para una demostración local, puedes convertir **tu cuenta de prueba** a Administrador desde Chrome > Herramientas de desarrollo > Application > Local Storage, editando el campo `tipo` del usuario dentro de `usuariosLevelUp` a `Administrador`. Después cierra sesión, inicia sesión nuevamente y entra a `/admin`.

No uses datos reales para probar: esta versión académica guarda las contraseñas en el navegador. No hay backend, pasarela de pago ni envío real de mensajes.

## Archivos

- `src/pages`: vistas públicas y administrativas.
- `src/components`: Navbar, Footer, tarjetas y estructura del panel.
- `src/context`: carrito, catálogo, usuarios y sesión.
- `src/utils/tienda.js`: funciones puras de filtrado, descuento y validación.
- `src/styles`: CSS original y ajustes responsive.
- `tests`: 13 casos Jasmine/Karma y 12 comprobaciones rápidas con Node.
- `documentos`: ERS, informe de cobertura y guía de presentación.

## Entrega

Subir el proyecto a un repositorio GitHub público sin `node_modules`, `dist`, `coverage` ni contraseñas/datos reales. Confirmar la ejecución de las pruebas en el Mac antes de presentar su resultado.
