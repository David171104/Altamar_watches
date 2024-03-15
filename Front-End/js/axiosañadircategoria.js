document.addEventListener('DOMContentLoaded', function() {
    const botonAgregarCategoria = document.getElementById('agregar-categoria');
    const modalAgregarCategoria = document.getElementById('agregarCategoriaModal');
    const formularioCategoria = document.getElementById('formulario-categoria');

    botonAgregarCategoria.addEventListener('click', function() {
        modalAgregarCategoria.style.display = 'block';
    });

    formularioCategoria.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita la recarga de la página

        // Realiza la acción del formulario aquí (por ejemplo, enviar datos con Axios)
        añadir_categoria();

        // Cierra la ventana modal después de enviar el formulario
        modalAgregarCategoria.style.display = 'none';
    });
});

  
 
   
 // Registrar tecnico
function añadir_categoria() {
  // Obtener datos del formulario
  
    const nombre_categoria = document.getElementById('nombre_categoria').value;
    

  if (nombre_categoria.trim() === '') {
    alert("Por favor, completa todos los campos del formulario.");
    return; // Cancela el envío del formulario
  }

 

  
  const requestData = {
    nombre_categoria: nombre_categoria
  };

 
  const config = {
    method: 'post',
    url: 'http://127.0.0.1:8000/añadir_categoria',
    headers: {
      'Content-Type': 'application/json'
    },
    data: requestData
  
  };

  // Realizar la solicitud POST utilizando el objeto de configuración
  axios(config)
    
  .then(response => {
      const data = response.data;

      
      if (data.message === "Categoria registrado exitosamente") {
        
        console.log("Categoria registrado exitosamente");
        alert("Categoria registrado exitosamente.");
        
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