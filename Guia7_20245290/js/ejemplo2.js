// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aqui se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];
const buttonEnviar = document.forms["frmRegistro"].elements["btnEnviar"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// Recorrer el formulario
const recorrerFormulario = function () {
  let totText = 0;
  let totRadio = 0;
  let totCheck = 0;
  let totDate = 0;
  let totSelect = 0;
  let totFile = 0;
  let totPass = 0;
  let totEmail = 0;

  // Recorriendo elementos del formulario
  let elementos = formulario.elements;
  let totalElementos = elementos.length;

  for (let index = 0; index < totalElementos; index++) {
    // Accediendo a cada hijo del formulario
    let elemento = elementos[index];

    // verificando el tipo de control en el formulario
    let tipoElemento = elemento.type;
    // verificando el tipo de nodo
    let tipoNode = elemento.nodeName;

    // Contabilizando el total de INPUT TYPE = TEXT
    if (tipoElemento == "text" && tipoNode == "INPUT") {
      console.log(elemento);
      totText++;
    }
    // Contabilizando el total de INPUT TYPE = PASSWORD
    else if (tipoElemento == "password" && tipoNode == "INPUT") {
      console.log(elemento);
      totPass++;
    }
    // Contabilizando el total de INPUT TYPE = EMAIL
    else if (tipoElemento == "email" && tipoNode == "INPUT") {
      console.log(elemento);
      totEmail++;
    }
    // Contabilizando el total de INPUT TYPE - RADIO
    else if (tipoElemento == "radio" && tipoNode == "INPUT") {
      console.log(elemento);
      totRadio++;
    }
    // Contabilizando el total de INPUT TYPE = CHECKBOX
    else if (tipoElemento == "checkbox" && tipoNode == "INPUT") {
      console.log(elemento);
      totCheck++;
    }
    // Contabilizando el total de INPUT TYPE = FILE
    else if (tipoElemento == "file" && tipoNode == "INPUT") {
      console.log(elemento);
      totFile++;
    }
    // Contabilizando el total de INPUT TYPE - CHECKBOX
    else if (tipoElemento == "date" && tipoNode == "INPUT") {
      console.log(elemento);
      totDate++;
    }
    // Contabilizando el total de INPUT TYPE = EMAIL
    else if (tipoNode == "SELECT") {
      console.log(elemento);
      totSelect++;
    }
  }

  let resultado = `
Total de input[type="text"] = ${totText}<br>
Total de input[type="password"] = ${totPass}<br>
Total de input[type="radio"] = ${totRadio}<br>
Total de input[type="checkbox"] = ${totCheck}<br>
Total de input[type="date"] = ${totDate}<br>
Total de input[type="email"] = ${totEmail}<br>
Total de select = ${totSelect}<br>
`;
  bodyModal.innerHTML = resultado;
  //Funcion que permite mostrar el modal de Bootstrap
  //Esta funcion es definida por Bootstrap
  modal.show();
};

// eventos
button.onclick = (event) => {
  recorrerFormulario();
};

buttonEnviar.onclick = (event) => {
  if (verificarDatos(event)) {
    crearTabla();
    formulario.reset();
  }
};

// Valide que los campos umplan con los requerimientos
function verificarDatos(event) {
  if (!validarCamposVacios()) return false;
  if (!validarFecha()) return false;
  if (!validarCorreo()) return false;
  if (!validarIntereses()) return false;
  if (!validarCarrera()) return false;
  if (!validarPais()) return false;
  return true;
}

function validarCamposVacios() {
  // validar campos completos
  arrayElements = formulario.elements;
  for (let i = 0; i < arrayElements.length; i++) {
    let element = arrayElements[i];
    if (
      element.type === "text" ||
      element.type === "password" ||
      element.nodeName === "SELECT" ||
      element.type === "date" ||
      element.type === "file"
    ) {
      if (element.value.trim() === "") {
        alert("Complete toda la información");
        element.focus();
        return false;
      }
    }
  }
  return true;
}

function validarFecha() {
  //Valide que la fecha de nacimiento no supere la fecha actual.
  const inputFecha = document.getElementById("idFechaNac");
  let fechaSeleccion = new Date(inputFecha.value);
  const fechaHoy = new Date();
  if (inputFecha) {
    if (fechaSeleccion > fechaHoy) {
      alert("La fecha no es válida. Debe ser menor a la actual");
      return false;
    }
  }
  return true;
}

function validarCorreo() {
  // Utilice expresiones regulares para validar el campo correo electrónico.
  const correoValido = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  let correoInput = document.getElementById("idCorreo");
  if (!correoValido.test(correoInput.value)) {
    alert(
      "El correo electrónico no es válido. Utiliza una dirección de correo válida."
    );
    correoInput.focus();
    return false;
  }
  return true;
}

function validarPass() {
  // Valide que los campos contraseña y repetir contraseña, sean iguales.
  let contraseña = document.getElementById("idPassword").value;
  let contraseñaRepetir = document.getElementById("idPasswordRepetir");

  if (contraseña !== contraseñaRepetir.value) {
    alert("Las contraseñas no son iguales.");
    contraseñaRepetir.focus();
    return false;
  }
  return true;
}

function validarIntereses() {
  // Verifique que debe estar seleccionada al menos una opción para “algunos intereses”.
  let intereses = formulario.querySelectorAll("input[type='checkbox']:checked");

  if (intereses.length === 0) {
    alert("Seleccione al menos un interés");
    return false;
  }
  return true;
}

function validarCarrera() {
  // Verifique que el usuario seleccione una carrera.
  let carrera = formulario.querySelector("input[name='idRdCarrera']:checked");

  if (!carrera) {
    alert("Selecciona una carrera");
    return false;
  }
  return true;
}

function validarPais() {
  // Verifique que sea seleccionado un país de origen.
  let pais = document.getElementById("idCmPais");
  if (pais && pais.value === "") {
    alert("Selecciona un país de origen");
    return false;
  }
  return true;
}

function crearTabla() {
  while (bodyModal.firstChild) {
    bodyModal.removeChild(bodyModal.firstChild);
  }

  const tabla = document.createElement("table");
  tabla.className = "table table-bordered";

  const tbody = document.createElement("tbody");

  const fila = (titulo, valor) => {
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    td1.textContent = titulo;
    td1.style.fontWeight = "bold";
    td2.textContent = valor;

    tr.appendChild(td1);
    tr.appendChild(td2);
    tbody.appendChild(tr);
  };
  const datos = {
    nombres: document.getElementById("idNombre").value,
    apellidos: document.getElementById("idApellidos").value,
    fecha: document.getElementById("idFechaNac").value,
    correo: document.getElementById("idCorreo").value,
    intereses: Array.from(
      document.querySelectorAll("input[type='checkbox']:checked")
    ).map((i) => i.nextElementSibling.textContent.trim()),
    carrera: formulario
      .querySelector("input[name='idRdCarrera']:checked")
      ?.nextElementSibling.textContent.trim(),
    pais: document.getElementById("idCmPais").selectedOptions[0].text,
    avatar: document.getElementById("idArchivo").value,
  };

  fila("Nombres: ", datos.nombres);
  fila("Apellidos: ", datos.apellidos);
  fila("Fecha de nacimiento: ", datos.fecha);
  fila("Correo electrónico: ", datos.correo);
  fila("Intereses: ", datos.intereses.join(", "));
  fila("Carrera: ", datos.carrera);
  fila("País: ", datos.pais);
  fila("Avatar: ", datos.avatar);

  tabla.appendChild(tbody);
  bodyModal.appendChild(tabla);
  modal.show();
}
