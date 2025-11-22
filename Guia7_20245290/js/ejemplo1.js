const newForm = document.getElementById("idNewForm");

const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElement");

const cmbElemento = document.getElementById("idCmbElemento");

const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// funciones
const verificarTipoElemento = function () {
  let elemento = cmbElemento.value;

  if (elemento != "") {
    modal.show();
  } else {
    alert("Debe seleccionar el elemento que se creará");
  }
};

const newSelect = function () {
  // validamos si ya existe el id
  if (validarId()) {
    return;
  }

  // Si no existe, es decir, retorna falso

  let addElemento = document.createElement("select");

  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("class", "form-select");
  for (let i = 1; i <= 10; i++) {
    let addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Opcion ${i}`;
    addElemento.appendChild(addOption);
  }

  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);

  labelElemento.textContent = tituloElemento.value;

  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  let divElemento = document.createElement("div");

  divElemento.setAttribute("class", "form-floating");

  divElemento.appendChild(addElemento);

  divElemento.appendChild(labelElemento);

  insertarForm(labelId, divElemento);
};

const newRadioCheckbox = function (newElemento) {
  // validamos si ya existe el id
  if (validarId()) {
    return;
  }

  // Si no existe, es decir, retorna falso
  let addElemento = document.createElement("input");

  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);
  addElemento.setAttribute("class", "form-check-input");

  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);

  labelElemento.textContent = tituloElemento.value;

  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  let divElemento = document.createElement("div");

  divElemento.setAttribute("class", "form-check");

  divElemento.appendChild(addElemento);

  divElemento.appendChild(labelElemento);

  insertarForm(labelId, divElemento);
};

const newInput = function (newElemento) {
  // validamos si ya existe el id
  if (validarId()) {
    return;
  }

  // Si no existe, es decir, retorna falso
  // Creando elementos de tipo - text, number, date y password
  let addElemento =
    newElemento == "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

  //creando atributos para el nueveo elemento
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);

  if (newElemento === "color") {
    addElemento.setAttribute("class", "form-control form-control-color");
  } else {
    addElemento.setAttribute("class", "form-control");
  }
  addElemento.setAttribute("placeholder", tituloElemento.value);

  //creando label para el nuevo control
  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);

  //creando icono para Sel label
  let iconLabel = document.createElement("i");
  iconLabel.setAttribute("class", "bi bi-tag");

  //creando texto para label
  labelElemento.textContent = tituloElemento.value;

  //creando el elemento i como hijo del label, afterbegin le
  // indicamos que se creara entes de su primer hijo
  labelElemento.insertAdjacentElement("afterbegin", iconLabel);

  //Creando label de id
  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  // Creando plantilla de bootstrap para visualizar el nuevo elemento
  let divElemento = document.createElement("div");

  // Agregando atributos
  if (newElemento === "color") {
    divElemento.setAttribute("class", "mb-3");
    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);
    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);
  } else {
    divElemento.setAttribute("class", "form-floating mb-3");

    //Creando el input que sera hijo del div
    divElemento.appendChild(addElemento);

    //Creando el label que sera hijo del div
    divElemento.appendChild(labelElemento);
  }

  insertarForm(labelId, divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
  verificarTipoElemento();

  if (!document.getElementById("btnEnviar")) {
    const btnEnviar = document.createElement("button");
    btnEnviar.id = "btnEnviar";
    btnEnviar.className = "btn btn-primary";
    btnEnviar.textContent = "Enviar formulario";

    // Agregamos evento al botón enviar
    btnEnviar.addEventListener("click", verificarDatos);
    newForm.appendChild(btnEnviar);
  }
};

buttonAddElemento.onclick = () => {
  if (nombreElemento.value != "" && tituloElemento.value != "") {
    let elemento = cmbElemento.value;

    if (elemento == "select") {
      newSelect();
    } else if (elemento == "radio" || elemento == "checkbox") {
      newRadioCheckbox(elemento);
    } else {
      newInput(elemento);
    }
  } else {
    alert("Faltan campos por completar");
  }
};

// Agregando evento para el modal de bootstrap
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
  // Limpiando campos para los nuevos elementos
  tituloElemento.value = "";
  nombreElemento.value = "";
  // inicializando puntero en el campo del titulo para el control
  tituloElemento.focus();
});

// EJERCICIO COMPLEMENTARIO

// Valide que el ID de los controles nuevos no se repita, muestre un mensaje adecuado al usuario
// haciéndole saber que no es permitido controles con el mismo ID

function validarId() {
  // elemento que ingresó el usuario
  let idInput = "id" + document.getElementById("idNombreElemento").value;
  // buscamos en los id's en el DOM
  let idEncontrado = document.getElementById(idInput);
  // Si existe
  if (idEncontrado != null) {
    alert("El ID (nombre) ya existe, intenta con uno nuevo.");
    idExistente = true;
    return true;
  }
  // si no existe
  else {
    return false;
  }
}

// Cree un botón que permite validar la información de los nuevos controles agregados al
//formulario. Esta validación solamente incluirá campos llenos y opciones seleccionadas (radio,
//scheckbox y select).

//seleccionamos todos los inputs
function verificarDatos(event) {
  if (event) event.preventDefault();

  let campoVacio = false;
  arrayElements = newForm.querySelectorAll("input, select, textarea");

  for (let element of arrayElements) {
    if (element.type === "submit" || element.type === "button") continue;

    if (element.type === "checkbox" || element.type === "radio") {
      if (!element.checked) {
        campoVacio = true;
      }
    } else {
      if (element.value === "") {
        campoVacio = true;
      }
    }
  }
  if (campoVacio) {
    alert("Hay campos vacíos o sin seleccionar");
  } else {
    alert("Datos completos");
    newForm.innerHTML = "";
  }
}

// funcion para insertar div
const insertarForm = function (labelId, divElemento) {
  const btnEnviar = document.getElementById("btnEnviar");

  if (btnEnviar) {
    newForm.insertBefore(labelId, btnEnviar);
    newForm.insertBefore(divElemento, btnEnviar);
  } else {
    newForm.appendChild(labelId);
    newForm.appendChild(divElemento);
  }
};
