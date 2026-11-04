<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerEmpleado, type Empleado } from '@/services/empleados.service'
import { obtenerUsuario } from '@/services/usuarios.service'

const route = useRoute()
const empleado = ref<Empleado | null>(null)
const usuario = ref('')
const error = ref('')

// Pide el empleado con el id de la URL y luego su usuario
onMounted(async () => {
  try {
    empleado.value = await obtenerEmpleado(Number(route.params.id))
    usuario.value = (await obtenerUsuario(empleado.value.user_id)).username
  } catch {
    error.value = 'No se encontró el empleado'
  }
})
</script>

<template>
  <h2>Detalle del empleado</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="empleado">
    <p><strong>ID:</strong> {{ empleado.id }}</p>
    <p><strong>Nombre:</strong> {{ empleado.first_name }} {{ empleado.last_name }}</p>
    <p><strong>Usuario:</strong> {{ usuario }}</p>
    <p><strong>Teléfono:</strong> {{ empleado.phone }}</p>
    <p><strong>Dirección:</strong> {{ empleado.address }}</p>
    <p><strong>Puesto:</strong> {{ empleado.job_title }}</p>
    <p><strong>Contratado:</strong> {{ empleado.hired_at.slice(0, 10) }}</p>
    <p><strong>Activo:</strong> {{ empleado.is_active ? 'Sí' : 'No' }}</p>
  </div>

  <RouterLink to="/empleados">← Volver</RouterLink>
</template>
