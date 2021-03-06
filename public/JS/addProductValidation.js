window.addEventListener("load", function(){
    
    let formulario = document.querySelector("form.agregar");
  
    formulario.addEventListener("submit", function(e){
        
        let errores = [];

        let nombre = document.getElementById("inputName")
        
        if(nombre.value == "") {

            errores.push("El campo de nombre debe estar completo")
        }   else if (nombre.value.length < 4) {
            errores.push("El campo nombre debe tener al menos 4 caracteres")
        };

        let descripcion = document.getElementById("inputDescripcion")

        if(descripcion.value == " ") {

            errores.push("El campo de descripcion debe estar completo")
        }   else if (descripcion.value.length < 20) {
            errores.push("El campo descripcion debe tener al menos 20 caracteres")
        };

        let precio = document.getElementById("precio-nuevo")

        if(precio.value == "") {

            errores.push("El campo de descripcion debe estar completo")
        }   else if (precio.value.length < 3) {
            errores.push("El campo precio debe tener al menos 3 cifras")
        };

        let imagen = document.getElementById("inputImagen")

        
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