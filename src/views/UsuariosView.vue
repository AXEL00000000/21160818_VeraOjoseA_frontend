<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { obtenerUsuarios, eliminarUsuario, type Usuario } from '@/services/usuarios.service'
import { obtenerRoles, type Rol } from '@/services/roles.service'
import { mensajeError } from '@/services/error'

const usuarios = ref<Usuario[]>([])
const roles = ref<Rol[]>([])
const error = ref('')

// Pide los usuarios y los roles (para mostrar el nombre del rol)
const cargarUsuarios = async () => {
  try {
    usuarios.value = await obtenerUsuarios()
    roles.value = await obtenerRoles()
    error.value = ''
  } catch {
    error.value = 'No se pudo conectar con el backend'
  }
}

// Busca el nombre del rol por su id
const nombreRol = (id: number) => roles.value.find((r) => r.id === id)?.name ?? id

// Elimina un usuario (pregunta antes)
const eliminar = async (usuario: Usuario) => {
  if (!confirm(`¿Eliminar el usuario "${usuario.username}"?`)) return
  try {
    await eliminarUsuario(usuario.id)
    await cargarUsuarios()
  } catch (e) {
    error.value = mensajeError(e, 'No se pudo eliminar el usuario')
  }
}

onMounted(cargarUsuarios)
</script>

<template>
  <h2>Usuarios</h2>
  <RouterLink to="/usuarios/nuevo">+ Nuevo usuario</RouterLink>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Usuario</th>
        <th>Correo</th>
        <th>Rol</th>
        <th>Activo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="usuario in usuarios" :key="usuario.id">
        <td>{{ usuario.id }}</td>
        <td>{{ usuario.username }}</td>
        <td>{{ usuario.email }}</td>
        <td>{{ nombreRol(usuario.role_id) }}</td>
        <td>{{ usuario.is_active ? 'Sí' : 'No' }}</td>
        <td>
          <RouterLink :to="`/usuarios/${usuario.id}`">Ver</RouterLink> 
          <RouterLink :to="`/usuarios/${usuario.id}/editar`">Editar</RouterLink> 
          <button @click="eliminar(usuario)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
