// Importación de funciones de validación desde archivos externos
import esUnCuil from "./validarCuil.js";
import esMayorDeEdad from "./validarEdad.js";
import { typesOfErrors, errorMessages } from "./customErrors.js";

// Selección de todos los campos de formulario que son requeridos
const camposDeFormulario = document.querySelectorAll("[required]");

// Selección del formulario principal
const formulario = document.querySelector("[data-formulario]");

// Evento para manejar el envío del formulario
formulario.addEventListener("submit", (evento) => {

  evento.preventDefault(); // Evita que el formulario se envíe automáticamente

  // Guarda los valores de los campos en un objeto y los almacena en el localStorage
  const listaRespuestas = {
    nombre: evento.target.elements["nombre"].value,
    email: evento.target.elements["email"].value,
    identificacion: evento.target.elements["identificacion"].value,
    cuil: evento.target.elements["cuil"].value,
    fecha_nacimiento: evento.target.elements["fecha_nacimiento"].value,
  };
  localStorage.setItem("registro", JSON.stringify(listaRespuestas));

  // Redirecciona a otra página después de enviar el formulario
  window.location.href = "abrir-cuenta-form-2.html";
});

// Evento para manejar la validación de los campos de formulario
camposDeFormulario.forEach((campo) => {
  campo.addEventListener("invalid", (evento) => evento.preventDefault()); // Evita que se muestre el mensaje de error predeterminado del navegador para campos requeridos
  campo.addEventListener("blur", () => verificarCampo(campo)); // Evento para verificar el campo cuando pierde el foco
});


// Función para verificar el estado de validación de un campo de formulario
function verificarCampo(campo) {
  let mensaje = ""; // Variable para almacenar el mensaje de error personalizado
  campo.setCustomValidity(""); // Establece la validación personalizada como válida por defecto

  // Verifica si el campo es de tipo "cuil" y tiene al menos 11 caracteres
  if (campo.name == "cuil" && campo.value.length >= 11) {
    esUnCuil(campo);
  }

  // Verifica si el campo es de tipo "fecha_nacimiento" y no está vacío
  if (campo.name == "fecha_nacimiento" && campo.value != "") {
    esMayorDeEdad(campo);
  }

  // Itera sobre los tipos de errores definidos para el campo
  typesOfErrors.forEach((error) => {
    // Verifica si el campo tiene un error del tipo actual
    if (campo.validity[error]) {
      // Obtiene el mensaje de error correspondiente al tipo de error y campo
      mensaje = errorMessages[campo.name][error];
    }
  });

  // Busca el elemento que mostrará el mensaje de error asociado al campo
  const mensajeError = campo.parentNode.querySelector(".message__error");

  // Verifica si el campo es válido según las restricciones de validación HTML5
  const validarInputCheck = campo.checkValidity();

  // Muestra el mensaje de error en el elemento correspondiente si el campo no es válido
  if (!validarInputCheck) {
    mensajeError.textContent = mensaje;
  } else {
    mensajeError.textContent = ""; // Borra el mensaje de error si el campo es válido
  }
}