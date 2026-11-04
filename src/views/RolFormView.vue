<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerRol, crearRol, actualizarRol } from '@/services/roles.service'

const route = useRoute()
const router = useRouter()

// Si la URL trae id, estamos editando; si no, es un rol nuevo
const id = route.params.id ? Number(route.params.id) : null

const nombre = ref('')
const descripcion = ref('')
const error = ref('')

// Al editar, llena el formulario con los datos actuales
onMounted(async () => {
  if (!id) return
  try {
    const rol = await obtenerRol(id)
    nombre.value = rol.name
    descripcion.value = rol.description ?? ''
  } catch {
    error.value = 'No se encontró el rol'
  }
})

// Crea o actualiza, y regresa a la tabla
const guardar = async () => {
  const datos = { name: nombre.value, description: descripcion.value }
  try {
    if (id) {
      await actualizarRol(id, datos)
    } else {
      await crearRol(datos)
    }
    router.push('/roles')
  } catch {
    error.value = 'No se pudo guardar el rol (¿el nombre ya existe?)'
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar rol' : 'Nuevo rol' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <p>
      <label>Nombre</label><br />
      <input v-model="nombre" required maxlength="30" />
    </p>
    <p>
      <label>Descripción</label><br />
      <textarea v-model="descripcion"></textarea>
    </p>
    <button type="submit">Guardar</button>
  </form>

  <RouterLink to="/roles">← Cancelar</RouterLink>
</template>