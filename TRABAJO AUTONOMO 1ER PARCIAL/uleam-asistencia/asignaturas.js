document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert('Sesión cerrada👋');
window.location.href = "index.html";
};
const botones = document.querySelectorAll('.btn-asistencia');
botones.forEach(btn => {
    btn.onclick = () => alert("Registro de asistencia para la asignatura seleccionada.");
});
