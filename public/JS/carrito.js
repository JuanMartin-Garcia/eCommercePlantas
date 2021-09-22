window.addEventListener("load", function(){

    let addCart = document.querySelector(".addCart")

    addCart.addEventListener("click", function(evento){
        
        console.log(evento["path"])
        console.log(evento.target.parents())

    })




})