
const buttonsAdd = document.querySelectorAll('button');

let producto = {};

buttonsAdd.forEach((buttonAdd, index) => {

  buttonAdd.addEventListener('click', (event) => {
    let autor = (document.querySelectorAll('input#autor')[index].value)
    let titulo = (document.querySelectorAll('input#titulo')[index].value)
    let precio = (document.querySelectorAll('input#precio')[index].value)
    let idProducto = (document.querySelectorAll('input#id')[index].value)

    const carrito = JSON.parse(localStorage.getItem('carrito')) ?? [];

    producto = {
      idProducto,
      autor: autor,
      titulo: titulo,
      precio: Number(precio),
      cantidad: 1
    }

    
    if(carrito.length > 0) {
      
      let agregadar = true;

      for(item of carrito) {
        if(item.idProducto === producto.idProducto) {
          
          item.cantidad = item.cantidad + 1;
          agregadar = false;
          console.log('item ya existe');
          localStorage.setItem('carrito', JSON.stringify(carrito));
          
          break;
        }
      }

      if(agregadar) {
        carrito.push(producto);
        localStorage.setItem('carrito', JSON.stringify(carrito));
      }

      let newCarrito = JSON.parse(localStorage.getItem('carrito'));
      document.cookie = `carrito=${JSON.stringify(newCarrito)}; path=/; max-age=${30*24*60*60};"`;
      // document.cookie = encodeURIComponent('carrito') + '=' + encodeURIComponent(JSON.stringify(newCarrito));
    }else {
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));

      let newCarrito = JSON.parse(localStorage.getItem('carrito'));
      document.cookie = `carrito=${JSON.stringify(newCarrito)}; path=/; max-age=${30*24*60*60};"`;
      // document.cookie = encodeURIComponent('carrito') + '=' + encodeURIComponent(JSON.stringify(newCarrito));
    }


  });

});

