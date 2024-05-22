// Función principal para validar si un campo contiene un CUIL válido.
export default function esUnCuil(campo) {

  const cuil = campo.value.replace(/[ -\/]/g, ""); // Se elimina cualquier carácter no numérico del valor del campo.

  // Verifica si el CUIL contiene números repetidos.
  if (tieneNumerosRepetidos(cuil)) {
    campo.setCustomValidity("Valores Repetidos"); // Indica que la validación personalizada no paso.
  } else {
    if (validarPrefijoCuil(cuil) && validarDigitoVerificador(cuil)) {
      console.log("Cuil Valido");
    } else {
      console.log("Cuil No Existe");
      campo.setCustomValidity("Cuil No Existe"); // Indica que la validación personalizada no paso.
    }
  }
}

// Función auxiliar para verificar si el CUIL contiene números repetidos.
function tieneNumerosRepetidos(cuil) {
  const numerosRepetidos = [
    "00000000000",
    "11111111111",
    "22222222222",
    "33333333333",
    "44444444444",
    "55555555555",
    "66666666666",
    "77777777777",
    "88888888888",
    "99999999999",
  ];

  // Retorna true si el CUIL está en la lista de números repetidos.
  return numerosRepetidos.includes(cuil);
}

// Función auxiliar para validar el prefijo del CUIL.
function validarPrefijoCuil(cuil) {

  let prefijosValidos = cuil.substring(0, 2); // Extrae los dos primeros caracteres del CUIL.

  let prefijo = ["20", "23", "24", "27", "30", "33", "34"]; // Lista de prefijos válidos.

  return prefijo.includes(prefijosValidos); // Retorna true si el prefijo está en la lista de prefijos válidos.
}

// Función auxiliar para validar el dígito verificador del CUIL.
function validarDigitoVerificador(cuil) {

  const factores = ["5", "4", "3", "2", "7", "6", "5", "4", "3", "2"]; // Factores utilizados para calcular el dígito verificador.

  let acumulado = 0;

  // Calcula el valor acumulado multiplicando cada dígito del CUIL por su factor correspondiente.
  for (let i = 0; i < 10; i++) {
    acumulado += parseInt(cuil[i], 10) * factores[i];
  }

  // Calcula el dígito verificador teórico.
  let validadorTeorico = 11 - (acumulado % 11);

  // Ajusta el valor del dígito verificador teórico si es 11 o 10.
  if (validadorTeorico === 11) {
    validadorTeorico = 0;
  } else if (validadorTeorico === 10) {
    validadorTeorico = 9;
  }

  // Extrae el dígito verificador real del CUIL.
  const digitoVerificador = parseInt(cuil[10], 10);

  return digitoVerificador == validadorTeorico; // Compara el dígito verificador real con el teórico y retorna true si coinciden.
}
