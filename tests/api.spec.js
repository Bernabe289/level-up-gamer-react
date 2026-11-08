/* global describe, it, expect, spyOn */
import { pedir, ErrorApi } from '../src/api/cliente.js'
import { listarProductos, crearProducto, editarProducto, desactivarProducto } from '../src/api/productosApi.js'
import { listarCategorias } from '../src/api/categoriasApi.js'

const respuesta = (cuerpo, estado = 200) =>
  new Response(cuerpo === null ? null : JSON.stringify(cuerpo), { status: estado })

describe('LEVEL-UP GAMER - Capa de acceso a la API', () => {
  it('14. Devuelve el JSON cuando el servidor responde bien', async () => {
    const espia = spyOn(window, 'fetch').and.resolveTo(respuesta([{ id: 'JM001' }]))
    const datos = await pedir('/api/v1/productos')
    expect(datos).toEqual([{ id: 'JM001' }])
    expect(espia.calls.mostRecent().args[0]).toBe('http://localhost:8080/api/v1/productos')
  })

  it('15. Devuelve null cuando el servidor responde 204 sin cuerpo', async () => {
    spyOn(window, 'fetch').and.resolveTo(respuesta(null, 204))
    expect(await pedir('/api/v1/productos/JM001', { method: 'DELETE' })).toBeNull()
  })

  it('16. Lanza ErrorApi con el mensaje y los errores por campo en un 400', async () => {
    const errores = [{ campo: 'precio', mensaje: 'Debe ser mayor que 0' }]
    spyOn(window, 'fetch').and.resolveTo(respuesta({ message: 'Solicitud inválida', errores }, 400))
    const error = await pedir('/api/v1/productos', { method: 'POST' }).catch(e => e)
    expect(error instanceof ErrorApi).toBeTrue()
    expect(error.estado).toBe(400)
    expect(error.message).toBe('Solicitud inválida')
    expect(error.errores).toEqual(errores)
  })

  it('17. Avisa con estado 0 cuando no se puede conectar con el servidor', async () => {
    spyOn(window, 'fetch').and.rejectWith(new TypeError('Failed to fetch'))
    const error = await pedir('/api/v1/productos').catch(e => e)
    expect(error.estado).toBe(0)
    expect(error.message).toContain('No se pudo conectar')
  })

  it('18. Usa un mensaje general si el error no trae un JSON', async () => {
    spyOn(window, 'fetch').and.resolveTo(new Response('caída', { status: 500 }))
    const error = await pedir('/api/v1/productos').catch(e => e)
    expect(error.estado).toBe(500)
    expect(error.message).toBe('Ocurrió un error en el servidor.')
  })

  it('19. Lista los productos con GET a /api/v1/productos', async () => {
    const espia = spyOn(window, 'fetch').and.resolveTo(respuesta([]))
    await listarProductos()
    expect(espia.calls.mostRecent().args[0]).toBe('http://localhost:8080/api/v1/productos')
  })

  it('20. Crea un producto con POST y el cuerpo en JSON', async () => {
    const espia = spyOn(window, 'fetch').and.resolveTo(respuesta({ id: 'ZZ-1' }, 201))
    await crearProducto({ id: 'ZZ-1', precio: 1990 })
    const [url, opciones] = espia.calls.mostRecent().args
    expect(url).toBe('http://localhost:8080/api/v1/productos')
    expect(opciones.method).toBe('POST')
    expect(JSON.parse(opciones.body)).toEqual({ id: 'ZZ-1', precio: 1990 })
  })

  it('21. Edita con PUT y desactiva con DELETE, protegiendo el código en la ruta', async () => {
    const espia = spyOn(window, 'fetch').and.callFake(() => Promise.resolve(respuesta({})))
    await editarProducto('A B', { nombre: 'X' })
    expect(espia.calls.mostRecent().args[0]).toBe('http://localhost:8080/api/v1/productos/A%20B')
    expect(espia.calls.mostRecent().args[1].method).toBe('PUT')
    espia.and.callFake(() => Promise.resolve(respuesta(null, 204)))
    await desactivarProducto('JM001')
    expect(espia.calls.mostRecent().args[0]).toBe('http://localhost:8080/api/v1/productos/JM001')
    expect(espia.calls.mostRecent().args[1].method).toBe('DELETE')
  })

  it('22. Lista las categorías con GET a /api/v1/categorias', async () => {
    const espia = spyOn(window, 'fetch').and.resolveTo(respuesta([]))
    await listarCategorias()
    expect(espia.calls.mostRecent().args[0]).toBe('http://localhost:8080/api/v1/categorias')
  })
})