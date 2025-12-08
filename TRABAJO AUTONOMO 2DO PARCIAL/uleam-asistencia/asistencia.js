// asistencia.js - REGISTRO DE ASISTENCIA CON JSON

document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    
    // Verificar sesión
    const sesion = localStorage.getItem('sesion_activa');
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }
    
    localStorage.removeItem('sesion_activa');
    alert('👋 Sesión cerrada');
    window.location.href = "index.html";
};

// Cargar nombre del usuario
const nombreUsuario = localStorage.getItem('nombreUsuario') || "Invitado";
document.querySelector('.nombre-docente').textContent = `BIENVENIDO/A ${nombreUsuario}`;

// Cargar estudiantes desde JSON
async function cargarEstudiantes() {
    try {
        const respuesta = await fetch('datos_estudiantes.json');
        const datos = await respuesta.json();
        return datos.estudiantes;
    } catch (error) {
        console.error('Error cargando estudiantes:', error);
        return [];
    }
}

// Función para guardar asistencia en formato JSON
async function guardarAsistencia() {
    // Obtener faltantes
    const filas = document.querySelectorAll('.tabla-asistencia tbody tr');
    let faltantes = [];
    
    filas.forEach((tr, idx) => {
        const checkbox = tr.querySelector('.chk-falta');
        if (checkbox.checked) {
            const nombre = tr.children[1].innerText;
            const matricula = tr.children[2].innerText;
            faltantes.push({
                matricula: matricula,
                nombre: nombre,
                fecha: new Date().toISOString().split('T')[0]
            });
        }
    });
    
    // Crear objeto de asistencia
    const registroAsistencia = {
        fecha: new Date().toISOString(),
        docente: nombreUsuario,
        asignatura: "Aplicaciones Web 1", // Esto debería obtenerse dinámicamente
        total_estudiantes: filas.length,
        faltantes: faltantes.length,
        detalle_faltantes: faltantes
    };
    
    // Guardar en localStorage como JSON
    let historial = JSON.parse(localStorage.getItem('historial_asistencias') || '[]');
    historial.push(registroAsistencia);
    localStorage.setItem('historial_asistencias', JSON.stringify(historial));
    
    // Exportar también como archivo JSON
    exportarAsistenciaJSON(registroAsistencia);
    
    alert(`✅ Asistencia guardada\nTotal estudiantes: ${filas.length}\nFaltantes: ${faltantes.length}`);
}

// Función para exportar asistencia como archivo JSON
function exportarAsistenciaJSON(datos) {
    const fecha = new Date().toISOString().split('T')[0];
    const hora = new Date().toLocaleTimeString().replace(/:/g, '-');
    
    const datosExportar = {
        metadata: {
            sistema: "Sistema Asistencia ULEAM",
            fecha_generacion: new Date().toISOString(),
            tipo: "registro_asistencia"
        },
        registro: datos
    };
    
    const jsonString = JSON.stringify(datosExportar, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `asistencia_${fecha}_${hora}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Asignar evento al botón de guardar
document.querySelector('.guardar-btn').onclick = guardarAsistencia;

// Cargar estudiantes al iniciar (para futuro uso)
cargarEstudiantes().then(estudiantes => {
    console.log('Estudiantes cargados:', estudiantes.length);
});