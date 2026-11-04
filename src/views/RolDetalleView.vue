<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerRol, type Rol } from '@/services/roles.service'

const route = useRoute()
const rol = ref<Rol | null>(null)
const error = ref('')

// Pide el rol con el id que viene en la URL
onMounted(async () => {
  try {
    rol.value = await obtenerRol(Number(route.params.id))
  } catch {
    error.value = 'No se encontró el rol'
  }
})
</script>

<template>
  <h2>Detalle del rol</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="rol">
    <p><strong>ID:</strong> {{ rol.id }}</p>
    <p><strong>Nombre:</strong> {{ rol.name }}</p>
    <p><strong>Descripción:</strong> {{ rol.description }}</p>
  </div>

  <RouterLink to="/roles">← Volver</RouterLink>
</template>