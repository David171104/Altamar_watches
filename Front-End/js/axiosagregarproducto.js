$(document).ready(function() {
    $("#agregar-producto").click(function() {
      $("#agregarProductoModal").modal("show");
    });
  
    
   
  });
  

  // Importa Axios en tu HTML si aún no lo has hecho:
// <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('formulario-producto').addEventListener('submit', function(event) {
      event.preventDefault();
      
    });
  });
  
 
   
 // Registrar tecnico
function añadir_prod() {
  // Obtener datos del formulario
  
    const nombre_producto = document.getElementById('nombre_producto').value;
    const descripcion = document.getElementById('descripcion').value;
    const talla = document.getElementById('talla').value;
    const peso = document.getElementById('peso').value;
    const precio_unitario = document.getElementById('precio_unitario').value;
    const iva = document.getElementById('iva').value;

  if (nombre_producto.trim() === ''|| descripcion.trim() === '' || talla.trim() === '' || peso.trim() === '' || peso.trim() === '' || precio_unitario.trim() === '' || iva.trim() === '') {
    alert("Por favor, completa todos los campos del formulario.");
    return; // Cancela el envío del formulario
  }

 

  
  const requestData = {
    nombre_producto: nombre_producto,
    categoria: categoria,
    descripcion: descripcion,
    talla: talla,
    peso: peso,
    precio_unitario: precio_unitario,
    iva: iva
  };

 
  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/añadir_producto',
    headers: {
      'Content-Type': 'application/json'
    },
    data: requestData
  
  };

  // Realizar la solicitud POST utilizando el objeto de configuración
  axios(config)
    
  .then(response => {
      const data = response.data;

      
      if (data.message === "Producto registrado exitosamente") {
        
        console.log("Producto registrado exitosamente");
        alert("Producto registrado exitosamente.");
        
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