<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/services/auth.service'
import { mensajeError } from '@/services/error'

const router = useRouter()
const identifier = ref('')
const password = ref('')
const error = ref('')

// Inicia sesión y, si todo sale bien, entra al panel
const entrar = async () => {
  try {
    await login(identifier.value, password.value)
    router.push('/roles')
  } catch (e) {
    error.value = mensajeError(e, 'No se pudo iniciar sesión')
  }
}
</script>

<template>
  <h2>Iniciar sesión</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="entrar">
    <p>
      <label>Usuario o correo</label><br />
      <input v-model="identifier" required />
    </p>
    <p>
      <label>Contraseña</label><br />
      <input v-model="password" type="password" required />
    </p>
    <button type="submit">Entrar</button>
  </form>
</template>