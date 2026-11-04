<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  type UsuarioDatos,
} from '@/services/usuarios.service'
import { obtenerRoles, type Rol } from '@/services/roles.service'
import { mensajeError } from '@/services/error'

const route = useRoute()
const router = useRouter()

// Si la URL trae id, estamos editando; si no, es un usuario nuevo
const id = route.params.id ? Number(route.params.id) : null

const username = ref('')
const email = ref('')
const password = ref('')
const roleId = ref<number | null>(null)
const activo = ref(true)
const roles = ref<Rol[]>([])
const error = ref('')

// Carga los roles para el select y, al editar, los datos del usuario
onMounted(async () => {
  try {
    roles.value = await obtenerRoles()
    if (!id) return
    const usuario = await obtenerUsuario(id)
    username.value = usuario.username
    email.value = usuario.email
    roleId.value = usuario.role_id
    activo.value = usuario.is_active
  } catch {
    error.value = 'No se pudieron cargar los datos'
  }
})

// Crea o actualiza, y regresa a la tabla
const guardar = async () => {
  const datos: UsuarioDatos = {
    username: username.value,
    email: email.value,
    role_id: Number(roleId.value),
  }
  // Al editar, la contraseña solo se manda si se escribió una nueva
  if (password.value) datos.password = password.value
  try {
    if (id) {
      await actualizarUsuario(id, { ...datos, is_active: activo.value })
    } else {
      await crearUsuario(datos)
    }
    router.push('/usuarios')
  } catch (e) {
    error.value = mensajeError(e, 'No se pudo guardar el usuario')
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar usuario' : 'Nuevo usuario' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <p>
      <label>Usuario</label><br />
      <input v-model="username" required maxlength="30" />
    </p>
    <p>
      <label>Correo</label><br />
      <input v-model="email" type="email" required />
    </p>
    <p>
      <label>Contraseña</label><br />
      <input v-model="password" type="password" minlength="8" :required="!id" />
    </p>
    <p>
      <label>Rol</label><br />
      <select v-model="roleId" required>
        <option v-for="rol in roles" :key="rol.id" :value="rol.id">{{ rol.name }}</option>
      </select>
    </p>
    <p v-if="id">
      <label><input v-model="activo" type="checkbox" /> Activo</label>
    </p>
    <p v-if="id"><small>Deja la contraseña vacía para no cambiarla.</small></p>
    <button type="submit">Guardar</button>
  </form>

  <RouterLink to="/usuarios">← Cancelar</RouterLink>
</template>
