// Simulador de Rserva de Lanus 5


//Definicion de elementos y arrys
let Costo = 2000

let tablaHab = document.getElementById("tablaHab")

let formUsuario = document.getElementById("divForm")

let formDatos = document.getElementById('formDatos')

let btnFiltrar = document.getElementById('btnFiltrar')

let datosJson = document.getElementById('datosJson')

let paquetesCliente = document.getElementById('paquetesCliente')

let datosClienteFinal = document.getElementById('datosClienteFinal')

let btnDis = document.getElementById('btnDis')

let terminarJs = document.getElementById('terminarJs')

let canchaE = []

let datosJugadores = []

let ticket = []

// Un class para guardar un array con las canchas
class Cancha{

    constructor(id, tamanio, superficie){
        this.id = id 
        this.tamanio = tamanio
        this.superficie = superficie
  
    }
}


const hab1Op1Ob = new Cancha(1, "10", "sintetico")

const hab1Op2Ob = new Cancha(2, "22", "cesped")

const hab2Op1Ob = new Cancha(3, "14", "sintetico")

const hab2Op2Ob = new Cancha(4, "10", "carpeta")




const Canchas = [hab1Op1Ob, hab1Op2Ob, hab2Op1Ob, hab2Op2Ob]

// Adicionales

class Adicional {
    constructor(id, tit,precio, disp){
        this.id = id
        this.tit = tit
        this.precio = precio
        this.disp = disp
    }
}

const adicComida= new Adicional(1, "Asado", 5000, true)

const adicBebida = new Adicional(2, "Bebida", 2000, true)

const adicMusica = new Adicional(3, "Musica", 500, true )

const adicionales = [adicComida, adicBebida, adicMusica]

const adicionalAll = {id: 0, tit: "All inclusive", item1: "Comida", item2: "Bebida", item3: "Musica", precio: 750}





// Muestro en el html todas las canchas
mostrarHabs(Canchas)


// Uso del localSotrage
let canchaElegida = JSON.parse(localStorage.getItem("canchaElegida")) ?? [] 


//Formulario principal
formUsuario.addEventListener(`submit`, (e)=>{
    e.preventDefault()
    let nombre = document.getElementById(`nombreUs`).value

    let apellido = document.getElementById(`apelUs`).value

    let usuario = nombre + " " + apellido

    let cantPer = document.getElementById(`cantPerUs`).value

    


    
    let cliente = {usuario: usuario}

//En caso de que ingrese un valor incorrecto se llamara a una funcion u otra

    if(5 <= cantPer && cantPer <= 11){
        adicionalCliente(cantPer,adicionalAll, canchaE)
        datosJugador(cantPer)

        let botonAdicionalNo = document.getElementById('adicionalNo')


        botonAdicionalNo.addEventListener('click', ()=>{
            adicionalesCliente(cantPer)
        })

        let btnRserva = document.getElementById('btnReserva')

        btnRserva.addEventListener('click', ()=>{
            verReserva(cliente, canchaE, ticket, cantPer)
        })
        
    }
    else{
        errorCarga()
        
        
    }
})


// Formulario con los datos de los jugadores


formDatos.addEventListener('click', (e) =>{
    e.preventDefault()
})

cantPerUs.addEventListener(`change`, () =>{

    let filtro = cantPerUs.value

    let filtroHab = Canchas.filter( Cancha => Cancha.tamanio.includes(filtro))

    tablaHab.innerHTML = ' '

    
    if ( 5 <= filtro && filtro <= 11){
        mostrarHabs(filtroHab)
        
        }
    
    else{
        errorCarga()
    }

    // En caso de que elija cancha con filtro

    filtroHab.forEach(Cancha =>{
        document.getElementById(`boton${Cancha.id}`).addEventListener("click", ()=>{
            event.target.disabled=true
            canchaE = Cancha
            
            localStorage.setItem("Cancha", JSON.stringify(canchaE))
            
            })
        })


    

}) 

// En caso de que elija cancha sin filtro

Canchas.forEach(Cancha =>{
    document.getElementById(`boton${Cancha.id}`).addEventListener("click", ()=>{
            event.target.disabled=true
            canchaE = Cancha
            localStorage.setItem("Cancha", JSON.stringify(canchaE))
            console.log(canchaE)
            })

})


function mostrarHabs(Canchas){
    
    tablaHab.innerHTML+='<h2 class=" text-center">Canchas recomendadas</h2> '

    Canchas.forEach(Cancha => {
        tablaHab.innerHTML += `
        
            <div class="card margin bg-dark border border-white" style="width: 18rem; id= habitacion${Cancha.id}">
                <div class="card-body">
                    <h4 class="card-title">Cancha ${Cancha.id}</h4>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-dark colorTextCard">${Cancha.tamanio} Tamaño  </li>
                    <li class="list-group-item bg-dark colorTextCard">${Cancha.superficie} Superficie</li>
                
                </ul>

                <div class= "btn btn-dark" >
                        <button class="btn btn-primary" type="submit" id ="boton${Cancha.id}">Reservar</button>
                </div>
                
            </div>
        
    `
    
    })
}


function errorCarga(){
    tablaHab.innerHTML = `
        <div class="card margin bg-dark colorTextCard" style="width: 40rem;">
            <div class="card-body">
                <h3 class="card-title">No hay canchas con esas caracteristicas, intentelo de nuevo</h3>
            </div>
        </div>
        `
    formDatos.innerHTML = ''
    paquetesCliente.innerHTML = ' '
}


function datosJugador(cantPer){
    
    formDatos.innerHTML = " "

    if (cantPer < 5){
        formDatos.innerHTML = " "
    }
    else if (cantPer == 5){
        formDatos.innerHTML += `<span class="tituloDatosJugador">Datos de jugador</span>`}

    
    else{
        formDatos.innerHTML += `<span class="tituloDatosJugador">Datos de jugador</span>`

    }

    
    for (let i=1; i<cantPer; i++){
        
        formDatos.innerHTML += `

        <div class="row" id="idFam${i}">    
            <div class="col-md-4">
                <label for="validationCustom01" class="form-label" required>Nombre</label>
                <input type="text" class="form-control" id="nombreFam${i}">
            </div>
            <div class="col-md-4">
                <label for="validationCustom02" class="form-label">Apellido</label>
                <input type="text" class="form-control" id="apellFam${i}">
            </div>
            

           
        </div>

        <div class= "d-flex justify-content-center col-md-12">
        <button class="btn btn-dark prueba1" type="submit" id= "btnCarga${i}">Cargar</button>
        </div>
        `
        
        

        
    }

    for (let i=1; i<cantPer; i++){
        btnCarga = document.getElementById(`btnCarga${i}`)
        
        btnCarga.addEventListener(`click`, ()=>{

        let idFam = i 

        let nomAcom = document.getElementById(`nombreFam${i}`).value

        let apellAcom = document.getElementById(`apellFam${i}`).value


        let datosPersona = {idFam: idFam, nomAcomp: nomAcom, apellAcom: apellAcom}

        datosJugadores.push(datosPersona)
        Toastify({
            text: `Datos de ${nomAcom} cargados correctamente`,
            duration: 3000,
            newWindow: true,
            close: false,
            gravity: "top",
            position: "right",
            stopOnFocus: true,
            style: {
                color:"white",
                background: "black",
            },
            onClick: function(){}
        }).showToast();
        console.log(datosJugadores)
        
    })

    
}
    

}

function adicionalCliente(cantP, adicionalAll){

    paquetesCliente.innerHTML =`
        <div class="separador d-flex justify-content-center">
            <div class="separador card margin bg-dark border border-white " style="width: 18rem;">
                
                <div class="card-body">
                    <h4 class="card-title">All inclusive</h5>
                    <p class="card-text">Para que disfrutes despues del partido</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item bg-dark colorTextCard">Incluye Comida</li>
                    <li class="list-group-item bg-dark colorTextCard">Incluye Bebida</li>
                    <li class="list-group-item bg-dark colorTextCard">Incluye musica</li>
                </ul>
                
                <div class= "btn btn-dark" >
                    <button class="btn btn-primary" type="submit" id ="adicionalSi">Deseo agregar paquete</button>
                </div>
                <div class= "btn btn-dark" >
                    <button class="btn btn-primary" type="submit" id ="adicionalNo">No, gracias</button>
                </div>
                <div class="d-flex justify-content-center">
                    <span>Costo adicional $ ${cantP*adicionalAll.precio}</span>
                </div>
            </div>
        </div>
    
    `
    let adicionalSi = document.getElementById('adicionalSi')
    
//El event hace que el cliente solo pueda agregar una y no mas


    adicionalSi.addEventListener('click', ()=>{
        event.target.disabled=true
        ticket.push(adicionalAll)
    })

}
function adicionalesCliente(cantP){
        

        const tarjetasAdic = adicionales.map(element=>{
            const {id, tit,precio, disp} = element;
            if(disp == false){
                return `<div class="separador card margin bg-dark border border-white " style="width: 18rem;">
            
            <div class="card-body">
                <h4 class="card-title">${tit}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark colorTextCard">${item1}</li>
                <li class="list-group-item bg-dark colorTextCard">${item2}</li>
                <li class="list-group-item bg-dark colorTextCard">${item3}</li>
            </ul>
            
            <div class= "btn btn-dark" >
                <button disabled="true" class="btn btn-light" type="submit" id ="Si${id}">Paquete Agregado</button>
            </div>
        </div>`
            }
            else{
                return `<div class="separador card margin bg-dark border border-white " style="width: 18rem;">
            
            <div class="card-body">
                <h4 class="card-title">${tit}</h4>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item bg-dark colorTextCard">${item1}</li>
                <li class="list-group-item bg-dark colorTextCard">${item2}</li>
                <li class="list-group-item bg-dark colorTextCard">${item3}</li>
            </ul>
            
            <div class= "btn btn-dark" >
                <button class="btn btn-primary" type="submit" id ="Si${id}">Deseo agregar paquete</button>
            </div>
            <div class="d-flex justify-content-center">
                <span>Costo adicional $ ${cantP*precio}</span>
            </div>
        </div>`
            }
            
        })

        paquetesCliente.innerHTML= tarjetasAdic.join("")

        botonadicionales()

}

function botonadicionales(){
    
    adicionales.forEach((adicionales)=>{
        document.querySelector(`#Si${adicionales.id}`).addEventListener('click', ()=>{
            event.target.disabled=true
            ticketCliente(adicionales)
        })
    })

}

function ticketCliente(adicionales){
    const sumarAdic = ticket.some((element)=>element.id === adicionales.id)
    console.log(sumarAdic)

    if(sumarAdic){
        
        ticket.map(element=>{
            if(element.id === adicionales.id ){
                element.disp = false
                return element
            }
        })
    }
    else{
        ticket.push(adicionales)
    }
    
}

function verReserva(cliente, canchaE, ticket, cantPer){
    datosClienteFinal.innerHTML =`
    <h5 class="titTicket">Datos del titular</h5>
    <div class="d-flex row">
        <span>${cliente.usuario}</span>
        <span>Jugadores: ${cliente.cantPer}</span>
    </div>
    <h5 class="titTicket">Cancha elegida</h5>
    <div class="d-flex row">
        <span>Superficie: ${canchaE.superficie}</span>
        <span>Tamaño: ${canchaE.tamanio}</span>
        
    </div>   
    `
    adicionalesFinal(ticket)
    if(10 < cantPer && cantPer < 22){
        acompUsuario(datosJugadores)
    }

    totalRserva(Costo, cantPer)

    finProyecto()
}

function adicionalesFinal(){
    datosClienteFinal.innerHTML+= `<h5 class="titTicket">Adicionales elegidos/s</h5>
                                    `
    const adicF = ticket.map(element=>{
        const {id, tit, precio, disp} = element
        console.log(precio+precio)
        return `<div>
                <span>${tit}</span>
                </div>`
    })

    datosClienteFinal.innerHTML+= adicF.join("")
}

function acompUsuario(){
    datosClienteFinal.innerHTML+= `<h5 class="titTicket">Datos de jugadores/s</h5>`
    const acomp = datosJugadores.map(element=>{
        const {idFam: idFam, nomAcomp: nomAcom, apellAcom: apellAcom} = element
        return `<div>
                <span>${nomAcom} ${apellAcom}</span>
                </div>`
                
    })
    datosClienteFinal.innerHTML+= acomp.join("")
}

function finProyecto(){
    
    // Uso de librerias

    terminarJs.addEventListener('click', ()=>{
        
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: '¿Estas seguro de hacer tu reserva?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'No, quiero seguir viendo mi reserva!',
            confirmButtonText: 'Si, si lo estoy!',
            reverseButtons: false
        }).then((result) => {
            if (result.isConfirmed) {
                swalWithBootstrapButtons.fire(
                    '¡Reserva realizada!',
                    // Cuando el cliente carga todos los datos se reinicia la pagina en 3segs para simular el envio de datos
                    setInterval(()=>{location.reload()}, 3000)
            )
            } else if (
            result.dismiss === Swal.DismissReason.cancel
            ) {
            swalWithBootstrapButtons.fire(
                'Segui mirando tranquilo ;)'
            )
            }
        })
        
    })
    
}

function totalRserva(costo,cantPer){
    precioFinal = 0
    ticket.forEach((ticket =>{
        precioFinal +=ticket.precio    }))

    return datosClienteFinal.innerHTML+=`
    <div>
        <span>Total Reserva $ ${(costo+cantPer) / (precioFinal+cantPer)} </span>
    </div>
    `
    
}



fetch("clima.json")
.then(response => response.json())
.then((data)=>{
    data.forEach((element) =>{
        datosJson.innerHTML = `
        <span>${element.temp}°</span>
        <span class="espacioClima">${element.desc}</span>
        <img src="${element.img}" class="imgNube espacioClima">
        <span class="espacioClima">${element.ubi}</span>
        
        `
    })
})


setInterval(()=>{
    fetch("clima.json")
    .then(response => response.json())
    .then((data)=>{
        data.forEach((element) =>{
            datosJson.innerHTML = `
            <span>${element.temp}°</span>
            <span class="espacioClima">${element.desc}</span>
            <img src="${element.img}" class="imgNube espacioClima">
            <span class="espacioClima">${element.ubi}</span>
            
            `
        })
    })
}, 3000)
