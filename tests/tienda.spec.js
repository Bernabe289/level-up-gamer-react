/* global describe, it, expect, jasmine */
import {
  formatoPrecio, correoDuoc, calcularTotales, filtrarProductos,
  limitarCantidad, validarCorreo, validarRun
} from '../src/utils/tienda.js'

const lista = [
  { id: 'A', nombre: 'Mouse', categoria: 'Accesorios', precio: 20000, stock: 3 },
  { id: 'B', nombre: 'Consola', categoria: 'Consolas', precio: 50000, stock: 4 },
  { id: 'C', nombre: 'Teclado', categoria: 'Accesorios', precio: 10000, stock: 2 }
]

describe('LEVEL-UP GAMER - Pruebas unitarias', () => {
  it('1. Muestra los precios en pesos chilenos', () => {
    expect(formatoPrecio(29990)).toBe('$29.990')
  })
  it('2. Reconoce cuentas Duoc sin importar las mayúsculas', () => {
    expect(correoDuoc('Alumno@DUOC.CL')).toBeTrue()
  })
  it('3. No aplica el beneficio a cuentas Gmail', () => {
    expect(correoDuoc('usuario@gmail.com')).toBeFalse()
  })
  it('4. Calcula subtotal, descuento y total del carrito', () => {
    expect(calcularTotales([{ id: 'A', cantidad: 2 }], lista, 'a@duoc.cl')).toEqual({ subtotal: 40000, descuento: 8000, total: 32000 })
  })
  it('5. Filtra productos por nombre sin importar mayúsculas', () => {
    expect(filtrarProductos(lista, 'MOU').map(p => p.id)).toEqual(['A'])
  })
  it('6. Filtra productos por categoría', () => {
    expect(filtrarProductos(lista, '', 'Accesorios').length).toBe(2)
  })
  it('7. Ordena productos por precio de menor a mayor', () => {
    expect(filtrarProductos(lista, '', 'todos', 'menor').map(p => p.id)).toEqual(['C', 'A', 'B'])
  })
  it('8. Impide que la cantidad supere el stock', () => {
    expect(limitarCantidad(50, 3)).toBe(3)
  })
  it('9. Valida dominios permitidos en el login', () => {
    expect(validarCorreo('a@gmail.com')).toBeTrue()
    expect(validarCorreo('a@ejemplo.com')).toBeFalse()
  })
  it('10. Comprueba el dígito verificador del RUN', () => {
    expect(validarRun('11111111-1')).toBeTrue()
    expect(validarRun('11111111-2')).toBeFalse()
  })
  it('11. Muestra el nombre y precio en la tarjeta React', () => {
    const nodo = document.createElement('div')
    document.body.appendChild(nodo)
    const quitar = window.LevelUpTest.renderCard(nodo, lista[0])
    expect(nodo.textContent).toContain('Mouse')
    expect(nodo.textContent).toContain('$20.000')
    quitar()
    nodo.remove()
  })
  it('12. El botón del componente llama al agregar al carrito', () => {
    const nodo = document.createElement('div')
    document.body.appendChild(nodo)
    const spyAgregar = jasmine.createSpy('agregarAlCarrito')
    const quitar = window.LevelUpTest.renderCard(nodo, lista[0], spyAgregar)
    nodo.querySelector('button').click()
    expect(spyAgregar).toHaveBeenCalledWith('A')
    quitar()
    nodo.remove()
  })
  it('13. Desactiva el botón cuando un producto no tiene stock', () => {
    const nodo = document.createElement('div')
    document.body.appendChild(nodo)
    const quitar = window.LevelUpTest.renderCard(nodo, { ...lista[0], stock: 0 })
    expect(nodo.querySelector('button').disabled).toBeTrue()
    quitar()
    nodo.remove()
  })
})
