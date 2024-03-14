function cerrar() {
    axios.post('http://127.0.0.1:8000/cerrarsesion', {})
    .then(function (response) {
      console.log(response.data);
      eliminarSesion();
      window.location.href = '../../index.html';
    })
    .catch(function (error) {
      console.error('Error:', error);
    });
  }
  
  // Función para eliminar la sesión de localStorage
  function eliminarSesion() {
    localStorage.removeItem('usuario');
  }
