$(document).ready(function() {
    $("#agregar-producto").click(function() {
      $("#agregarProductoModal").modal("show");
    });
  
    $("#formulario-producto").submit(function(event) {
      event.preventDefault();
      // Obtener datos del formulario
      var formData = {
        nombre_producto: "Nombre del Producto",
        descripcion: "Descripción del Producto",
        talla: "Talla del Producto",
        peso: "Peso del Producto",
        precio_unitario: 10.99, // Precio del Producto
        iva: 0.15, // Impuesto del Producto
        categoria: "Categoría del Producto"
      };
      // Enviar datos al servidor
      $.ajax({
        type: "POST",
        url: "/add_producto",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function(response) {
          alert(response.message);
          $("#agregarProductoModal").modal("hide");
        },
        error: function(xhr, status, error) {
          alert("Error al agregar el producto: " + xhr.responseText);
        }
      });
    });
  });
  

  // Importa Axios en tu HTML si aún no lo has hecho:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario-producto').addEventListener('submit', function(event) {
      event.preventDefault();
      addProducto();
    });
  });
  
  function addProducto() {
    const nombre_producto = document.getElementById('nombre_producto').value;
    const descripcion = document.getElementById('descripcion').value;
    const talla = document.getElementById('talla').value;
    const peso = document.getElementById('peso').value;
    const precio_unitario = document.getElementById('precio_unitario').value;
    const iva = document.getElementById('iva').value;
    const categoria = document.getElementById('categoria').value;
  
    const requestData = {
      nombre_producto: nombre_producto,
      descripcion: descripcion,
      talla: talla,
      peso: peso,
      precio_unitario: precio_unitario,
      iva: iva,
      categoria: categoria
    };
  
    const config = {
      method: 'post',
      url: '/añadir_producto',
      headers: {
        'Content-Type': 'application/json'
      },
      data: requestData
    };
  
    axios(config)
      .then(response => {
        const data = response.data;
        if (data.message === "Producto añadido correctamente") {
          console.log("Producto añadido exitosamente");
          alert("Producto añadido exitosamente.");
          // Puedes redirigir a otra página o ejecutar otra lógica aquí después de agregar el producto
        } else {
          alert(data.message);
        }
      })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Hubo un problema al agregar el producto. Por favor, inténtalo de nuevo.");
        }
      });
  }
  
  