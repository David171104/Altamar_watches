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
  


  function obtenerEstadoTexto(categoria) {
    switch (categoria) {
      case '1':
        return 'Solar';    
      case '2':
        return 'Casual';
      
    }
  }
  
  function ver_productos() {
    const url = "http://127.0.0.1:8000/ver_productos";
  
    const config = {
      method: 'GET',
      url: url,
      headers: {
        'Content-Type': 'application/json'
      }
    };
  
    axios(config)
      .then(response => {
        console.log("Datos completos recibidos del servidor:", response);
        const productos = response.data.productos;
        console.log("Datos de productos:", productos);
        console.log("Encabezados de respuesta:", response.headers);
        if (response.status === 200) {
          const productos = response.data.productos;
          console.log(productos);
  
          const tablaProductos = document.getElementById('tabla-productos');
  
          // Vaciar la tabla antes de agregar nuevos registros
          tablaProductos.innerHTML = '';
  
          productos.forEach(productos => {
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${productos[0] !== undefined ? productos[0] : productos.id}</td>
            <td>${productos[1] !== undefined ? productos[1] : productos.nombre_producto}</td>
            <td>${productos[2] !== undefined ? productos[2] : productos.descripcion}</td>
            <td>${productos[3] !== undefined ? productos[3] : productos.talla}</td>
            <td>${productos[4] !== undefined ? productos[4] : productos.precio}</td>
            <td>${productos[5] !== undefined ? productos[5] : productos.iva}</td>
            <td>${productos[6] !== undefined ? productos[6] : productos.categoria}</td>
            <td>${obtenerEstadoTexto(productos[7] !== undefined ? productos[7] : productos.categoria)}</td>
            <td class="btn-group btn-group-sm" role="group" aria-label="Acciones">
                <a class="btn btn-warning mx-5" onClick="agregarproducto()">Edit</a>
                <a class="btn btn-danger" onClick="onDelete(this)">Delete</a>
          </td>

            
            `;
            tablaProductos.appendChild(row);
          });
        } else {
          console.error("Respuesta del servidor con código de estado:", response.status);
          alert("Hubo un problema al obtener los servicios solicitados. Por favor, inténtalo de nuevo más tarde.");
        }
      })
      .catch(error => {
        console.error("Error en la solicitud:", error);
  
        if (error.response) {
          console.error("Respuesta del servidor:", error.response.data);
        }
  
        alert("Hubo un problema al obtener los servicios solicitados. Por favor, inténtalo de nuevo más tarde.");
      });
  }
  
  
  
  function getTextColor(categoria) {
    switch (categoria) {
      case '1':
        return 'orange'; // Sin Asignar
      case '2':
        return '#00AA00'; // En Curso
    }
  }




document.addEventListener('DOMContentLoaded', function() {
    const botonAgregarCategoria = document.getElementById('agregar-product');
    const modalAgregarCategoria = document.getElementById('agregarProducto');
    const formularioCategoria = document.getElementById('formulario-producto');

    botonAgregarCategoria.addEventListener('click', function() {
        modalAgregarCategoria.style.display = 'block';
    });

    formularioCategoria.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la recarga de la página

        // Realiza la acción del formulario aquí (por ejemplo, enviar datos con Axios)
        agregarProducto();

        // Cierra la ventana modal después de enviar el formulario
        modalAgregarCategoria.style.display = 'none';
    });
});
  // Importa Axios en tu HTML si aún no lo has hecho:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario-producto').addEventListener('submit', function(event) {
      event.preventDefault();
      
    });
  });

  let infoForm={};// para la tabla.
let tabla = document.getElementById("formulario-producto"); // tabla
function agregarproducto() {      
    const id= document.getElementById('id').value
    const nombre_producto = document.getElementById('nombre_producto').value
    const descripcion = document.getElementById('descripcion').value
    const talla = document.getElementById('talla').value
    const precio = document.getElementById('precio').value
    const iva = document.getElementById('iva').value
    const categoria = document.getElementById('categoria').value
                
            axios ({
                method: 'POST',
                url: 'http://127.0.0.1:8000//update/<id>t',
                data: {id:id,
                       nombre_producto:nombre_producto,
                       descripcion:descripcion,
                       talla:talla,
                       precio:precio,
                       iva:iva,
                       categoria:categoria                         
                    },
              }).then(function (response) {
                alert("Producto agregado ")
                window.location.href = 'productos.html';
              }).catch(err => console.log('Error: ', err))
            } 

           