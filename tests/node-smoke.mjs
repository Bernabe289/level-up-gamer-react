import assert from 'node:assert/strict'
import { test } from 'node:test'
import { formatoPrecio, correoDuoc, calcularTotales, filtrarProductos, limitarCantidad, validarCorreo, validarRun } from '../src/utils/tienda.js'
const productos = [{ id: 'A', nombre: 'Mouse Gamer', categoria: 'Accesorios', precio: 20000, stock: 3 }, { id: 'B', nombre: 'Consola', categoria: 'Consolas', precio: 50000, stock: 4 }]
test('Precio chileno', () => assert.equal(formatoPrecio(29990), '$29.990'))
test('Correo Duoc', () => assert.equal(correoDuoc('a@duoc.cl'), true))
test('Gmail sin beneficio', () => assert.equal(correoDuoc('b@gmail.com'), false))
test('Descuento sobre carrito', () => assert.deepEqual(calcularTotales([{ id: 'A', cantidad: 2 }], productos, 'a@duoc.cl'), { subtotal: 40000, descuento: 8000, total: 32000 }))
test('Filtro nombre', () => assert.equal(filtrarProductos(productos, 'MOU').length, 1))
test('Filtro categoría', () => assert.equal(filtrarProductos(productos, '', 'Consolas')[0].id, 'B'))
test('Orden de precio', () => assert.equal(filtrarProductos(productos, '', 'todos', 'mayor')[0].id, 'B'))
test('Límite de stock', () => assert.equal(limitarCantidad(8, 3), 3))
test('Correo válido', () => assert.equal(validarCorreo('a@gmail.com'), true))
test('Correo no permitido', () => assert.equal(validarCorreo('a@example.com'), false))
test('RUN válido', () => assert.equal(validarRun('11111111-1'), true))
test('RUN inválido', () => assert.equal(validarRun('11111111-2'), false))
