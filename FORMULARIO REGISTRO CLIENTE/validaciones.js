// ---------- VALIDACIONES JAVASCRIPT ----------

// Escucha el evento "submit" del formulario
document.getElementById("formularioCliente").addEventListener("submit", function(evento) {
  evento.preventDefault(); // Evita el envío si hay errores

  // Limpia mensajes de error anteriores
  document.getElementById("errorNombre").textContent = "";
  document.getElementById("errorApellido").textContent = "";
  document.getElementById("errorCedula").textContent = "";
  document.getElementById("errorTelefono").textContent = "";
  document.getElementById("errorDireccion").textContent = "";
  document.getElementById("errorCorreo").textContent = "";

  // Toma los valores escritos
  let nombre = document.getElementById("nombre").value.trim();
  let apellido = document.getElementById("apellido").value.trim();
  let cedula = document.getElementById("cedula").value.trim();
  let telefono = document.getElementById("telefono").value.trim();
  let direccion = document.getElementById("direccion").value.trim();
  let correo = document.getElementById("correo").value.trim();

  let valido = true;

  // VALIDACIÓN NOMBRE (solo letras)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(nombre)) {
    document.getElementById("errorNombre").textContent = "El nombre solo debe contener letras.";
    valido = false;
  }

  // VALIDACIÓN APELLIDO (solo letras)
  if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(apellido)) {
    document.getElementById("errorApellido").textContent = "El apellido solo debe contener letras.";
    valido = false;
  }

  // VALIDACIÓN CÉDULA (solo números y exactamente 10 dígitos)
  if (!/^[0-9]{10}$/.test(cedula)) {
    document.getElementById("errorCedula").textContent = "La cédula debe tener exactamente 10 números.";
    valido = false;
  }

  // VALIDACIÓN TELÉFONO (solo números y exactamente 10 dígitos)
  if (!/^[0-9]{10}$/.test(telefono)) {
    document.getElementById("errorTelefono").textContent = "El teléfono debe tener exactamente 10 números.";
    valido = false;
  }

  // VALIDACIÓN DIRECCIÓN (no vacía)
  if (direccion.length < 5) {
    document.getElementById("errorDireccion").textContent = "Ingrese una dirección válida.";
    valido = false;
  }

  // VALIDACIÓN CORREO (formato correcto)
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(correo)) {
    document.getElementById("errorCorreo").textContent = "Ingrese un correo electrónico válido.";
    valido = false;
  }

  // Si todo está correcto
  if (valido) {
    alert("✅ Registro exitoso del cliente: " + nombre + " " + apellido);
    document.getElementById("formularioCliente").reset();
  }
});
