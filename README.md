# API de Validación de Formularios


## validity
En JavaScript, la propiedad `validity` es parte del API de validación de formularios HTML5. Está asociada a los elementos de formulario, como `<input>`, `<textarea>`, `<select>`, y proporciona información sobre el estado de validez del elemento.

La propiedad `validity` devuelve un objeto `ValidityState` que contiene varias propiedades booleanas que indican las diferentes condiciones de validez del elemento del formulario.

Aquí están las propiedades del objeto `ValidityState`:

`badInput`: Es `true` si el valor del elemento no corresponde con el tipo esperado (por ejemplo, un valor no numérico en un campo `type="number"`).

`customError`: Es `true` si el elemento tiene un error de validación personalizado configurado mediante el método `setCustomValidity`.

`patternMismatch`: Es `true` si el valor no coincide con el patrón especificado en el atributo `pattern` del elemento.

`rangeOverflow`: Es `true` si el valor es mayor que el valor máximo (`max`) especificado para el elemento.

`rangeUnderflow`: Es `true` si el valor es menor que el valor mínimo (`min`) especificado para el elemento.

`stepMismatch`: Es `true` si el valor es válido pero no coincide con el paso (`step`) establecido para el elemento.

`tooLong`: Es `true` si el valor excede el número máximo de caracteres (`maxlength`) permitido.

`tooShort`: Es `true` si el valor es menor que el número mínimo de caracteres (`minlength`) permitido.

`typeMismatch`: Es `true` si el valor no es del tipo esperado (por ejemplo, un correo electrónico en un campo `type="email"`).

`valid`: Es `true` si el valor del elemento es válido.

`valueMissing`: Es `true` si el elemento está vacío pero se requiere un valor (cuando el atributo `required` está presente).

Ejemplo de uso:

```html
<form id="myForm">
  <input type="text" id="myInput" pattern="\d+" required>
  <button type="submit">Submit</button>
</form>

<script>
  const input = document.getElementById('myInput');
  const form = document.getElementById('myForm');

  form.addEventListener('submit', function(event) {
    if (!input.validity.valid) {
      if (input.validity.valueMissing) {
        console.log('El campo es requerido.');
      } else if (input.validity.patternMismatch) {
        console.log('El valor no coincide con el patrón requerido.');
      }
      event.preventDefault(); // Evita el envío del formulario si hay errores de validación
    }
  });
</script>
```

## Uso de setCustomValidity

`setCustomValidity` permite definir un mensaje de error específico que invalidará el campo de formulario hasta que el error se corrija. Si se pasa una cadena vacía a `setCustomValidity`, se elimina el mensaje de error personalizado, y el campo se considera válido (a menos que otras restricciones lo invaliden).

Sintaxis:

```
element.setCustomValidity(message);

```

- `element`: El elemento del formulario al que se quiere aplicar el mensaje de error personalizado.

- `message`: Una cadena con el mensaje de error. Si es una cadena vacía (""), se elimina cualquier mensaje de error personalizado previamente establecido.

Ejemplo Práctico

Supongamos que tienes un formulario con un campo de entrada para un número de identificación y quieres validar que este número cumpla con ciertos criterios personalizados:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Validación Personalizada con setCustomValidity</title>
    <style>
        .error {
            color: red;
        }
    </style>
</head>
<body>
    <form id="myForm">
        <label for="identificacion">Número de Identificación:</label>
        <input type="text" id="identificacion" name="identificacion" required pattern="\d{8}">
        <span id="identificacionError" class="error"></span>
        <br><br>
        <button type="submit">Enviar</button>
    </form>

    <script>
        const form = document.getElementById('myForm');
        const identificacion = document.getElementById('identificacion');
        const identificacionError = document.getElementById('identificacionError');

        identificacion.addEventListener('input', function() {
            // Restablecer mensaje de error personalizado
            identificacion.setCustomValidity('');
            identificacionError.textContent = '';

            // Validar longitud del número de identificación
            if (identificacion.value.length !== 8) {
                identificacion.setCustomValidity('El número de identificación debe tener exactamente 8 dígitos.');
                identificacionError.textContent = identificacion.validationMessage;
            }
        });

        form.addEventListener('submit', function(event) {
            // Verificar si el campo es válido antes de enviar el formulario
            if (!identificacion.checkValidity()) {
                identificacionError.textContent = identificacion.validationMessage;
                event.preventDefault(); // Prevenir el envío del formulario si hay un error
            }
        });
    </script>
</body>
</html>
```

## checkValidity

El método `checkValidity` es parte de la API de Validación de Formularios de JavaScript y se utiliza para verificar si un formulario o un elemento de formulario cumple con todas las restricciones de validación definidas en el HTML, como los atributos `required`, `minlength`, `maxlength`, `pattern`, `min`, `max`, `step`, entre otros.

El método `checkValidity()` devuelve un valor booleano:

`true` si el campo es válido.
`false` si el campo no es válido.