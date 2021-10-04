let carrito = JSON.parse(localStorage.getItem("carrito"))
console.log(carrito)

carrito.forEach(producto => {
    let contenedor = document.createElement("tr")
        contenedor.innerHTML = `   
        <td> 
        <div id="divCarro" class="cart-info">
            <img src="/img/${producto.imagen} " class="img">

            <div>
                <p>${producto.nombre}  </p>
                <small>Precio:$${producto.precio}  </small>
                <br>
                <a href="">Quitar</a>
            </div>
        </div>
        </td>
        <td><input type="number" value="1"></td>
        <td>$2.000,00</td>
     `

    document.getElementById("divCarro").appendChild(contenedor)

}); 

