window.addEventListener("load", function(){
    
    let formulario = document.querySelector("form.agregar");
  
    formulario.addEventListener("submit", function(e){
        
        let errores = [];

        let imagen = document.getElementById("imagenRegistro")
        console.log(imagen)
        
        if((imagen.value == "") || (ExtensionIncorrecta(imagen.value)) ){
           
            errores.push("Debes subir una imagen con las siguientes extensiones: 'jpg', 'png', 'gif', 'jpeg' ")
        };

        if (errores.length > 0){
            
            e.preventDefault();
            
            let ulErrores = document.querySelector("div.errores ul")
            cleanErroresAddProduct(ulErrores)
            for (let i = 0; i < errores.length; i++) {
                
                ulErrores.innerHTML += "<li>" + errores[i] + "</li>"
                
            }
        }



    });


    function cleanErroresAddProduct(ulErrores){
        ulErrores.innerHTML = ""

    }

    function ExtensionIncorrecta(s) {
        const listaDeExtensiones = ['jpg', 'png', 'gif', 'jpeg'];
      let extension = s.trim().split(".").pop();
      console.log(extension)
      for (let e of listaDeExtensiones) {
            if (extension === e)
            return false;
      }
      return true;
    }






})