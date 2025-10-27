document.getElementById('mostrarRegistro').onclick = function () {
    document.getElementById('login-container').classList.add('oculto');
    document.getElementById('registro-container').classList.remove('oculto');
};
document.getElementById('mostrarLogin').onclick = function () {
    document.getElementById('registro-container').classList.add('oculto');
    document.getElementById('login-container').classList.remove('oculto');
};

// Simulación para no enviar formularios por defecto
document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Intentando iniciar sesión...');
};
document.getElementById('registroForm').onsubmit = function(e) {
    e.preventDefault();
    alert('Registro exitoso✅');
};
const usuarios = [
    { usuario: "lucas", contrasena: "1234" },
    { usuario: "prueba", contrasena: "abcd" },
    { usuario: "Maria Velez", contrasena: "123456" },
    { usuario: "Javier Macias", contrasena: "javi123" }
    // Puedes agregar aquí más usuarios
];

document.getElementById('loginForm').onsubmit = function(e) {
    e.preventDefault(); // Evita recargar la página

    const user = document.getElementById('usuario').value.trim();
    const pass = document.getElementById('contrasena').value.trim();

    // Busca si hay un usuario válido con esa contraseña
    const usuarioValido = usuarios.find(u => u.usuario === user && u.contrasena === pass);

    if (usuarioValido) {
        // Aquí rediriges al dashboard (o la página principal)
        window.location.href = "dashboard.html";
    } else {
        document.getElementById('mensajeLogin').innerText = "Usuario o contraseña incorrectos";
    }
};

if (usuarioValido) {
    // Guarda el nombre de usuario en localStorage
    localStorage.setItem('nombreUsuario', user);
    window.location.href = "dashboard.html";
}
