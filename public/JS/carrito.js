    localStorage.clear()
    

        // for (let i = 0; i < addCart.length; i++) {
        //     let boton = addCart[i]
        //      boton.onclick = agregar(i+1)
            
        // }
    
    function agregar (x){
           
          let producto = {
           id: x[0],
           nombre: x[3],
           precio: x[2],
           imagen: x[1]

       }

       let carrito = JSON.parse(localStorage.getItem("carrito"))
       if (localStorage.getItem("carrito")!= null) {
             
            carrito = [ 
                ...carrito, producto
            ]
                
            

    }   else {
        carrito = [ 
            producto
        ]

    }
        localStorage.setItem("carrito",JSON.stringify(carrito))
        
      
    }
      
   