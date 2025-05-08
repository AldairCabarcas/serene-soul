// Seleccionamos el formulario donde se enviarán los datos.
const formulario = document.getElementById("formulario");

// Escuchamos el evento de submit (enviar el formulario) para ejecutar la función asociada.
formulario.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita que el formulario se envíe de manera tradicional (recarga la página).

  // Obtenemos los valores de los campos del formulario.
  const nombre = document.getElementById("campo-nombre").value;
  const apellido = document.getElementById("campo-apellido").value;
  const correo = document.getElementById("campo-correo").value;
  
  // Obtenemos la fecha de nacimiento (día, mes y año).
  const dia = document.getElementById("fecha-dia").value;
  const mes = document.getElementById("fecha-mes").value;
  const año = document.getElementById("fecha-año").value;

  // Verificamos cuál opción de género ha sido seleccionada.
  const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
  const genero = generoSeleccionado ? generoSeleccionado.value : ""; // Si no selecciona ningún género, se deja vacío.

  // Si se ha seleccionado "personalizado" en el género, obtenemos los valores adicionales.
  const pronombre = document.getElementById("pronombre")?.value || null;
  const generoPersonalizadoInput = document.getElementById("generoPersonalizado")?.value || null;
  const generoPersonalizado = genero === "personalizado" ? generoPersonalizadoInput : null;

  // Obtenemos la contraseña.
  const contrasena = document.getElementById("campo-contraseña").value;

  // Formateamos la fecha de nacimiento para que sea en formato YYYY-MM-DD.
  const fechaNacimiento = `${año}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;

  // Validamos si los campos obligatorios están completos.
  if (!nombre || !apellido || !correo || !fechaNacimiento || !contrasena) {
    alert("Por favor, completa todos los campos obligatorios.");
    return; // Si falta algún campo, no seguimos con el envío del formulario.
  }

  // Validamos el formato del correo electrónico con una expresión regular.
  const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regexCorreo.test(correo)) {
    alert("Por favor, ingresa un correo electrónico válido.");
    return; // Si el correo no es válido, no seguimos con el envío del formulario.
  }

  // Validamos la longitud mínima de la contraseña (al menos 8 caracteres).
  if (contrasena.length < 8) {
    alert("La contraseña debe tener al menos 8 caracteres.");
    return; // Si la contraseña es muy corta, no seguimos con el envío.
  }

  // Validamos que la fecha de nacimiento sea anterior a la fecha actual.
  const fechaActual = new Date();
  const fechaNacimientoDate = new Date(fechaNacimiento);
  if (fechaNacimientoDate >= fechaActual) {
    alert("La fecha de nacimiento debe ser anterior a la fecha actual.");
    return; // Si la fecha de nacimiento no es válida, no seguimos con el envío.
  }

  // Creamos un objeto con los datos a enviar al servidor.
  const datos = {
    nombre,
    apellido,
    correo,
    fechaNacimiento,
    genero,
    pronombre,
    generoPersonalizado,
    contrasena,
  };

  // Intentamos enviar los datos al servidor usando fetch.
  try {
    const respuesta = await fetch("https://serene-soul.up.railway.app/registrar", {
      method: "POST", // Usamos el método POST para enviar los datos.
      headers: {
        "Content-Type": "application/json", // Indicamos que estamos enviando JSON.
      },
      body: JSON.stringify(datos), // Convertimos el objeto 'datos' a JSON.
    });

    const resultado = await respuesta.json(); // Convertimos la respuesta en formato JSON.
    alert(resultado.mensaje); // Mostramos el mensaje de la respuesta del servidor (éxito o error).
  } catch (error) {
    console.error("Error:", error); // En caso de error en la conexión o en el servidor, mostramos el error.
  }
});

// Selección dinámica de días de nacimiento (1-31)
const dia = document.getElementById("fecha-dia");
for (let i = 1; i <= 31; i++) {
  const option = document.createElement("option"); // Creamos una nueva opción para cada día.
  option.value = i;
  option.textContent = i;
  dia.appendChild(option); // Añadimos la opción al select de días.
}

// Selección dinámica de años de nacimiento (1900-2024)
const año = document.getElementById("fecha-año");
for (let i = 1900; i < 2025; i++) {
  const option = document.createElement("option"); // Creamos una nueva opción para cada año.
  option.value = i;
  option.textContent = i;
  año.appendChild(option); // Añadimos la opción al select de años.
}

// Lógica para mostrar el campo de género personalizado si el usuario lo selecciona.
const radioPersonalizado = document.getElementById("radio-personalizado");
const radioGenero = document.querySelectorAll('input[name="genero"]');
const opcionPersonalizado = document.getElementById("opcion-personalizado-extra");

// Agregamos un 'listener' para cada opción de género.
radioGenero.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radioPersonalizado.checked) {
      // Si el radio de "personalizado" está seleccionado, mostramos los campos adicionales.
      opcionPersonalizado.classList.remove("oculto");
      opcionPersonalizado.style.display = "flex";
    } else {
      // Si no, los ocultamos.
      opcionPersonalizado.classList.add("oculto");
      opcionPersonalizado.style.display = "none";
    }
  });
});
