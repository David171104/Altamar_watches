document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario').addEventListener('submit', function(event) {
      event.preventDefault();

    });
});

function register_usuario() {

  // Obtener datos del formulario
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const password = document.getElementById('password').value;
  const repite_password = document.getElementById('repite_password').value;

  if (nombre.trim() === '' || correo.trim() === '' || password.trim() === '' || repite_password.trim() === '') {
    alert("Por favor, completa todos los campos del formulario.");
    return; // Cancela el envío del formulario
  }

  if (password != repite_password) {
    alert("Las contraseñas no coinciden");
    return;
  }

  
  const requestData = {
    nombre: nombre,
    correo: correo,
    password: password,
    repite_password: repite_password
  };

 
  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/register_usuario',
    headers: {
      'Content-Type': 'application/json'
    },
    data: requestData
  
  };

  // Realizar la solicitud POST utilizando el objeto de configuración
  axios(config)
  .then(response => {
      const data = response.data;

      
      if (data.message === "Cliente registrado exitosamente") {
        
        console.log("Usuario registrado exitosamente");
        alert("Usuario registrado exitosamente. Ahora puedes iniciar sesión.");
        // Redirigir a la página de inicio de sesión u otra página de tu elección
        window.location.href = '/Front-End/login.html';
      } else {
        alert(data.message);
      } 
    })
    .catch(error => {
      
      console.error(error);

      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); 
      } else {
        alert("Hubo un problema durante el registro. Por favor, inténtalo de nuevo.");
      }
    });
}  


// Registrar tecnico
function register_tecnico() {

  // Obtener datos del formulario
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const repite_password = document.getElementById('repite_password').value;

  if (name.trim() === ''|| email.trim() === '' || password.trim() === '' || repite_password.trim() === '') {
    alert("Por favor, completa todos los campos del formulario.");
    return; // Cancela el envío del formulario
  }

  if (password != repite_password) {
    alert("Las contraseñas no coinciden");
    return;
  }

  
  const requestData = {
    name: name,
    email: email,
    password: password,
    repite_password: repite_password
  };

 
  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/register_tecnico',
    headers: {
      'Content-Type': 'application/json'
    },
    data: requestData
  
  };

  // Realizar la solicitud POST utilizando el objeto de configuración
  axios(config)
    
  .then(response => {
      const data = response.data;

      
      if (data.message === "Tecnico registrado exitosamente") {
        
        console.log("Tecnico registrado exitosamente");
        alert("Tecnico registrado exitosamente.");
        // Redirigir a la página de inicio de sesión u otra página de tu elección
        window.location.href = 'adminregistrar.html';
      } else {
        alert(data.message);
      } 
    })
    .catch(error => {
      
      console.error(error);

      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message); 
      } else {
        alert("Hubo un problema durante el registro. Por favor, inténtalo de nuevo.");
      }
    });
} 