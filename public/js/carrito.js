function agregarAlCarrito(id, nombre, precio) {

    let carrito = localStorage.getItem('carritoHardzone');
    
    if (!carrito) {
        carrito = [];
    } else {
        carrito = JSON.parse(carrito);
    }

    const nuevoProducto = {
        id: id,
        nombre: nombre,
        precio: parseFloat(precio),
        cantidad: 1
    };
    
    carrito.push(nuevoProducto);

    localStorage.setItem('carritoHardzone', JSON.stringify(carrito));

    alert(`${nombre} agregado al carrito!`);
}