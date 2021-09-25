
window.addEventListener("load", function(){
    
    let arrayProductos = [];

    let addCart = document.querySelectorAll(".addCart")

    for (let i = 0; i < addCart.length; i++) {
        addCart[i].addEventListener("click", function(evento){
        
            let producto = {
                id: evento.target.getAttribute("data-product-id")
            }
     
            arrayProductos.push(producto)
            localStorage.setItem("carrito",arrayProductos)
            
            
     
         })
        
    }
   

})