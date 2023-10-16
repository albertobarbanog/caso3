// Elementos
const fechaInicio = document.getElementById("fechainicio");
const fechaFin = document.getElementById("fechafin");
const warnigFechaMesagge = document.getElementById("warnigFechaMesagge")
const warningNombre = document.getElementById("warningnombre");
document.getElementById("warninghabitacion");
/*estas constantes permiten luego modificar los parrafos dentro del modal*/
const nombreModal = document.getElementById("nombreModal")
const fechaModal = document.getElementById("fechaModal")
const habitacionModal = document.getElementById("habitacionModal")
const serviciosModal = document.getElementById("serviciosModal")
let nombreinput = document.getElementById("nombre")
let succesReservation = document.getElementById("succesReservation")

// servicios
let desayuno = document.getElementById("desayuno");
let internet = document.getElementById("internet");
let agua = document.getElementById("agua");
let mascota = document.getElementById("mascota");

let habitacion = document.getElementById("habitacion");
let warningHabitacion = document.getElementById("warningHabitacion");
let nocheModal = document.getElementById("nocheModal");

/*Esta funcion vuelve mayúsucla la primera letra*/
function mayuscula(e){
    e.value = e.value[0].toUpperCase() + e.value.slice(1);
}

/*Esta funcion permite indicar error en caso de que la primera fecha sera igual o mayor a la segunda*/

function checkFecha() {
    if (!fechaInicio.value || !fechaFin.value) {
        console.log("Entra a checkFecha");
        warnigFechaMesagge.innerText = "Por favor, ingrese un intervalo válido de fechas"
    } else if (new Date(fechaInicio.value) >= new Date(fechaFin.value)) {
        warnigFechaMesagge.innerText = "La fecha de inicio debe ser menor a la fecha de fin"
    } else if (new Date(fechaInicio.value) <= new Date()) {
        warnigFechaMesagge.innerText = "La fecha de inicio debe ser mayor a la fecha actual"


    } else {
        parrafo1.textContent = ""
    }
}

/*Esta función actua al apretar el boton enviar, se revisa que esten los datos correctos
y luego si es asi abre el modal con las los datos de la reserva*/
let warning ="";
const parrafo2 = document.getElementById("warningnombre");
document.getElementById("warninghabitacion");
function verif() {
    var correcto = false; /*parametro que inicia falso y solo si esta todo correcto pasa a verdadero*/
    if (nombre.value.length < 1){
        warning = "Por favor, ingrese un nombre para realizar la reserva";
        parrafo2.innerHTML = warning;
    } else {
        correcto = true;
        warning ="";
        parrafo2.innerHTML = warning;
        var fecha1 = document.getElementById("fechainicio").value;
        var fecha2 = document.getElementById("fechafin").value;
        if (fecha1 >= fecha2) {
            parrafo1.innerHTML = "Por favor, ingrese un intervalo válido de fechas";
            correcto = false;
        } else {
            warningfecha = "";
            parrafo1.innerHTML = warningfecha;
            correcto = true;
        }
    }

const checkHabitacion = () => {
    if (habitacion.value === "0") {
        warningHabitacion.innerText = "Por favor, seleccione una habitación"
        return false;
    } else {
        warningHabitacion.innerText = ""
        return true;
    }
}

/*Esta función actua al apretar el boton enviar, se revisa que esten los datos correctos
y luego si es asi abre el modal con las los datos de la reserva*/
function verificacion() {
    // let correcto = false; /*parametro que inicia falso y solo si esta todo correcto pasa a verdadero*/
    // validamos lo que nos retorna la funcion checkName y checkFecha ( true o false )
    checkName();
    checkFecha();
    checkHabitacion();
    /*este if indica que si todo esta bien se abra el modal de la reserva*/
    if (checkName() && checkFecha() && checkHabitacion()) {
        modalFunction()
    }

}

const successFunction = () => {
    succesReservation.classList.remove("d-none");
    // Elimina el texto de la etiqueta a los 5 segundos

    setTimeout(() => {
        succesReservation.classList.add("d-none");
    }, 3000);
}

const serviciosCheck = () => {

    // Arreglo con los servicios, su mensaje y su valor
    const servicios = [
        { checkbox: desayuno, mensaje: "<li>Desayuno $10.000</li>", precio: 10000 },
        { checkbox: internet, mensaje: "<li>Internet $5.000</li>", precio: 5000 },
        { checkbox: agua, mensaje: "<li>Agua Caliente $7.000</li>", precio: 7000 },
        { checkbox: mascota, mensaje: "<li>Mascotas $15.000</li>", precio: 15000 }
    ];

    let servicioMesagge = ""
    let servicioStatus = false; /*inicia como falso y solo añadira texto si algún campo esta checkeado*/
    let precioServiciosAdicionales = 0;

    // Recorre el arreglo de servicios y agrega el mensaje y el precio si el checkbox está seleccionado ( si es true )
    servicios.forEach(servicio => {
        if (servicio.checkbox.checked) {
            servicioMesagge += `${servicio.mensaje}`;
            precioServiciosAdicionales += servicio.precio;
            servicioStatus = true;


// Obtiene el tipo de habitación seleccionada
        let habitacion = document.getElementById("habitacion").value;

        // Establece el precio en base al tipo de habitación
        let precioPorNoche;
        let tipoHabitacion;
        if (habitacion === "1") {
            precioPorNoche = 50000; // precio en números para facilitar el cálculo
            tipoHabitacion = "Simple";
        } else if (habitacion === "2") {
            precioPorNoche = 70000;
            tipoHabitacion = "Doble";
        } else if (habitacion === "3") {
            precioPorNoche = 90000;
            tipoHabitacion = "Triple";
        } else if (habitacion === "4"){
            precioPorNoche = 120000;
            tipoHabitacion = "Deluxe";
        }

        // Obtiene las fechas e incrementa el numero de noches
        let fechaInicio = new Date(document.getElementById("fechainicio").value);
        let fechaFin = new Date(document.getElementById("fechafin").value);
        let tiempoHospedaje = Math.abs(fechaFin - fechaInicio);
        let noches = Math.ceil(tiempoHospedaje / (1000 * 60 * 60 * 24)); // ms a días

        // Valores de servicios adicional (Se agregua un valor un total que no se multiplica pro los dias)
        let servAdicionales = 0;

        if (desayuno){
            servAdicionales += 10000;
        }
        if (internet){
            servAdicionales += 5000;
        }
        if (agua){
            servAdicionales += 7000;
        }
        if (mascota){
            servAdicionales += 15000;
        }

        // Calcula el precio total dependiendo de la cantidad de noches
        let precioTotal = precioPorNoche * noches + servAdicionales;

        // Agrega el precio y el tipo de habitación al modal, formatea el precio a cadena
        document.getElementById("habitacionmod").innerText = tipoHabitacion;
        document.getElementById("precio").innerText = "$" + precioTotal;
    }
}