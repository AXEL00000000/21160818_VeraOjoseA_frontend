import axios from 'axios'

// Dirección del backend
const API = 'http://localhost:3000/api/v2/employees'

export interface Empleado {
  id: number
  user_id: number
  first_name: string
  last_name: string
  phone: string | null
  address: string | null
  job_title: string | null
  hired_at: string
  is_active: boolean
  created_at: string
  updated_at: string
}

// Datos que se mandan al crear o editar
export interface EmpleadoDatos {
  user_id: number
  first_name: string
  last_name: string
  phone: string | null
  address: string | null
  job_title: string | null
  hired_at: string
  is_active: boolean
}

// Ver todos
export const obtenerEmpleados = async () => {
  const respuesta = await axios.get(API)
  return respuesta.data.data as Empleado[]
}

// Ver uno
export const obtenerEmpleado = async (id: number) => {
  const respuesta = await axios.get(`${API}/${id}`)
  return respuesta.data.data as Empleado
}

// Crear
export const crearEmpleado = async (empleado: EmpleadoDatos) => {
  await axios.post(API, empleado)
}

// Actualizar
export const actualizarEmpleado = async (id: number, empleado: EmpleadoDatos) => {
  await axios.put(`${API}/${id}`, empleado)
}

// Eliminar
export const eliminarEmpleado = async (id: number) => {
  await axios.delete(`${API}/${id}`)
}
