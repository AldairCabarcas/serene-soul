document.addEventListener("DOMContentLoaded", () => {
  // Si el usuario no está logueado, redirige al login
  if (localStorage.getItem("usuarioLogueado") !== "true") {
    window.location.href = "../frontend/login/login.html";
  }

  // === ELEMENTOS DEL DOM ===
  const menuToggle = document.getElementById("menu-toggle"); // Botón hamburguesa
  const menu = document.getElementById("menu"); // Contenedor del menú lateral
  const menuItems = document.querySelectorAll(".menu"); // Ítems del menú con submenú
  const perfil = document.getElementById("perfil"); // Contenedor del perfil
  const fotoPerfil = perfil.querySelector("a"); // Botón del perfil
  const submenuPerfil = perfil.querySelector(".submenu-perfil"); // Submenú del perfil
  const enlaceCerrarSesion = document.querySelector(".cerrar-sesion"); // Enlace de cerrar sesión

  // === FUNCIONES UTILITARIAS ===
  function cerrarTodosLosSubmenus() {
    document.querySelectorAll(".submenu-perfil").forEach((submenu) => {
      submenu.style.display = "none";
    });
    document.querySelectorAll(".menu").forEach((item) => {
      item.classList.remove("activo");
    });
    perfil.classList.remove("activo");
    submenuPerfil.style.display = "none";
  }

  function cerrarMenuHamburguesa() {
    menuToggle.classList.remove("activo");
    menu.classList.remove("activo");
    menuToggle.setAttribute("aria-expanded", "false");
  }

  // === BOTÓN HAMBURGUESA ===
  menuToggle.addEventListener("click", () => {
    cerrarTodosLosSubmenus(); // Cierra todo por si había algo abierto
    const isActive = menuToggle.classList.toggle("activo");
    menu.classList.toggle("activo", isActive);
    menuToggle.setAttribute("aria-expanded", isActive);

    if (!isActive) {
      cerrarTodosLosSubmenus();
    }
  });

  // === BOTÓN DEL PERFIL ===
  fotoPerfil.setAttribute("aria-haspopup", "true");

  // Abrir o cerrar el submenú al hacer clic en la foto de perfil
  fotoPerfil.addEventListener("click", (e) => {
    e.stopPropagation(); // Evita que el documento lo cierre inmediatamente
    const estaActivo = perfil.classList.contains("activo");

    // Cierra cualquier otro submenú abierto
    cerrarTodosLosSubmenus();

    if (!estaActivo) {
      perfil.classList.add("activo");
      submenuPerfil.style.display = "block";
      fotoPerfil.setAttribute("aria-expanded", "true");
    } else {
      perfil.classList.remove("activo");
      submenuPerfil.style.display = "none";
      fotoPerfil.setAttribute("aria-expanded", "false");
    }
    cerrarMenuHamburguesa(); 
  });

  // Cierra el submenú al hacer clic fuera de él
  document.addEventListener("click", (e) => {
    if (!perfil.contains(e.target)) {
      perfil.classList.remove("activo");
      submenuPerfil.style.display = "none";
      fotoPerfil.setAttribute("aria-expanded", "false");
    }
  });

  // Cierra el menú hamburguesa si se hace clic fuera de él
  document.addEventListener("click", (e) => {
    if (!menu.contains(e.target) && !perfil.contains(e.target) && !menuToggle.contains(e.target)) {
      cerrarTodosLosSubmenus();
      cerrarMenuHamburguesa();
    }
  });

  // === SUBMENÚS DE NAVEGACIÓN (solo en móviles) ===
  menuItems.forEach((item) => {
    if (item.querySelector(".submenu")) {
      const link = item.querySelector("a");
      const submenu = item.querySelector(".submenu");

      link.addEventListener("click", (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();

          // Cierra otros submenús
          menuItems.forEach((otherItem) => {
            if (otherItem !== item) {
              otherItem.classList.remove("activo");
              const otherSubmenu = otherItem.querySelector(".submenu");
              if (otherSubmenu) otherSubmenu.style.display = "none";
            }
          });

          // Alterna el submenú actual
          const isActive = item.classList.contains("activo");
          item.classList.toggle("activo");
          submenu.style.display = isActive ? "none" : "block";

          if (!isActive) {
            setTimeout(() => {
              submenu.scrollIntoView({ behavior: "smooth", block: "center" });
            }, 250); // Le da tiempo al submenu para expandirse antes de hacer scroll
          }
          
          
        }
      });
    }
  });

  // === CIERRE AUTOMÁTICO DEL MENÚ HAMBURGUESA EN DESKTOP ===
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      cerrarTodosLosSubmenus();
      cerrarMenuHamburguesa();
    }
  });

  // === CIERRA MENÚ SI SE HACE CLIC EN UN ENLACE (excepto submenús) ===
  document.querySelectorAll(".menu-navegacion a").forEach((link) => {
    link.addEventListener("click", function () {
      if (
        window.innerWidth <= 767 &&
        !this.parentElement.classList.contains("menu")
      ) {
        cerrarMenuHamburguesa();
      }
    });
  });

  // document.getElementById("cambiarFoto").addEventListener("change", function (e) {
  //   const archivo = e.target.files[0];
  //   if (archivo) {
  //     const urlTemp = URL.createObjectURL(archivo);
  //     document.getElementById("fotoPerfil").src = urlTemp;
  //   }
  // });

  // === CERRAR SESIÓN ===
  if (enlaceCerrarSesion) {
    enlaceCerrarSesion.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("usuarioLogueado");
      window.location.href = "../frontend/login/login.html";
    });
  }
});
