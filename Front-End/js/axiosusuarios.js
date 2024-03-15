  function ver_usuarios() {
    const config = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/ver_usuarios',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    axios(config)
      .then(response => {
        const usuarios = response.data.usuarios;
        console.log(usuarios);
  
        const tablaUsuarios = document.getElementById('tabla-usuarios');
  
        tablaUsuarios.innerHTML = '';
  
        usuarios.forEach(usuarios => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${usuarios.id}</td>
            <td>${usuarios.nombre}</td>
            <td>${usuarios.correo}</td>
          `;
          tablaUsuarios.appendChild(row);
        });
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Hubo un problema al obtener los usuarios. Por favor, inténtalo de nuevo más tarde.");
        }
      });
  }
  
 