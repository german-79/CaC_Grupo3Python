function guardar() {
    let nombre_ingresado = document.getElementById("nombre").value //input
    let apellido_ingresado = document.getElementById("apellido").value 
    let matricula_ingresado = document.getElementById("matricula").value 
    let terapia_ingresado = document.getElementById("terapia").value 
    let imagen_ingresada = document.getElementById("imagen").value 

    console.log(nombre_ingresado,apellido_ingresado,matricula_ingresado,matricula_ingresado,imagen_ingresada);
    // Se arma el objeto de js 
    let datos = {
        nombre: nombre_ingresado,
        apellido:apellido_ingresado,
        matricula:matricula_ingresado,
        terapia:terapia_ingresado,
        imagen:imagen_ingresada
    }
    console.log(datos);
    
    let url = "https://german79.pythonanywhere.com/registro"
    var options = {
        body: JSON.stringify(datos),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    }
    fetch(url, options)
        .then(function () {
            console.log("creado")
            alert("Grabado")
            // Devuelve el href (URL) de la página actual
            window.location.href = "../index_intranet.html";  
            
        })
        .catch(err => {
            //this.errored = true
            alert("Error al grabar" )
            console.error(err);
        })
}