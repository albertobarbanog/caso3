// Elementos
const fechaInicio = document.getElementById("fechainicio");
const fechaFin = document.getElementById("fechafin");
const warnigFechaMesagge = document.getElementById("warnigFechaMesagge")
const warningNombre = document.getElementById("warningnombre");
const warningHabitacion = document.getElementById("warninghabitacion");



/*Esta funcion vuelve mayúsucla la primera letra*/
function mayuscula(e){
    e.value = e.value[0].toUpperCase() + e.value.slice(1);
};

/*Esta funcion permite indicar error en caso de que la primera fecha sera igual o mayor a la segunda*/
const parrafo1 = document.getElementById("warningfecha")
function check() {
    const fecha1 = document.getElementById("fechainicio").value;
    const fecha2 = document.getElementById("fechafin").value;
    const parrafo1 = document.getElementById("warningfecha")

    if (fecha1 >= fecha2) {
        const warningfecha = "Por favor, ingrese un intervalo válido de fechas"
        parrafo1.textContent = warningfecha
    } else {
        parrafo1.textContent = ""
    }
};

/*Esta función actua al apretar el boton enviar, se revisa que esten los datos correctos
y luego si es asi abre el modal con las los datos de la reserva*/
let warning ="";
const parrafo2 = document.getElementById("warningnombre");
const parrafo3 = document.getElementById("warninghabitacion");
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
            let warningfecha = "Por favor, ingrese un intervalo válido de fechas";
            parrafo1.innerHTML = warningfecha;
            correcto = false;
        } else {
            warningfecha = "";
            parrafo1.innerHTML = warningfecha;
            correcto = true;
        }
    }

    /*este if indica que si todo esta bien se abra el modal de la reserva*/
    if (correcto) {
        const sonucModal = document.getElementById("modalreserva");
        const modalEl = new bootstrap.Modal(sonucModal);
        modalEl.show();

        /*estas constantes permiten luego modificar los parrafos dentro del modal*/
        const nombremod = document.getElementById("nombremod")
        const fechamod = document.getElementById("fechamod")
        const habitacionmod = document.getElementById("habitacionmod")
        const serviciosmod = document.getElementById("serviciosmod")

        /*aca obtengo el nombre*/
        let nombreinput =document.getElementById("nombre").value
        nombremod.innerText = nombreinput

        /*aca obtengo las fechas indicadas*/
        let fechaprimera = document.getElementById("fechainicio").value;
        let fechasegunda = document.getElementById("fechafin").value;
        let fechas = "desde " + fechaprimera + " hasta " + fechasegunda
        fechamod.innerText = fechas

        /*Aca verifico si los checkbox estan checked o unchecked, si esta checked el valor de la varianble queda como "true"*/

        let desayuno = document.getElementById("desayuno").checked;
        let internet = document.getElementById("internet").checked;
        let agua = document.getElementById("agua").checked;
        let mascota = document.getElementById("mascota").checked;
        let serv = ""

        let servnull = false; /*inicia como falso y solo añadira texto si algún campo esta checkeado*/
        if (desayuno){
            serv += "Desayuno <br>"
            servnull=true;
        }
        if (internet){
            serv += "Internet <br>"
            servnull=true;
        }
        if (agua){
            serv += "Agua Caliente<br>"
            servnull=true;
        }
        if (mascota){
            serv += "Mascotas <br>"
            servnull=true;
        }
        if (servnull){
            serviciosmod.innerHTML = serv
        } else {
            serviciosmod.innerHTML = "Sin servicios adicionales"
        }


// Obtiene el tipo de habitación seleccionada
        let habitacion = document.getElementById("habitacion").value;

        // Establece el precio en base al tipo de habitación
        let precioPorNoche;
        let tipoHabitacion;
        if (habitacion == "1") {
            precioPorNoche = 50000; // precio en números para facilitar el cálculo
            tipoHabitacion = "Simple";
        } else if (habitacion == "2") {
            precioPorNoche = 70000;
            tipoHabitacion = "Doble";
        } else if (habitacion == "3") {
            precioPorNoche = 90000;
            tipoHabitacion = "Triple";
        } else if (habitacion == "4"){
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