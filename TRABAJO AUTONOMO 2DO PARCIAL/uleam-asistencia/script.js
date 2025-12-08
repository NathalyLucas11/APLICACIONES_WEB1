// ================================
// script.js - SISTEMA LOGIN/REGISTRO
// CON IMPLEMENTACIÓN JSON/XML
// ================================

// Cargar configuración del sistema
async function cargarConfiguracion() {
  try {
    console.log('🔄 Cargando configuración del sistema...');
    const respuesta = await fetch('config.json');
    const config = await respuesta.json();
    console.log('✅ Configuración cargada:', config);
    return config;
  } catch (error) {
    console.error('❌ Error cargando configuración:', error);
    return {
      sistema: { nombre: "Sistema ULEAM" },
      universidad: { siglas: "ULEAM" }
    };
  }
}

// Cargar usuarios desde JSON
function cargarUsuarios() {
  const usuariosJSON = localStorage.getItem('usuarios_uleam');
  if (usuariosJSON) {
    return JSON.parse(usuariosJSON);
  } else {
    // Usuarios por defecto
    const usuariosDefault = [
      {
        id: 1,
        usuario: "docente1",
        contrasena: "123456",
        email: "maria_velez@uleam.ec",
        nombre: "MARIA ELIZABETH VELEZ MACIAS",
        fecha_registro: "2024-01-01",
        rol: "DOCENTE"
      }
    ];
    localStorage.setItem('usuarios_uleam', JSON.stringify(usuariosDefault));
    return usuariosDefault;
  }
}

// Validar login con JSON
document.getElementById('loginForm').onsubmit = async function(e) {
  e.preventDefault();
  
  const usuario = document.getElementById('usuario').value.trim();
  const contrasena = document.getElementById('contrasena').value.trim();
  const recordar = document.getElementById('recordar').checked;
  
  // Cargar usuarios
  const usuarios = cargarUsuarios();
  
  // Buscar usuario
  const usuarioValido = usuarios.find(u => 
    u.usuario === usuario && u.contrasena === contrasena
  );
  
  if (usuarioValido) {
    // Guardar sesión como JSON
    const sesion = {
      usuario: usuarioValido.usuario,
      nombre: usuarioValido.nombre,
      email: usuarioValido.email,
      fecha_login: new Date().toISOString(),
      expira: Date.now() + (120 * 60 * 1000) // 2 horas
    };
    
    localStorage.setItem('sesion_activa', JSON.stringify(sesion));
    
    if (recordar) {
      localStorage.setItem('usuario_recordado', JSON.stringify({
        usuario: usuarioValido.usuario,
        recordar: true
      }));
    }
    
    alert('✅ Inicio de sesión exitoso');
    window.location.href = "dashboard.html";
  } else {
    alert('❌ Usuario o contraseña incorrectos');
  }
};

// Registrar nuevo usuario con validación XML
document.getElementById('registroForm').onsubmit = function(e) {
  e.preventDefault();
  
  const nuevoUsuario = {
    usuario: document.getElementById('nuevoUsuario').value.trim(),
    contrasena: document.getElementById('nuevoContrasena').value.trim(),
    email: document.getElementById('nuevoEmail').value.trim(),
    fecha_registro: new Date().toISOString().split('T')[0],
    rol: "DOCENTE"
  };
  
  // Validar correo institucional (como en XML)
  if (!nuevoUsuario.email.endsWith('@uleam.edu.ec') && !nuevoUsuario.email.endsWith('@uleam.ec')) {
    alert('❌ Debe usar correo institucional ULEAM (@uleam.edu.ec o @uleam.ec)');
    return;
  }
  
  // Cargar usuarios existentes
  const usuarios = cargarUsuarios();
  
  // Verificar si ya existe
  if (usuarios.some(u => u.usuario === nuevoUsuario.usuario)) {
    alert('❌ El usuario ya existe');
    return;
  }
  
  // Agregar ID
  nuevoUsuario.id = usuarios.length + 1;
  nuevoUsuario.nombre = "Nuevo Docente"; // Podría pedirse en formulario
  
  // Guardar
  usuarios.push(nuevoUsuario);
  localStorage.setItem('usuarios_uleam', JSON.stringify(usuarios));
  
  alert('✅ Usuario registrado exitosamente');
  
  // Cambiar a login
  document.getElementById('registro-container').classList.add('oculto');
  document.getElementById('login-container').classList.remove('oculto');
  
  // Limpiar formulario
  document.getElementById('registroForm').reset();
};

// Navegación entre login/registro (mantener tu código)
document.getElementById('mostrarRegistro').onclick = function(e) {
  e.preventDefault();
  document.getElementById('login-container').classList.add('oculto');
  document.getElementById('registro-container').classList.remove('oculto');
};

document.getElementById('mostrarLogin').onclick = function(e) {
  e.preventDefault();
  document.getElementById('registro-container').classList.add('oculto');
  document.getElementById('login-container').classList.remove('oculto');
};

// Cargar configuración al inicio
cargarConfiguracion().then(config => {
  console.log('Sistema listo:', config);
});