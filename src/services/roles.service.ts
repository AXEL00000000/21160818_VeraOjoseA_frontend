import axios from 'axios'

// Dirección del backend
const API = 'http://localhost:3000/api/v2/roles'

export interface Rol {
  id: number
  name: string
  description: string | null
}

// Ver todos
export const obtenerRoles = async () => {
  const respuesta = await axios.get(API)
  return respuesta.data.data as Rol[]
}

// Ver uno
export const obtenerRol = async (id: number) => {
  const respuesta = await axios.get(`${API}/${id}`)
  return respuesta.data.data as Rol
}

// Crear
export const crearRol = async (rol: { name: string; description: string }) => {
  await axios.post(API, rol)
}

// Actualizar
export const actualizarRol = async (id: number, rol: { name: string; description: string }) => {
  await axios.put(`${API}/${id}`, rol)
}

// Eliminar
export const eliminarRol = async (id: number) => {
  await axios.delete(`${API}/${id}`)
}