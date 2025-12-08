// reporte.js - CON IMPLEMENTACIÓN JSON/XML

// Función para cargar datos desde JSON
async function cargarDatosReporte() {
    try {
        const respuesta = await fetch('datos_estudiantes.json');
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error('Error cargando datos:', error);
        return { estudiantes: [], asignaturas: [] };
    }
}

// Función para generar reporte en formato JSON
function generarReporteJSON(asignatura, fecha, periodo) {
    const fechaActual = new Date().toISOString().split('T')[0];
    
    const reporte = {
        metadata: {
            sistema: "Sistema Asistencia ULEAM",
            fecha_generacion: fechaActual,
            docente: localStorage.getItem('nombreUsuario') || "Docente ULEAM",
            asignatura: asignatura,
            fecha: fecha,
            periodo: periodo
        },
        estudiantes: dataAlumnos // Usa tus datos existentes
    };
    
    return JSON.stringify(reporte, null, 2);
}

// Modificar btnFiltrar para incluir exportación JSON
document.getElementById('btnFiltrar').onclick = async function() {
    const asignatura = document.getElementById('selectAsignatura').value;
    const fecha = document.getElementById('inputFecha').value;
    const periodo = document.getElementById('selectPeriodo').value;
    
    // Cargar datos desde JSON
    const datos = await cargarDatosReporte();
    console.log('Datos cargados para reporte:', datos);
    
    alert(`Filtro aplicado:\nAsignatura: ${asignatura}\nFecha: ${fecha}\nPeríodo: ${periodo}`);
    renderTabla();
};

// Agregar función para exportar como JSON
document.getElementById('btnExportarJSON')?.onclick || (function() {
    const btn = document.createElement('button');
    btn.id = 'btnExportarJSON';
    btn.textContent = 'Exportar JSON';
    btn.style.background = '#6c757d';
    btn.style.color = 'white';
    btn.style.border = 'none';
    btn.style.borderRadius = '3px';
    btn.style.padding = '9px 20px';
    btn.style.cursor = 'pointer';
    btn.style.marginLeft = '10px';
    
    btn.onclick = function() {
        const asignatura = document.getElementById('selectAsignatura').value;
        const fecha = document.getElementById('inputFecha').value;
        const periodo = document.getElementById('selectPeriodo').value;
        
        const reporteJSON = generarReporteJSON(asignatura, fecha, periodo);
        
        // Descargar archivo JSON
        const blob = new Blob([reporteJSON], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `reporte_${asignatura}_${fecha}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('✅ Reporte exportado como JSON');
    };
    
    // Agregar botón al contenedor de acciones
    const accionesDiv = document.querySelector('.acciones-reporte');
    if (accionesDiv) {
        accionesDiv.appendChild(btn);
    }
})();

// Verificar sesión al inicio
document.addEventListener('DOMContentLoaded', function() {
    const sesion = localStorage.getItem('sesion_activa');
    if (!sesion) {
        window.location.href = "index.html";
        return;
    }
    
    const nombre = localStorage.getItem('nombreUsuario') || "Invitado";
    document.querySelector('.nombre-docente').textContent = `BIENVENIDO/A ${nombre}`;
});

///////////////////////////////////////////////////////////////////////

document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert('Sesión cerrada👋');
window.location.href = "index.html";
};

// Ejemplo de datos de alumnos para el reporte
const dataAlumnos = [
    { nombre: "Andrade López Valeria Sofía", matricula: "MAT2025001" },
    { nombre: "Bermudez Ruiz Juan Carlos", matricula: "MAT2025002" },
    { nombre: "Cevallos Ortiz Elena Andrea", matricula: "MAT2025003" },
    { nombre: "Diaz Intriago Mateo Jose", matricula: "MAT2025004" },
    { nombre: "Mendoza Chonillo Karen Paola", matricula: "MAT2025005" }
];

function renderTabla() {
    const tbody = document.getElementById('tbodyReporte');
    tbody.innerHTML = dataAlumnos.map((alumno, idx) => `
        <tr>
            <td>${idx + 1}</td>
            <td>${alumno.nombre}</td>
            <td>${alumno.matricula}</td>
        </tr>
    `).join('');
}
document.getElementById('btnFiltrar').onclick = function() {
    // Aquí iría el filtrado real por asignatura, fecha y período
    alert('Filtrado aplicado');
    renderTabla();
};

document.getElementById('btnExportarPDF').onclick = function() {
    alert('Simulación de exportar reporte a PDF.\n(Para hacerlo real, integrar jsPDF o similar.)');
};

document.getElementById('btnExportarExcel').onclick = function() {
    alert('Simulación de exportar reporte a Excel.\n(Para hacerlo real, integrar SheetJS o similar.)');
};

document.getElementById('btnGuardar').onclick = function() {
    alert('Se a guardado de reporte en el sistema✅');
};

// Mostrar tabla inicialmente
document.getElementById('btnExportarExcel').onclick = function() {
    // Obtener datos de la tabla
    const table = document.querySelector('.tabla-reporte');
    let wb = XLSX.utils.table_to_book(table, {sheet: "Asistencias"});
    XLSX.writeFile(wb, 'reporte_asistencia.xlsx');
};
document.getElementById('btnExportarPDF').onclick = function() {
    // Accede siempre por window.jspdf en la versión UMD
    const doc = new window.jspdf.jsPDF();
    doc.text("Reporte de Asistencia", 14, 14);

    // jsPDF-AutoTable espera un array de filas y columnas o bien el elemento html de la tabla
    doc.autoTable({ html: '.tabla-reporte', startY: 20 });

    doc.save("reporte_asistencia.pdf");
};

// Al cargar la página, muestra el nombre guardado
const nombre = localStorage.getItem('nombreUsuario');
if (nombre) {
    document.getElementById('nombreUsuario').innerText = nombre;
} else {
    document.getElementById('nombreUsuario').innerText = "Invitado";
}
