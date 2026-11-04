import axios from 'axios'

// Dirección del backend
const API = 'http://localhost:3000/api/v2/usuarios'

export interface Usuario {
  id: number
  username: string
  email: string
  role_id: number
  is_active: boolean
  created_at: string
  updated_at: string
}

// Datos que se mandan al crear o editar (password solo si se escribe una)
export interface UsuarioDatos {
  username: string
  email: string
  role_id: number
  password?: string
  is_active?: boolean
}

// Ver todos
export const obtenerUsuarios = async () => {
  const respuesta = await axios.get(API)
  return respuesta.data.data as Usuario[]
}

// Ver uno
export const obtenerUsuario = async (id: number) => {
  const respuesta = await axios.get(`${API}/${id}`)
  return respuesta.data.data as Usuario
}

// Crear
export const crearUsuario = async (usuario: UsuarioDatos) => {
  await axios.post(API, usuario)
}

// Actualizar
export const actualizarUsuario = async (id: number, usuario: UsuarioDatos) => {
  await axios.put(`${API}/${id}`, usuario)
}

// Eliminar
export const eliminarUsuario = async (id: number) => {
  await axios.delete(`${API}/${id}`)
}
