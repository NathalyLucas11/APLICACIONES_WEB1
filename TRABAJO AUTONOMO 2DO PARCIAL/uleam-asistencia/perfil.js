document.getElementById('cerrarSesion').onclick = function(e) {
    e.preventDefault();
    alert('Sesión cerrada (debería redirigir al login)');
    window.location.href = "login.html";
};
const editarBtn = document.getElementById("editarBtn");
const guardarBtn = document.getElementById("guardarBtn");
const cancelarBtn = document.getElementById("cancelarBtn");

// Para habilitar o deshabilitar los campos editables
function setEditable(editable) {
    document.getElementById("geoSection").disabled = !editable;
    document.getElementById("zonaSection").disabled = !editable;
    document.getElementById("pais").readOnly = !editable;
    document.getElementById("ciudad").readOnly = !editable;
    document.getElementById("zonaHoraria").disabled = !editable;
    editarBtn.style.display = editable ? "none" : "";
    guardarBtn.style.display = editable ? "" : "none";
    cancelarBtn.style.display = editable ? "" : "none";
}

let originalData = {
    pais: document.getElementById("pais").value,
    ciudad: document.getElementById("ciudad").value,
    zonaHoraria: document.getElementById("zonaHoraria").value
};

editarBtn.onclick = function() {
    originalData = {
        pais: document.getElementById("pais").value,
        ciudad: document.getElementById("ciudad").value,
        zonaHoraria: document.getElementById("zonaHoraria").value
    };
    setEditable(true);
};
guardarBtn.onclick = function() {
    setEditable(false);
    alert("Perfil actualizado correctamente.");
};
cancelarBtn.onclick = function() {
    // Restaurar datos originales
    document.getElementById("pais").value = originalData.pais;
    document.getElementById("ciudad").value = originalData.ciudad;
    document.getElementById("zonaHoraria").value = originalData.zonaHoraria;
    setEditable(false);
};
// Los campos editables están deshabilitados por defecto
setEditable(false);
