<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { obtenerEmpleado, crearEmpleado, actualizarEmpleado } from '@/services/empleados.service'
import { obtenerUsuarios, type Usuario } from '@/services/usuarios.service'
import { mensajeError } from '@/services/error'

const route = useRoute()
const router = useRouter()

// Si la URL trae id, estamos editando; si no, es un empleado nuevo
const id = route.params.id ? Number(route.params.id) : null

const userId = ref<number | null>(null)
const nombre = ref('')
const apellido = ref('')
const telefono = ref('')
const direccion = ref('')
const puesto = ref('')
const contratado = ref(new Date().toLocaleDateString('en-CA')) // hoy, en formato AAAA-MM-DD
const activo = ref(true)
const usuarios = ref<Usuario[]>([])
const error = ref('')

// Carga los usuarios para el select y, al editar, los datos del empleado
onMounted(async () => {
  try {
    usuarios.value = await obtenerUsuarios()
    if (!id) return
    const empleado = await obtenerEmpleado(id)
    userId.value = empleado.user_id
    nombre.value = empleado.first_name
    apellido.value = empleado.last_name
    telefono.value = empleado.phone ?? ''
    direccion.value = empleado.address ?? ''
    puesto.value = empleado.job_title ?? ''
    contratado.value = empleado.hired_at.slice(0, 10)
    activo.value = empleado.is_active
  } catch {
    error.value = 'No se pudieron cargar los datos'
  }
})

// Crea o actualiza, y regresa a la tabla
const guardar = async () => {
  // Los campos opcionales vacíos se mandan como null (así lo pide el backend)
  const datos = {
    user_id: Number(userId.value),
    first_name: nombre.value,
    last_name: apellido.value,
    phone: telefono.value || null,
    address: direccion.value || null,
    job_title: puesto.value || null,
    hired_at: contratado.value,
    is_active: activo.value,
  }
  try {
    if (id) {
      await actualizarEmpleado(id, datos)
    } else {
      await crearEmpleado(datos)
    }
    router.push('/empleados')
  } catch (e) {
    error.value = mensajeError(e, 'No se pudo guardar el empleado')
  }
}
</script>

<template>
  <h2>{{ id ? 'Editar empleado' : 'Nuevo empleado' }}</h2>

  <p v-if="error" class="error">{{ error }}</p>

  <form @submit.prevent="guardar">
    <p>
      <label>Usuario</label><br />
      <select v-model="userId" required>
        <option v-for="usuario in usuarios" :key="usuario.id" :value="usuario.id">
          {{ usuario.username }}
        </option>
      </select>
    </p>
    <p>
      <label>Nombre</label><br />
      <input v-model="nombre" required maxlength="100" />
    </p>
    <p>
      <label>Apellido</label><br />
      <input v-model="apellido" required maxlength="100" />
    </p>
    <p>
      <label>Teléfono</label><br />
      <input v-model="telefono" maxlength="20" />
    </p>
    <p>
      <label>Dirección</label><br />
      <textarea v-model="direccion"></textarea>
    </p>
    <p>
      <label>Puesto</label><br />
      <input v-model="puesto" maxlength="60" />
    </p>
    <p>
      <label>Fecha de contratación</label><br />
      <input v-model="contratado" type="date" required />
    </p>
    <p>
      <label><input v-model="activo" type="checkbox" /> Activo</label>
    </p>
    <button type="submit">Guardar</button>
  </form>

  <RouterLink to="/empleados">← Cancelar</RouterLink>
</template>
