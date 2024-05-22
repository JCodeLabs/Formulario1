/*======================================================================
Tipos de errores de validación:

1. valueMissing: Error cuando un campo requerido está vacío.

2. typeMismatch: Error cuando el tipo de dato ingresado no coincide con el tipo esperado (por ejemplo, un email mal formado).

3. patternMismatch: Error cuando el valor no coincide con el patrón especificado (regex).

4. tooShort: Error cuando el valor es demasiado corto.

5. customError: Error personalizado definido por el desarrollador. El desarrollador puede crear una validación adicional de un campo y en caso de que la validación pase, mostrara el error personalizado
======================================================================*/

// Definimos un array con los diferentes tipos de errores de validación que podemos manejar.
export const typesOfErrors = [
  "valueMissing",
  "typeMismatch",
  "patternMismatch",
  "tooShort",
  "customError",
];

// Definimos un objeto que contiene los mensajes de error específicos para cada campo de entrada.
export const errorMessages = {
  nombre: {
    valueMissing: "El campo nombre no puede estar vacío.",
    patternMismatch: "Por favor, ingrese un nombre válido.",
    tooShort: "El campo no tiene caracteres suficientes.",
  },
  email: {
    valueMissing: "El campo email no puede estar vacío.",
    typeMismatch: "Por favor, ingrese un email válido.",
    tooShort: "Por favor, ingrese un e-mail válido.",
  },
  identificacion: {
    valueMissing: "El campo identificación no puede estar vacío.",
    patternMismatch: "Por favor, ingrese un número de identificación válido.",
    tooShort: "El campo no tiene caracteres suficientes.",
  },
  cuil: {
    valueMissing: "El campo cuil/cuit no puede estar vacío.",
    patternMismatch: "Por favor, ingrese un cuil/cuit válido.",
    customError: "El cuil/cuit ingresado no existe.",
    tooShort: "El campo no tiene caracteres suficientes.",
  },
  fecha_nacimiento: {
    valueMissing: "El campo fecha nacimiento no puede estar vacío.",
    customError: "Debes ser mayor de 18 años para registrarte.",
  },
  terminos: {
    valueMissing: "Debes aceptar los términos antes de continuar.",
  },
};