const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

// validar carnet: dos letras, dos tres números
const carnetValido = /^[a-zA-Z]{2}[0-9]{3}$/;

// validar nombre completo: solo letras, no números o caracteres especiales
const nombreValido = /^[\p{L}]+(\s[\p{L}]+){1,3}$/u;

// validar dui: 8 números - 1 número
const duiValido = /^[0-9]{8}-[0-9]{1}$/;

// validar nit: 4 números - 6 números - 3 números - 1 número
const nitValido = /^[0-9]{4}-[0-9]{6}-[0-9]{3}-[0-9]{1}$/;

// validar fecha nacimiento: día, mes, año
const fechaValida = /^[0-9]{1,2}-[0-9]{1,2}-[0-9]{4}$/;

// validar correo electrónico
const correoValido = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

// validar edad: solo números
const edadValida = /^[0-9]{1,3}$/;

// Obtener el botón que disparará el evento
let btnRegistrar = document.getElementById("idBtnAgregar");

// Agregar el event Listener
btnRegistrar.addEventListener("click", function (e) {
  e.preventDefault();

  // obtener valores de los inputs
  let carnet = document.getElementById("inputCarnet").value;
  let nombre = document.getElementById("inputNombre").value;
  let dui = document.getElementById("inputDui").value;
  let nit = document.getElementById("inputNit").value;
  let fechaNac = document.getElementById("inputFecha").value;
  let correo = document.getElementById("inputCorreo").value;
  let edad = document.getElementById("inputEdad").value;

  // validación
  if (!carnetValido.test(carnet)) {
    mensaje.innerHTML =
      "El carnet no es válido. Sigue el formato de dos letras y tres números";
    toast.show();
    return;
  }
  if (!nombreValido.test(nombre)) {
    mensaje.innerHTML =
      "El nombre no es válido. Debes escribir nombre y apellido";
    toast.show();
    return;
  }
  if (!duiValido.test(dui)) {
    mensaje.innerHTML = "El DUI no es válido. Sigue el formato ########-#";
    toast.show();
    return;
  }
  if (!nitValido.test(nit)) {
    mensaje.innerHTML =
      "El NIT no es válido. Sigue el formato ####-######-###-#";
    toast.show();
    return;
  }
  if (!fechaValida.test(fechaNac)) {
    mensaje.innerHTML =
      "La fecha de nacimiento no es válido. Sigue el formato día, mes y año";
    toast.show();
    return;
  }
  if (!correoValido.test(correo)) {
    mensaje.innerHTML =
      "El correo electrónico no es válido. Utiliza una dirección de correo válida.";
    toast.show();
    return;
  }
  if (!edadValida.test(edad)) {
    mensaje.innerHTML = "La edad no es válido. Inserta una edad válida";
    toast.show();
    return;
  }

  mensaje.innerHTML = "Validación completada. Registro exitoso";
  notificacion.classList.replace("text-bg-danger", "text-bg-sucess");

  toast.show();
});
