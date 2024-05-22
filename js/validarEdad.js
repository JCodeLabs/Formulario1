// Función principal para validar si el usuario es mayor de edad.
export default function esMayorDeEdad(campo) {

  const fechaNacimiento = new Date(campo.value); // Convierte el valor del campo (que se espera sea una fecha) en un objeto Date.

  // Verifica si la fecha de nacimiento corresponde a una persona mayor de edad.
  if (!validarEdad(fechaNacimiento)) {
    campo.setCustomValidity('Necesitas ser mayor de edad.'); // Indica que la validación personalizada no pasó.
  } else {
    campo.setCustomValidity(''); // Indica que la validación personalizada pasó.
  }
}

// Función auxiliar para validar si una fecha corresponde a una persona mayor de 18 años.
function validarEdad(fecha) {

  const fechaActual = new Date(); // Obtiene la fecha actual.

  const fechaMas18 = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate()); // Calcula la fecha de cuando la persona cumplirá 18 años.

  return fechaActual >= fechaMas18; // Retorna true si la fecha actual es igual o posterior a la fecha de los 18 años.
}
