<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { logout, usuarioActual } from '@/services/auth.service'

const route = useRoute()
const router = useRouter()

// Cierra sesión y regresa al login
const salir = () => {
  logout()
  router.push('/login')
}
</script>

<template>
  <header>
    <h1>Panel de administración</h1>
    <p>Servicios Web · Jose Axel Vera Ortiz · 21160818</p>
  </header>
  <!-- El menú solo se muestra con sesión iniciada -->
  <nav v-if="route.path !== '/login'">
    <RouterLink to="/roles">Roles</RouterLink>
    <RouterLink to="/usuarios">Usuarios</RouterLink>
    <RouterLink to="/empleados">Empleados</RouterLink>
    <span class="sesion">
      Sesión: <strong>{{ usuarioActual() }}</strong>
      <button class="salir" @click="salir">Cerrar sesión</button>
    </span>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style>
/* Estilos generales de toda la app */
body {
  margin: 0;
  font-family: 'Segoe UI', Arial, sans-serif;
  background: #f5f5f4;
  color: #27272a;
}
header {
  padding: 1.5rem 2rem;
  border-bottom: 3px solid #7c3aed;
}
header h1 {
  margin: 0;
  color: #7c3aed;
}
header p {
  margin: 0.3rem 0 0;
  color: #78716c;
}
/* Menú: la sección activa se rellena de morado */
nav {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  padding: 0.6rem 2rem;
  background: #ede9fe;
}
nav a {
  padding: 0.3rem 0.8rem;
  border-radius: 6px;
  font-weight: bold;
  text-decoration: none;
}
nav a.router-link-active {
  background: #7c3aed;
  color: #fff;
}
/* Usuario y botón de cerrar sesión */
.sesion {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  margin-left: auto;
  color: #52525b;
}
.salir {
  border-color: #7c3aed;
  background: #7c3aed;
  color: #fff;
}
.salir:hover {
  border-color: #6d28d9;
  background: #6d28d9;
}
main {
  max-width: 850px;
  margin: 2rem auto;
  padding: 0 1rem;
}
a {
  color: #6d28d9;
}
table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 10px;
  overflow: hidden;
}
th,
td {
  padding: 0.8rem 1rem;
  text-align: left;
}
th {
  background: #ede9fe;
  color: #7c3aed;
}
tr + tr td {
  border-top: 1px solid #e7e5e4;
}
button {
  padding: 0.3rem 0.8rem;
  border: 1px solid #ef4444;
  border-radius: 6px;
  background: transparent;
  color: #ef4444;
  font: inherit;
  font-size: 0.9rem;
  cursor: pointer;
}
button:hover {
  background: #ef4444;
  color: #fff;
}
button[type='submit'] {
  border-color: #7c3aed;
  color: #7c3aed;
}
button[type='submit']:hover {
  background: #7c3aed;
  color: #fff;
}
input,
select,
textarea {
  width: 100%;
  max-width: 400px;
  padding: 0.5rem;
  border: 1px solid #d6d3d1;
  border-radius: 6px;
  background: #ffffff;
  color: #27272a;
  font: inherit;
}
input[type='checkbox'] {
  width: auto;
}
.error {
  padding: 0.6rem 1rem;
  border-radius: 6px;
  background: #fee2e2;
  color: #b91c1c;
}
/* Links que se ven como botones */
td a,
main > a {
  display: inline-block;
  margin-right: 0.3rem;
  padding: 0.3rem 0.8rem;
  border: 1px solid #7c3aed;
  border-radius: 6px;
  color: #7c3aed;
  font-size: 0.9rem;
  text-decoration: none;
}
td a:hover,
main > a:hover {
  background: #7c3aed;
  color: #fff;
}
</style>