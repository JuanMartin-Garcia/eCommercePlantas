
window.addEventListener("load", function(){
    let nombre = document.getElementById("nombre")
    let precio = document.getElementById("precio")
    let imagen = document.getElementById("imagen")
    let id = document.getElementById("productoID")

    let addCart = document.getElementsByClassName("addCart")

        for (let i = 0; i < addCart.length; i++) {
            let boton = addCart[i]
             boton.addEventListener("click", agregar)
            
        }
      
    function agregar (){
          let carrito = JSON.parse(localStorage.getItem("carrito"))
          let producto = {
           id: id.innerText,
           nombre: nombre.innerText,
           precio: precio.innerText,
           imagen: imagen.innerText

       }
       if (localStorage.getItem("carrito")!= null) {
        if (carrito[producto.id] == undefined) {
            carrito = {
                ...carrito,
                [producto.id] : producto
            } 
        }
              

    }   else {
        carrito = {
            [producto.id] : producto
        }

    }
        localStorage.setItem("carrito",JSON.stringify(producto))
        
      
      }
      
    })