// historial.js - CON IMPLEMENTACIÓN JSON

// Cargar historial desde localStorage
function cargarHistorialDesdeJSON() {
    const historialJSON = localStorage.getItem('historial_asistencias');
    if (historialJSON) {
        return JSON.parse(historialJSON);
    } else {
        // Datos de ejemplo en formato JSON
        const ejemploHistorial = [
            {
                fecha: "2025-04-21",
                asignatura: "Aplicaciones Web 1", 
                estudiantes: [
                    { estudiante: "Andrade López Valeria Sofia", matricula: "MAT2025001", estado: "P" },
                    { estudiante: "Bermudez Ruiz Juan Carlos", matricula: "MAT2025002", estado: "F" }
                ]
            }
        ];
        localStorage.setItem('historial_asistencias', JSON.stringify(ejemploHistorial));
        return ejemploHistorial;
    }
}

// Convertir historial JSON al formato que espera tu función
function convertirHistorialParaUI(historialJSON) {
    let historialUI = [];
    
    historialJSON.forEach(registro => {
        registro.estudiantes.forEach(est => {
            historialUI.push({
                fecha: registro.fecha.split('T')[0],
                asignatura: registro.asignatura,
                estudiante: est.estudiante,
                matricula: est.matricula,
                estado: est.estado
            });
        });
    });
    
    return historialUI;
}

// Modificar tu función filtrarHistorial para usar JSON
function filtrarHistorial() {
    const selAsignatura = document.getElementById('selectAsignatura').value;
    const selEstudiante = document.getElementById('selectEstudiante').value;
    const selPeriodo = document.getElementById('selectPeriodo').value;

    // Cargar datos desde JSON
    const historialJSON = cargarHistorialDesdeJSON();
    let historial = convertirHistorialParaUI(historialJSON);
    
    // Resto de tu función se mantiene igual...
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
        filtrados = filtrados.filter(reg => {
            // Extraer año del periodo
            const añoRegistro = reg.fecha.split('-')[0];
            const añoPeriodo = selPeriodo.split('-')[0];
            return añoRegistro === añoPeriodo;
        });
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

// Función para exportar historial como JSON
function exportarHistorialJSON() {
    const historial = cargarHistorialDesdeJSON();
    const fecha = new Date().toISOString().split('T')[0];
    
    const datosExportar = {
        metadata: {
            sistema: "Sistema Asistencia ULEAM",
            fecha_exportacion: fecha,
            docente: localStorage.getItem('nombreUsuario') || "Docente"
        },
        historial: historial
    };
    
    const jsonString = JSON.stringify(datosExportar, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `historial_asistencia_${fecha}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('✅ Historial exportado como JSON');
}

// Agregar botón de exportación JSON
document.addEventListener('DOMContentLoaded', function() {
    const filtrosDiv = document.querySelector('.filtros');
    if (filtrosDiv) {
        const exportarBtn = document.createElement('button');
        exportarBtn.textContent = 'Exportar JSON';
        exportarBtn.style.marginLeft = '10px';
        exportarBtn.style.padding = '8px 15px';
        exportarBtn.style.background = '#17a2b8';
        exportarBtn.style.color = 'white';
        exportarBtn.style.border = 'none';
        exportarBtn.style.borderRadius = '3px';
        exportarBtn.style.cursor = 'pointer';
        exportarBtn.onclick = exportarHistorialJSON;
        filtrosDiv.appendChild(exportarBtn);
    }
    
    // Verificar sesión
    const sesion = localStorage.getItem('sesion_activa');
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }
    
    // Mostrar nombre
    const nombre = localStorage.getItem('nombreUsuario') || "Invitado";
    document.querySelector('.nombre-docente').textContent = `BIENVENIDO/A ${nombre}`;
});


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
