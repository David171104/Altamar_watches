// Función para agregar un producto al carrito
function agregarProducto(nombre, precio) {
    const listaProductos = document.querySelector('.items');
    const nuevoItem = document.createElement('li');
    nuevoItem.classList.add('item');
    nuevoItem.innerHTML = `
      <span class="name">${nombre}</span>
      <div class="quantity">
        <button onclick="aumentarCantidad(this)">+</button>
        <span>1</span>
        <button onclick="disminuirCantidad(this)">-</button>
      </div>
      <span class="price">$${precio}</span>
    `;
    listaProductos.appendChild(nuevoItem);
  }

  // Función para aumentar la cantidad de un producto
  function aumentarCantidad(button) {
    const cantidadElemento = button.parentElement.querySelector('span');
    let cantidad = parseInt(cantidadElemento.textContent);
    cantidad++;
    cantidadElemento.textContent = cantidad;
  }

  // Función para disminuir la cantidad de un producto
  function disminuirCantidad(button) {
    const cantidadElemento = button.parentElement.querySelector('span');
    let cantidad = parseInt(cantidadElemento.textContent);
    if (cantidad > 1) {
      cantidad--;
      cantidadElemento.textContent = cantidad;
    }
  }

  // Ejemplo de agregar productos al carrito
  agregarProducto('Gafas de sol', 20);
  agregarProducto('Gafas de lectura', 15);