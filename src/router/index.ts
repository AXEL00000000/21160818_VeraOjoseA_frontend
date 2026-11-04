import { createRouter, createWebHistory } from 'vue-router'
import RolesView from '@/views/RolesView.vue'
import RolDetalleView from '@/views/RolDetalleView.vue'
import RolFormView from '@/views/RolFormView.vue'
import UsuariosView from '@/views/UsuariosView.vue'
import UsuarioDetalleView from '@/views/UsuarioDetalleView.vue'
import UsuarioFormView from '@/views/UsuarioFormView.vue'
import EmpleadosView from '@/views/EmpleadosView.vue'
import EmpleadoDetalleView from '@/views/EmpleadoDetalleView.vue'
import EmpleadoFormView from '@/views/EmpleadoFormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/roles' },

    // Roles
    { path: '/roles', component: RolesView },
    { path: '/roles/nuevo', component: RolFormView },
    { path: '/roles/:id', component: RolDetalleView },
    { path: '/roles/:id/editar', component: RolFormView },

    // Usuarios
    { path: '/usuarios', component: UsuariosView },
    { path: '/usuarios/nuevo', component: UsuarioFormView },
    { path: '/usuarios/:id', component: UsuarioDetalleView },
    { path: '/usuarios/:id/editar', component: UsuarioFormView },

    // Empleados
    { path: '/empleados', component: EmpleadosView },
    { path: '/empleados/nuevo', component: EmpleadoFormView },
    { path: '/empleados/:id', component: EmpleadoDetalleView },
    { path: '/empleados/:id/editar', component: EmpleadoFormView },
  ],
})

export default router
