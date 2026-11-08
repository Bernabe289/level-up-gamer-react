import { pedir } from './cliente.js'

export const listarCategorias = () => pedir('/api/v1/categorias')