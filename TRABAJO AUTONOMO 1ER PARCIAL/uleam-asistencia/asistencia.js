document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert('Sesión cerrada👋');
window.location.href = "index.html";
};
document.querySelector('.guardar-btn').onclick = function() {
    // Aquí puedes capturar los faltantes
    const filas = document.querySelectorAll('.tabla-asistencia tbody tr');
    let faltantes = [];
    filas.forEach((tr, idx) => {
        const checkbox = tr.querySelector('.chk-falta');
        if (checkbox.checked) {
            const nombre = tr.children[1].innerText;
            const matricula = tr.children[2].innerText;
            faltantes.push({nombre, matricula});
        }
    });
    alert("Faltantes:" + (faltantes.length ? JSON.stringify(faltantes) : "ningún estudiante tiene falta marcada"));
};
// Al cargar la página, muestra el nombre guardado
const nombre = localStorage.getItem('nombreUsuario');
if (nombre) {
    document.getElementById('nombreUsuario').innerText = nombre;
} else {
    document.getElementById('nombreUsuario').innerText = "Invitado";
}
