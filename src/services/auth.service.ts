import axios from 'axios'

// Dirección del login en el backend
const API = 'http://localhost:3000/api/v1/auth'

// Iniciar sesión: manda usuario/correo y contraseña, y guarda el token
export const login = async (identifier: string, password: string) => {
  const respuesta = await axios.post(`${API}/login`, { identifier, password })
  localStorage.setItem('token', respuesta.data.accessToken)
  localStorage.setItem('usuario', respuesta.data.user.username)
}

// Cerrar sesión: borra el token
export const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('usuario')
}

// ¿Hay sesión iniciada?
export const estaLogueado = () => localStorage.getItem('token') !== null

// Nombre del usuario que inició sesión
export const usuarioActual = () => localStorage.getItem('usuario')

// Antes de cada petición, agrega el token en el encabezado Authorization
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Si el backend responde 401 (token vencido o inválido), cierra sesión y manda al login
axios.interceptors.response.use(
  (respuesta) => respuesta,
  (error) => {
    if (error.response?.status === 401 && !error.config.url.endsWith('/login')) {
      logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)