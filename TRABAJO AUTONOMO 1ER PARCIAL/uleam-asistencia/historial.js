// Datos de muestra
const historial = [
    {
        fecha: "2025-04-21", asignatura: "Aplicaciones Web 1", estudiante: "Andrade López Valeria Sofia",
        matricula: "MAT2025001", periodo: "2025-1", estado: "P"
    },
    {
        fecha: "2025-04-21", asignatura: "Aplicaciones Web 1", estudiante: "Bermudez Ruiz Juan Carlos",
        matricula: "MAT2025002", periodo: "2025-1", estado: "F"
    },
    {
        fecha: "2025-04-20", asignatura: "Sistemas Operativos", estudiante: "Andrade López Valeria Sofia",
        matricula: "MAT2025001", periodo: "2025-1", estado: "P"
    },
    {
        fecha: "2025-03-15", asignatura: "Seguridad Informatica", estudiante: "Cevallos Ortiz Elena Andrea",
        matricula: "MAT2025003", periodo: "2024-2", estado: "F"
    }
];

function filtrarHistorial() {
    const selAsignatura = document.getElementById('selectAsignatura').value;
    const selEstudiante = document.getElementById('selectEstudiante').value;
    const selPeriodo = document.getElementById('selectPeriodo').value;

    let filtrados = historial;

    if (selAsignatura) {
        let nombreAsignatura = "";
        if (selAsignatura === "web1") nombreAsignatura = "Aplicaciones Web 1";
        if (selAsignatura === "so") nombreAsignatura = "Sistemas Operativos";
        if (selAsignatura === "seguridad") nombreAsignatura = "Seguridad Informatica";
        filtrados = filtrados.filter(reg => reg.asignatura === nombreAsignatura);
    }
    if (selEstudiante) {
        filtrados = filtrados.filter(reg => reg.matricula === selEstudiante);
    }
    if (selPeriodo) {
        filtrados = filtrados.filter(reg => reg.periodo === selPeriodo);
    }

    const tbody = document.getElementById('tbodyHistorial');
    tbody.innerHTML = filtrados.length
        ? filtrados.map(reg => `
            <tr>
                <td>${reg.fecha}</td>
                <td>${reg.asignatura}</td>
                <td>${reg.estudiante}</td>
                <td>${reg.matricula}</td>
                <td class="${reg.estado === 'P' ? 'estado-presente' : 'estado-falta'}">
                    ${reg.estado === 'P' ? 'Presente' : 'Falta'}
                </td>
            </tr>
        `).join("")
        : `<tr><td colspan="5" style="text-align:center;">No se encontraron registros</td></tr>`;
}

// Acciones
document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert('Sesión cerrada👋');
window.location.href = "index.html";
};
document.getElementById('btnBuscar').onclick = filtrarHistorial;
window.onload = filtrarHistorial;

// Al cargar la página, muestra el nombre guardado
const nombre = localStorage.getItem('nombreUsuario');
if (nombre) {
    document.getElementById('nombreUsuario').innerText = nombre;
} else {
    document.getElementById('nombreUsuario').innerText = "Invitado";
}
