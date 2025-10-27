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
