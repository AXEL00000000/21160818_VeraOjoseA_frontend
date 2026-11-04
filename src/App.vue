<template>
  <header>
    <h1>Panel de administración</h1>
    <p>Servicios Web · Jose Axel Vera Ortiz · 21160818</p>
  </header>
  <nav>
    <RouterLink to="/roles">Roles</RouterLink>
    <RouterLink to="/usuarios">Usuarios</RouterLink>
    <RouterLink to="/empleados">Empleados</RouterLink>
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
nav {
  display: flex;
  gap: 1.5rem;
  padding: 0.8rem 2rem;
  background: #ede9fe;
}
nav a {
  font-weight: bold;
  text-decoration: none;
}
nav a.router-link-active {
  text-decoration: underline;
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
</style>
