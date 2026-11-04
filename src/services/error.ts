import axios from 'axios'

// Saca el mensaje de error que manda el backend (ej. "password debe tener al menos 8 caracteres")
export const mensajeError = (e: unknown, porDefecto: string) => {
  if (axios.isAxiosError(e) && e.response?.data?.message) {
    return e.response.data.message as string
  }
  return porDefecto
}
