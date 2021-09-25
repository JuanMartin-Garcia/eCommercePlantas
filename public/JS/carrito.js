
window.addEventListener("load", function(){
    let a = document.getElementById("consoleA")
    console.log(a)
    let arrayProductos = [];

    let addCart = document.querySelectorAll(".addCart")

    for (let i = 0; i < addCart.length; i++) {
        addCart[i].addEventListener("click", function(evento){
        
            let producto = {
                id: evento.target.getAttribute("data-product-id"),
                
            }
     
            arrayProductos.push(producto)
            localStorage.setItem("carrito",arrayProductos)
            // aca pasarlo a json , json stringify
            
            //get item va junto con el json.parse
     
         })
        
    }
   
    // json a array : json.parse
    // array a json: json.stringify

    // 
})