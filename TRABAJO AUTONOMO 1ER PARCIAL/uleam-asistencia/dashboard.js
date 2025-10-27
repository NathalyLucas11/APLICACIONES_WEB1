function toggleDetalle(id) {
    const detalle = document.getElementById(id);
    detalle.classList.toggle('mostrar');
}

// Puedes modificar estos valores según los datos reales:
document.getElementById('totalAsignaturas').textContent = 10;       // Ejemplo: 10 materias activas
document.getElementById('asistenciasHoy').textContent = 4;         // Ejemplo: 4 asistencias hoy
document.getElementById('totalEstudiantes').textContent = 250;     // Ejemplo: 140 estudiantes

// Lógica de cerrar sesión (redirecciona al login o limpia sesión)
document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert("Sesión cerrada👋");
window.location.href = "index.html";
};
// Al cargar la página, muestra el nombre guardado
const nombre = localStorage.getItem('nombreUsuario');
if (nombre) {
    document.getElementById('nombreUsuario').innerText = nombre;
} else {
    document.getElementById('nombreUsuario').innerText = "Invitado";
}
