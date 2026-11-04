<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { obtenerUsuario, type Usuario } from '@/services/usuarios.service'
import { obtenerRol } from '@/services/roles.service'

const route = useRoute()
const usuario = ref<Usuario | null>(null)
const rol = ref('')
const error = ref('')

// Pide el usuario con el id de la URL y luego el nombre de su rol
onMounted(async () => {
  try {
    usuario.value = await obtenerUsuario(Number(route.params.id))
    rol.value = (await obtenerRol(usuario.value.role_id)).name
  } catch {
    error.value = 'No se encontró el usuario'
  }
})
</script>

<template>
  <h2>Detalle del usuario</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <div v-if="usuario">
    <p><strong>ID:</strong> {{ usuario.id }}</p>
    <p><strong>Usuario:</strong> {{ usuario.username }}</p>
    <p><strong>Correo:</strong> {{ usuario.email }}</p>
    <p><strong>Rol:</strong> {{ rol }}</p>
    <p><strong>Activo:</strong> {{ usuario.is_active ? 'Sí' : 'No' }}</p>
    <p><strong>Creado:</strong> {{ new Date(usuario.created_at).toLocaleString() }}</p>
  </div>

  <RouterLink to="/usuarios">← Volver</RouterLink>
</template>
