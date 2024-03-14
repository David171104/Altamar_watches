document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario').addEventListener('submit', function(event) {
      event.preventDefault();

    });
});

function login() {
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
  
    const requestData = {
      correo: correo,
      password: password
    };
  
    const config = {
      method: 'post',
      url: 'http://127.0.0.1:8000/login',
      headers: {
        'Content-Type': 'application/json'
      },
      data: requestData
    };
  
    axios(config)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          if (data.message === "Logged in successfully") {
            alert("Has iniciado sesión correctamente");
            const tipoUsuarioMap = {
              1: "usuario",
              2: "administrador",
            };
  
            const tipoUsuario = tipoUsuarioMap[data.dataLogin.tipo_usuario];
  
            guardarUsuarioEnLocalStorage({
              tipo_usuario: tipoUsuario,
              correo: data.dataLogin.correo,
              nombre: data.dataLogin.nombre,
              id: data.dataLogin.id
            });
  
            redirigirSegunTipoUsuario(tipoUsuario);
          }
        }
      })
      .catch(error => {
        manejarErrores(error);
      });
  }
  
  function redirigirSegunTipoUsuario(tipoUsuario) {
    switch (tipoUsuario) {
      case "usuario":
        console.log("Redirigir a la página del cliente");
        window.location.href = '/Front-End/html/usuario/usuario.html';
        break;
      case "administrador":
        console.log("Redirigir a la página del administrador");
        window.location.href = '/Front-End/html/admin/admin.html';
        break;
      default:
        console.log("Tipo de usuario desconocido");
    }
  }
  
  function manejarErrores(error) {
    if (error.response && error.response.status === 401) {
      console.log("Email o contraseña incorrectos");
      alert("Email o contraseña incorrectos");
    } else {
      console.error(error);
      alert("Hubo un problema durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.");
    }
  }
  
  function guardarUsuarioEnLocalStorage(usuario) {
    localStorage.setItem('usuario', JSON.stringify(usuario));
  }
  
  // Agrega un evento 'submit' al formulario
  document.getElementById('formulario').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita la recarga de la página
    login();
  });