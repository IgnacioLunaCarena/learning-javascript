// VARIABLES

let ingreso = true;
let numeroDeUsuario; // Es el indice del array clientes, representa que usuario esta logueado.
let numeroDeServicio; // Es el indice del array servicios, representa que servicio se selecciono.
let numeroDeServicioCorrecto = false; // Booleando para primer seleccion de servicio.
let seguirComprando = true; // Booleando inicializado en true, mantiene el bucle while para seguir comprando hasta hacerla false.
let valorTotal = 0; // Guarda el valor total de los servicios seleccionados.

// ARRAYS

let clientes = [
    {
        nombre: "Ignacio Luna",
        dni: 36501463,
    }
];
let servicios = [
    {
        nombre: "Corte",
        precio: 10000,
        id: 1,
    },
    {
        nombre: "Barba",
        precio: 3000,
        id: 2,
    },
    {
        nombre: "Color",
        precio: 15000,
        id: 3,
    }
]

// FUNCIONES 
const seteoDeVariables = () => {
    valorTotal = 0;
    numeroDeServicioCorrecto = false;
    seguirComprando = true;
}
const ingresoUsuario = (ordenDelArray) => { // Asigna el valor de i a la variable numeroDeUsuario para saber que usuario esta logueado.
    numeroDeUsuario = ordenDelArray;
}
const creacionUsiario = (nombre, dni) => { // Agrega un elemento al array clientes y asigna el valor de la ultima posicion del array a la variable numeroDeUsuario
    clientes.push({nombre: nombre, dni: dni})
    numeroDeUsuario = clientes.length - 1;
    alert("Usuario creado");
}
const seleccionarServicio = () => { // Crea un mensaje con la lista de servicios disponibles y recibe la opcion elegida por el usuario.
    let listaServicios = "Ingrese el numero del servicio desea realizar:\n\n";
    for (let i = 0; i < servicios.length; i++){
        listaServicios += `${servicios[i].id} - ${servicios[i].nombre} ($${servicios[i].precio})\n`;
    }
    numeroDeServicio = parseInt(prompt(listaServicios))-1;
}
const verificacionDeSeleccion = (valor) => {
    if (valor >= 0 && valor < servicios.length) {
        return true;
    }else{
        return false;
    }
}
const agregarValorDeServicio = (valorDeServicio) => { // Va guardando el valor total de los servicios que va eligiendo el usuario.
    valorTotal = valorTotal + valorDeServicio;
}

// COMIENZO DE SIMULADOR
while (ingreso) {
    seteoDeVariables();
    alert ("Bienvenido a la barberia de Reveck");
    let id = Number(prompt("Ingrese su DNI para ingresar o crear un usuario"));
    
    if (clientes.length == 0) {
        creacionUsiario();
    } else {
        for (let i = 0; i < clientes.length; i++) {
            if (clientes[i].dni == id) {
                ingresoUsuario(i);
                break;
            }
            if (i == (clientes.length - 1) && clientes[i].dni != id) { 
                alert ("Usuario inexistente\nSe le van a solicitar algunos datos para la creación de usuario.")
                let nombre = prompt("Ingrese su nombre y apellido");
                let dni = parseInt(prompt("Ingrese su DNI"));
                creacionUsiario(nombre, dni);
                break
            }
        }
    }
    
    alert (`Bienvenido/a ${clientes[numeroDeUsuario].nombre}`);
    
    if (confirm("Desea reservar un turno?")){
        while (!numeroDeServicioCorrecto){
            seleccionarServicio();
            if (verificacionDeSeleccion(numeroDeServicio)){
                agregarValorDeServicio(servicios[numeroDeServicio].precio);
                numeroDeServicioCorrecto = true;
            }else{
                alert ("Numero de servicio ingresado incorrecto");
                numeroDeServicioCorrecto = false;
            }
        }
        while (seguirComprando) {
            if (confirm(`El coste actual de su servicio es de $${valorTotal}\n\nDesea seguir comprando?`)){
                seleccionarServicio();
                if (verificacionDeSeleccion(numeroDeServicio)){
                    agregarValorDeServicio(servicios[numeroDeServicio].precio);
                }else{
                    alert ("Numero de servicio ingresado incorrecto");
                }
            }
            else{
                seguirComprando = false;
            }
        }
        let pago = parseInt(prompt(`Usted debe abonar un total de $${valorTotal}`));
        while (pago != valorTotal){
            pago = parseInt(prompt(`Por favor, abone el total de $${valorTotal}`));
        }
        alert (`Gracias por su colabocarión.\n\nQue tenga un buen dia.`);
    }else{
        alert (`Usted sera deslogueado\n\nQue tenga un buen dia ${clientes[numeroDeUsuario].nombre}`);
    }
}