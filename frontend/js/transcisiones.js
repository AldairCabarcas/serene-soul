document.querySelector(".cerrar-sesion").addEventListener("click", (e) => {
    e.preventDefault(); // Evita que el enlace cambie de página de inmediato
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = 0;

    setTimeout(() => {
      window.location.href = e.target.href; // Redirige después de la animación
    }, 500);
  });


