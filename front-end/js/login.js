document.addEventListener("DOMContentLoaded", () => {
  const togglePassword = document.getElementById("toggle-login-password");
  const passwordInput = document.getElementById("login-contraseña");

  document.getElementById("form-login").addEventListener("submit", async (e) => {
    e.preventDefault();

    const correo = document.getElementById("login-correo").value.trim();
    const contrasena = passwordInput.value.trim();
    const mensajeError = document.getElementById("contraseñaIncorrecta");

    try {
      const respuesta = await fetch("https://servidor-serene-soul.up.railway.app/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const resultado = await respuesta.json();

      if (respuesta.ok) {
        mensajeError.classList.add("oculto");
        localStorage.setItem("usuarioLogueado", "true");
        window.location.href = "https://serene-soul.netlify.app/index.html"; // Redirige si todo está bien
      } else {
        // Mostrar errores personalizados según el estado
        if (respuesta.status === 404) {
          mensajeError.textContent = "Este correo no está registrado.";
        } else if (respuesta.status === 401) {
          mensajeError.textContent = "La contraseña es incorrecta.";
        } else {
          mensajeError.textContent = resultado.mensaje || "Error desconocido.";
        }
        mensajeError.classList.remove("oculto");
      }
    } catch (error) {
      console.log("Error", error);
      mensajeError.textContent = "Error del servidor. Intenta más tarde.";
      mensajeError.classList.remove("oculto");
    }
  });

  togglePassword.addEventListener("click", () => {
    const tipo = passwordInput.getAttribute("type") === "password" ? "text" : "password";
    passwordInput.setAttribute("type", tipo);
    togglePassword.textContent = tipo === "password" ? "👁️" : "🙈";
  });
});

