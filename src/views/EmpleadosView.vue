<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { obtenerEmpleados, eliminarEmpleado, type Empleado } from '@/services/empleados.service'
import { obtenerUsuarios, type Usuario } from '@/services/usuarios.service'
import { mensajeError } from '@/services/error'

const empleados = ref<Empleado[]>([])
const usuarios = ref<Usuario[]>([])
const error = ref('')

// Pide los empleados y los usuarios (para mostrar el nombre de usuario)
const cargarEmpleados = async () => {
  try {
    empleados.value = await obtenerEmpleados()
    usuarios.value = await obtenerUsuarios()
    error.value = ''
  } catch {
    error.value = 'No se pudo conectar con el backend'
  }
}

// Busca el username por su id
const nombreUsuario = (id: number) => usuarios.value.find((u) => u.id === id)?.username ?? id

// Elimina un empleado (pregunta antes)
const eliminar = async (empleado: Empleado) => {
  if (!confirm(`¿Eliminar al empleado "${empleado.first_name} ${empleado.last_name}"?`)) return
  try {
    await eliminarEmpleado(empleado.id)
    await cargarEmpleados()
  } catch (e) {
    error.value = mensajeError(e, 'No se pudo eliminar el empleado')
  }
}

onMounted(cargarEmpleados)
</script>

<template>
  <h2>Empleados</h2>
  <RouterLink to="/empleados/nuevo">+ Nuevo empleado</RouterLink>

  <p v-if="error" class="error">{{ error }}</p>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Puesto</th>
        <th>Usuario</th>
        <th>Activo</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="empleado in empleados" :key="empleado.id">
        <td>{{ empleado.id }}</td>
        <td>{{ empleado.first_name }} {{ empleado.last_name }}</td>
        <td>{{ empleado.job_title }}</td>
        <td>{{ nombreUsuario(empleado.user_id) }}</td>
        <td>{{ empleado.is_active ? 'Sí' : 'No' }}</td>
        <td>
          <RouterLink :to="`/empleados/${empleado.id}`">Ver</RouterLink> 
          <RouterLink :to="`/empleados/${empleado.id}/editar`">Editar</RouterLink> 
          <button @click="eliminar(empleado)">Eliminar</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
