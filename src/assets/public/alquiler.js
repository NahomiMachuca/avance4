/*Creación de las variables*/
const nombres = document.getElementById("nombre");
const apellidos = document.getElementById("apellido");
const cedulas = document.getElementById("cedula");
const monto = document.getElementById("monto");
const habitacion = document.getElementById("habitacion");
const nombress = document.getElementById("nombress");
const apellidoss = document.getElementById("apellidoss");
const cedulass = document.getElementById("cedulass");
const form = document.getElementById("ingreso");
const listinputs = document.querySelectorAll(".ingreso_input");
const comp=cedulas;
form.addEventListener("submit", (e) => {
e.preventDefault();
let condition = validacionForm();
if (condition) {
enviarForm();
}
});
/*validación*/
function validacionForm() {
form.lastElementChild.innerHTML = "";
let condition = true;
listinputs.forEach((element) => {
element.lastElementChild.innerHTML = "";
});
if (nombres.value.length < 1 || nombres.value.trim() == "") {
mostrarMensajeError("nombre", "El nombre ingresado no es correcto.*");
condition = false;
}
if (apellidos.value.length < 1 || apellidos.value.trim() == "") {
mostrarMensajeError("apellido", "El apellido ingresado no es correcto.*");
condition = false;
}
if (
cedulas.value.length != 10 || cedulas.value.trim() == "" || 
isNaN(cedulas.value)
){
mostrarMensajeError("cedula", "La cédula ingresado no es valida*");
condition = false;
}
return condition;
}

function mostrarMensajeError(claseInput, mensaje) {
let elemento = document.querySelector(`.${claseInput}`);
elemento.lastElementChild.innerHTML = mensaje;
}
function enviarForm() {
form.submit();
 form.lastElementChild.innerHTML = "Ingrese nuevos datos para un nuevo contrato!!";
 alert("Su contrato fue creado");}
