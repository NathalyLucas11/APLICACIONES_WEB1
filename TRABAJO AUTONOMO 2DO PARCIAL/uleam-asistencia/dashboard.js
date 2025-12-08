// ================================
// dashboard.js - PANEL PRINCIPAL
// CON IMPLEMENTACIÓN JSON
// ================================

// Función toggle (mantener)
function toggleDetalle(id) {
    const detalle = document.getElementById(id);
    detalle.classList.toggle('mostrar');
}

// Cargar datos del dashboard desde JSON
async function cargarDatosDashboard() {
  try {
    // Cargar datos de estudiantes desde JSON
    const respuesta = await fetch('datos_estudiantes.json');
    const datos = await respuesta.json();
    
    // Calcular resumen
    const totalEstudiantes = datos.estudiantes.length;
    const totalAsignaturas = datos.asignaturas.length;
    
    // Aquí podrías calcular asistencias de hoy
    // Por ahora usamos un valor por defecto
    const asistenciasHoy = 0; // Esto se actualizaría con datos reales
    
    // Actualizar la UI
    document.getElementById('totalAsignaturas').textContent = totalAsignaturas;
    document.getElementById('totalEstudiantes').textContent = totalEstudiantes;
    document.getElementById('asistenciasHoy').textContent = asistenciasHoy;
    
    // Guardar datos en localStorage para otras páginas
    localStorage.setItem('datos_sistema', JSON.stringify(datos));
    
    console.log('✅ Dashboard cargado:', datos);
    
  } catch (error) {
    console.error('❌ Error cargando datos:', error);
    // Valores por defecto
    document.getElementById('totalAsignaturas').textContent = 10;
    document.getElementById('totalEstudiantes').textContent = 250;
    document.getElementById('asistenciasHoy').textContent = 0;
  }
}

// Verificar sesión y cargar nombre
function verificarSesion() {
  const sesionJSON = localStorage.getItem('sesion_activa');
  
  if (!sesionJSON) {
    // No hay sesión, redirigir al login
    alert('⚠️ No hay sesión activa. Redirigiendo al login...');
    window.location.href = "index.html";
    return;
  }
  
  const sesion = JSON.parse(sesionJSON);
  
  // Verificar si la sesión expiró
  if (Date.now() > sesion.expira) {
    alert('⚠️ Sesión expirada. Por favor inicie sesión nuevamente.');
    localStorage.removeItem('sesion_activa');
    window.location.href = "index.html";
    return;
  }
  
  // Mostrar nombre en el dashboard
  const elementosNombre = document.querySelectorAll('.nombre-docente');
  elementosNombre.forEach(elemento => {
    elemento.textContent = `BIENVENIDO/A ${sesion.nombre}`;
  });
  
  // Guardar nombre en localStorage para otras páginas
  localStorage.setItem('nombreUsuario', sesion.nombre);
}

// Función para exportar datos a JSON (para reportes)
function exportarDatosJSON() {
  const datos = localStorage.getItem('datos_sistema');
  if (!datos) {
    alert('❌ No hay datos para exportar');
    return;
  }
  
  const datosParseados = JSON.parse(datos);
  const fecha = new Date().toISOString().split('T')[0];
  
  const datosExportar = {
    metadata: {
      sistema: "Sistema Asistencia ULEAM",
      fecha_exportacion: fecha,
      docente: localStorage.getItem('nombreUsuario') || "Docente ULEAM"
    },
    datos: datosParseados
  };
  
  // Crear y descargar archivo JSON
  const jsonString = JSON.stringify(datosExportar, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_uleam_${fecha}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('✅ Datos exportados como JSON');
}

// Función para exportar a XML
function exportarDatosXML() {
  const datos = localStorage.getItem('datos_sistema');
  if (!datos) {
    alert('❌ No hay datos para exportar');
    return;
  }
  
  const datosParseados = JSON.parse(datos);
  const fecha = new Date().toISOString().split('T')[0];
  const docente = localStorage.getItem('nombreUsuario') || "Docente ULEAM";
  
  // Crear XML manualmente
  let xmlString = `<?xml version="1.0" encoding="UTF-8"?>
<reporte_asistencia>
  <metadata>
    <sistema>Sistema Control Asistencia ULEAM</sistema>
    <fecha_exportacion>${fecha}</fecha_exportacion>
    <docente>${docente}</docente>
  </metadata>
  <estudiantes>`;
  
  // Agregar estudiantes
  datosParseados.estudiantes.forEach(est => {
    xmlString += `
    <estudiante>
      <matricula>${est.matricula}</matricula>
      <nombre>${est.nombre}</nombre>
      <carrera>${est.carrera}</carrera>
    </estudiante>`;
  });
  
  xmlString += `
  </estudiantes>
  <asignaturas>`;
  
  // Agregar asignaturas
  datosParseados.asignaturas.forEach(asig => {
    xmlString += `
    <asignatura>
      <codigo>${asig.codigo}</codigo>
      <nombre>${asig.nombre}</nombre>
      <paralelo>${asig.paralelo}</paralelo>
    </asignatura>`;
  });
  
  xmlString += `
  </asignaturas>
</reporte_asistencia>`;
  
  // Descargar archivo XML
  const blob = new Blob([xmlString], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `reporte_uleam_${fecha}.xml`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  alert('✅ Datos exportados como XML');
}

// Cerrar sesión
document.getElementById('cerrarSesion').onclick = function(e) {
  e.preventDefault();
  
  // Limpiar datos de sesión
  localStorage.removeItem('sesion_activa');
  
  alert('👋 Sesión cerrada exitosamente');
  window.location.href = "index.html";
};

// Inicializar dashboard
document.addEventListener('DOMContentLoaded', function() {
  verificarSesion();
  cargarDatosDashboard();
  
  // Agregar botones de exportación si existe la sección de resumen
  const resumenSeccion = document.querySelector('.resumen-seccion');
  if (resumenSeccion) {
    const botonesExport = document.createElement('div');
    botonesExport.innerHTML = `
      <div style="margin-top: 20px; padding: 15px; background: #f8f9fa; border-radius: 5px;">
        <h3 style="color: #1a3c8b; margin-bottom: 10px;">Exportar Datos</h3>
        <button onclick="exportarDatosJSON()" style="margin-right: 10px; padding: 8px 15px; background: #28a745; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Exportar como JSON
        </button>
        <button onclick="exportarDatosXML()" style="padding: 8px 15px; background: #17a2b8; color: white; border: none; border-radius: 4px; cursor: pointer;">
          Exportar como XML
        </button>
      </div>
    `;
    resumenSeccion.appendChild(botonesExport);
  }
});