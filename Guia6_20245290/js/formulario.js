const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");
const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");
const notificacion = document.getElementById("idNotificacion");

const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

const idModal = document.getElementById("idModal");

let arrayPaciente = [];

const limpiarForm = () => {
  inputNombre.value = "";
  inputApellido.value = "";
  inputFechaNacimiento.value = "";
  inputRdMasculino.checked = false;
  inputRdFemenino.checked = false;
  cmbPais.value = 0;
  inputDireccion.value = "";
  inputNombrePais.value = "";
  inputNombre.focus();
};

const addPaciente = function () {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value;

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    arrayPaciente.push(
      new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
    );

    mensaje.innerHTML = "Se ha registrado un nuevo paciente";

    toast.show();

    limpiarForm();
  } else {
    mensaje.innerHTML = "Faltan campos por completar";

    toast.show();
  }
};

function imprimirFilas() {
  let $fila = "";
  let contador = 1;

  arrayPaciente.forEach((element) => {
    $fila += `<tr>
<td scope="row" class="text-center fw-bold">${contador}</td>
<td>${element[0]}</td>
<td>${element[1]}</td>
<td>${element[2]}</td>
<td>${element[3]}</td>
<td>${element[4]}</td>
<td>${element[5]}</td>
<td>
<button id="idBtnEditar${contador}" type="button" class="btn btn-primary" alt="Eliminar" onclick="editar(this.id)">
<i class="bi bi-pencil-square"></i>
</button>
<button id="idBtnEliminar${contador}" type="button" class="btn btn-danger" alt="Editar" onclick="eliminar(this.id)">
<i class="bi bi-trash3-fill"></i>
</button>
</td>
</tr>`;
    contador++;
  });
  return $fila;
}
const imprimirPacientes = () => {
  let $table = `<div class="table-responsive">
<table class="table table-striped table-hover table-bordered">
<tr>
<th scope="col" class="text-center" style="width:5%">#</th>
<th scope="col" class="text-center" style="width:15%">Nombre</th>
<th scope="col" class="text-center" style="width:15%">Apellido</th>
<th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
<th scope="col" class="text-center" style="width:10%">Sexo</th>
<th scope="col" class="text-center" style="width:10%">Pais</th>
<th scope="col" class="text-center" style="width:25%">Dirección</th>
<th scope="col" class="text-center" style="width:10%">Opciones</th>
</tr>
${imprimirFilas()}
</table>
</div>`;
  document.getElementById("idTablaPacientes").innerHTML = $table;
};

let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
  let paisNew = inputNombrePais.value;

  if (paisNew != "") {
    let option = document.createElement("option");
    option.textContent = paisNew;
    option.value = contadorGloba10ption + 1;

    cmbPais.appendChild(option);

    mensaje.innerHTML = "Pais agregado correctamente";
    toast.show();
  } else {
    mensaje.innerHTML = "Faltan campos por completar";
    toast.show();
  }
};

// ELIMINAR PACIENTE

// Calcular indice que eliminaremos
function calcularIndiceEliminar(btnId) {
  if (btnId.indexOf("idBtnEliminar") === 0) {
    const contadorBtnEliminar = parseInt(btnId.replace("idBtnEliminar", ""));
    const indexEliminar = contadorBtnEliminar - 1;
    return indexEliminar;
  }
  return -1;
}

// función para confirmar antes de eliminar el paciente dado un ID
function eliminar(btnId) {
  const indexEliminar = calcularIndiceEliminar(btnId);
  if (indexEliminar !== -1 && confirm("¿Deseas eliminar este paciente?")) {
    delPaciente(indexEliminar);
  }
}
//

// función que elimina el paciente
function delPaciente(indexEliminar) {
  arrayPaciente.splice(indexEliminar, 1);
  imprimirPacientes();
  mensaje.innerHTML = "Paciente eliminado";
  toast.show();
}

// EDITAR PACIENTE

// Calcular indice que editaremos
let edicionPaciente = null;
function calcularIndiceEditar(btnId) {
  if (btnId.indexOf("idBtnEditar") === 0) {
    const contadorBtnEditar = parseInt(btnId.replace("idBtnEditar", ""));
    if (isNaN(contadorBtnEditar)) return -1;
    const indexEditar = contadorBtnEditar - 1;
    return indexEditar;
  }
  return -1;
}

// Colocar los datos en el formulario del paciente que se desea editar
function colocarDatosFormulario(pacienteDatos) {
  inputNombre.value = pacienteDatos[0];
  inputApellido.value = pacienteDatos[1];
  inputFechaNacimiento.value = pacienteDatos[2];
  inputRdFemenino.checked = pacienteDatos[3] === "Mujer";
  inputRdMasculino.checked = pacienteDatos[3] === "Hombre";
  inputDireccion.value = pacienteDatos[5];
  let labelPais = pacienteDatos[4];
  for (let i = 0; i < cmbPais.options.length; i++) {
    if (cmbPais.options[i].text === labelPais) {
      cmbPais.value = cmbPais.options[i].value;
      break;
    }
  }

  inputNombre.focus();
}

// Obtener el id del botón para manejar los datos del cliente, cambiando el botón para edición
function editar(btnId) {
  const indexEditar = calcularIndiceEditar(btnId);
  if (indexEditar !== -1) {
    const datos = arrayPaciente[indexEditar];
    edicionPaciente = indexEditar;
    colocarDatosFormulario(datos);

    mensaje.innerHTML = "";
    toast.hide();
    buttonAgregarPaciente.innerHTML = `<i class= "bi bi-arrow-clockwise"></i> Actualizar paciente`;
    buttonAgregarPaciente.onclick = editPaciente;
  } else {
    mensaje.innerHTML = "Error al editar al paciente";
    toast.show();
  }
}

// Validación y actualización del paciente
function editPaciente() {
  let nombre = inputNombre.value;
  let apellido = inputApellido.value;
  let fechaNacimiento = inputFechaNacimiento.value;
  let sexo =
    inputRdMasculino.checked == true
      ? "Hombre"
      : inputRdFemenino.checked == true
      ? "Mujer"
      : "";
  let pais = cmbPais.value;
  let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
  let direccion = inputDireccion.value;

  if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
  ) {
    if (edicionPaciente !== null) {
      arrayPaciente[edicionPaciente] = new Array(
        nombre,
        apellido,
        fechaNacimiento,
        sexo,
        labelPais,
        direccion
      );
      mensaje.innerHTML = "Paciente actualizado";
      toast.show();
      limpiarForm();
      imprimirPacientes();
      edicionPaciente = null;
      buttonAgregarPaciente.innerHTML = `<i class= "bi bi-person-plus-fill"></i> Guardar paciente`;
      buttonAgregarPaciente.onclick = addPaciente;
    } else {
      mensaje.innerHTML = "Faltan campos por completar";
      toast.show();
    }
  }
}

buttonLimpiarPaciente.onclick = () => {
  limpiarForm();
};
buttonAgregarPaciente.onclick = () => {
  addPaciente();
};
buttonMostrarPaciente.onclick = () => {
  imprimirPacientes();
};
buttonAgregarPais.onclick = () => {
  addPais();
};

idModal.addEventListener("shown.bs.modal", () => {
  inputNombrePais.value = "";
  inputNombrePais.focus();
});

limpiarForm();
