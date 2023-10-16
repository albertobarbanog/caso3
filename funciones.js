// get document elements
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
function mayuscula(e) {
    if (e.value !== "") {
        e.value = e.value[0].toUpperCase() + e.value.slice(1);
    }
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
        warnigFechaMesagge.innerText = ""
        return true;
    }
}

/*aca se revisa que el nombre no este vacio*/
function checkName() {
    let warning = "";
    if (nombre.value.length < 1) {
        warning = "Por favor, ingrese un nombre para realizar la reserva";
        warningNombre.innerText = warning;
    } else {
        warningNombre.innerText = '';
        return true;
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
        }
    });

    // Mensaje por si no hay servicios seleccionados
    serviciosModal.innerHTML = servicioStatus ? servicioMesagge : "Sin servicios adicionales"; //If con operador ternario ( condición ? valorSiVerdadero : valorSiFalso; )
    return precioServiciosAdicionales;

}

const habitacionSeleccionada = () => {

    // Establece el precio en base al tipo de habitación
    let precioPorNoche;
    let tipoHabitacion;
    if (habitacion.value === "1") {
        precioPorNoche = 50000; // precio en números para facilitar el cálculo
        tipoHabitacion = "Simple";
    } else if (habitacion.value === "2") {
        precioPorNoche = 70000;
        tipoHabitacion = "Doble";
    } else if (habitacion.value === "3") {
        precioPorNoche = 90000;
        tipoHabitacion = "Triple";
    } else if (habitacion.value === "4") {
        precioPorNoche = 120000;
        tipoHabitacion = "Deluxe";
    }

    habitacionModal.innerText = tipoHabitacion + " $" + precioPorNoche.toLocaleString('es-CL');
    return precioPorNoche;
}

const calculoNoches = () => {
    // Obtiene las fechas e incrementa el numero de noches
    let fechaInicio = new Date(document.getElementById("fechainicio").value);
    let fechaFin = new Date(document.getElementById("fechafin").value);
    console.log("fechaInicio", fechaInicio, "fechaFin", fechaFin);
    let tiempoHospedaje = Math.abs(fechaFin - fechaInicio);
    console.log("tiempoHospedaje", tiempoHospedaje);
    console.log(tiempoHospedaje / (1000 * 60 * 60 * 24));
    let noches = Math.ceil(tiempoHospedaje / (1000 * 60 * 60 * 24)); // ms a días
    nocheModal.innerHTML = noches;
    return noches
}

// funcion para cambiar el formato de fecha
function formatDateToDDMMYYYY(dateString) {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString('es-CL'); // 'es-CL' es para el formato chileno
}

const modalFunction = () => {

    console.log("Entra a modalFunction");
    const sonucModal = document.getElementById("modalreserva");
    const modalEl = new bootstrap.Modal(sonucModal);
    modalEl.show();

    /*aca obtengo el nombre*/
    nombreModal.innerText = nombreinput.value

    /*aca obtengo las fechas indicadas*/
    console.log("fechaInicio", fechaInicio.value, "fechaFin", fechaFin.value);
    let fechaInicioFormatted = formatDateToDDMMYYYY(fechaInicio.value);
    let fechaFinFormatted = formatDateToDDMMYYYY(fechaFin.value);
    fechaModal.innerText = "Desde el " + fechaInicioFormatted + "\n Hasta el " + fechaFinFormatted;

    // llamado a la función que muestra los servicios seleccionados
    serviciosCheck();
    habitacionSeleccionada();
    calculoNoches();

    // Calcula el precio total dependiendo de la cantidad de noches
    let precioTotal = (habitacionSeleccionada() + serviciosCheck()) * calculoNoches()

    // Agrega el precio y el tipo de habitación al modal, formatea el precio a cadena
    document.getElementById("precio").innerText = "$" + precioTotal.toLocaleString('es-CL'); // 'es-CL' es para el formato chileno
}

