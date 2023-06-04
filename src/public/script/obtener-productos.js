
const table_body = document.querySelector('#table-body');
const comprar = document.querySelector('#comprar');

let carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];

const obtenerProductos = (productos, contenedor) => {

  productos.forEach((item, index) => {
    let row = document.createElement('tr');
    // row.classList.add('producto-carrito');
    row.innerHTML = `
          <td>${index + 1}</td>
          <td class="ocultar-texto">${item.titulo}</td>
          <td>${item.cantidad}</td>
          <td>${item.precio}</td>
          <td>${(item.precio * item.cantidad)}</td>
          <input id="idProducto" type="hidden" value="${item.idProducto}"/>
          <td>
            <button type="button" id='borrar-producto-${item.idProducto}'>Eliminar</button>
          </td>
          `
    contenedor.append(row);
  });

}

obtenerProductos(carrito, table_body);


addEventListener('click', (event) => {

  if (event.target.textContent === 'Eliminar' && event.target.getAttribute('type') === 'button') {

    let idProducto = event.target.parentElement.previousElementSibling.value

    const carrito = JSON.parse(localStorage.getItem('carrito'));

    const carritoFiltrado = carrito.filter(item => item.idProducto !== idProducto);

    localStorage.setItem('carrito', JSON.stringify(carritoFiltrado));

    const Nuevocarrito = JSON.parse(localStorage.getItem('carrito'));

    table_body.innerHTML = '';

    obtenerProductos(Nuevocarrito, table_body);

    console.log(Nuevocarrito);
  }

});
