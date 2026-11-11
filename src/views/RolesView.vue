<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { obtenerRoles, eliminarRol, type Rol } from '@/services/roles.service'

const roles = ref<Rol[]>([])
const error = ref('')

// Pide los roles al backend
const cargarRoles = async () => {
  try {
    roles.value = await obtenerRoles()
    error.value = ''
  } catch {
    error.value = 'No se pudo conectar con el backend'
  }
}

// Elimina un rol (pregunta antes)
const eliminar = async (rol: Rol) => {
  if (!confirm(`¿Eliminar el rol "${rol.name}"?`)) return
  try {
    await eliminarRol(rol.id)
    await cargarRoles()
  } catch {
    error.value = 'No se pudo eliminar el rol'
  }
}

onMounted(cargarRoles)
</script>

<template>
  <h2>Roles</h2>
  <RouterLink to="/roles/nuevo">+ Nuevo rol</RouterLink>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="rol in roles" :key="rol.id">
        <td>{{ rol.id }}</td>
        <td>{{ rol.name }}</td>
        <td>{{ rol.description }}</td>
        <td>
          <RouterLink :to="`/roles/${rol.id}`">Ver</RouterLink> 
          <RouterLink :to="`/roles/${rol.id}/editar`">Editar</RouterLink> 
          <button @click="eliminar(rol)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>