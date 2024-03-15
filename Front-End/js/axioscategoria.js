function ver_categorias() {
    const config = {
      method: 'GET',
      url: 'http://127.0.0.1:8000/ver_categorias',
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    axios(config)
      .then(response => {
        const categorias = response.data.categorias;
        console.log(categorias);
  
        const tablaCategorias = document.getElementById('tabla-categoria');
  
        tablaCategorias.innerHTML = '';
  
        categorias.forEach(categorias => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${categorias.id_categoria}</td>
            <td>${categorias.nombre_categoria}</td>
            <td class="btn-group btn-group-sm" role="group" aria-label="Acciones">
            <a class="btn btn-warning mx-5" onClick="onEdit(this)">Edit</a>
            <a class="btn btn-danger" onClick="onDelete(this)">Delete</a>
      </td>
          `;
          tablaCategorias.appendChild(row);
        });
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Hubo un problema al obtener las categorias. Por favor, inténtalo de nuevo más tarde.");
        }
      });
  }