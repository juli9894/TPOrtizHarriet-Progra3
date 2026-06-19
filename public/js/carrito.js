let productoTemporal = {};

function abrirModalCantidad(id, nombre, precio) {
    productoTemporal = { id, nombre, precio };
    
    document.getElementById('modal-nombre-producto').innerText = nombre;
    document.getElementById('modal-select-cantidad').value = "1";
    
    document.getElementById('modal-cantidad').style.display = 'flex';
}

function cerrarModalCantidad() {
    document.getElementById('modal-cantidad').style.display = 'none';
}

function confirmarAgregarAlCarrito() {
    let cantidad = parseInt(document.getElementById('modal-select-cantidad').value);
    let { id, nombre, precio } = productoTemporal;

    let carrito = JSON.parse(localStorage.getItem('carritoHardzone')) || [];
    const indiceProducto = carrito.findIndex(producto => producto.id === id);

    if (indiceProducto !== -1) {
        carrito[indiceProducto].cantidad += cantidad;
    } else {
        carrito.push({
            id: id,
            nombre: nombre,
            precio: parseFloat(precio),
            cantidad: cantidad
        });
    }

    localStorage.setItem('carritoHardzone', JSON.stringify(carrito));
    
    cerrarModalCantidad();
    alert(`✅ ¡Se agregaron ${cantidad} unidades de ${nombre} al carrito!`);
}