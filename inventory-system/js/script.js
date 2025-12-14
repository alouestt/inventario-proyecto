<<<<<<< HEAD
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const $navLinks = $(".sidebar .link[data-target]");
    const $profileAvatar = $(".profile-avatar");

    /* ===================================================
       FUNCIONES PRINCIPALES
    =================================================== */

    /**
     * Marca el enlace de navegación activo según la página actual
     * Compara la ruta del navegador con los destinos de los enlaces
     */
    function setActiveLink() {
        const currentPath = window.location.pathname;

        $navLinks.each(function () {
            const $link = $(this);
            const targetPath = $link.data("target");

            if (!targetPath) {
                return true;
            }

            // Normalizar rutas para comparación
            const normalizedTarget = targetPath.toLowerCase();
            const normalizedCurrent = currentPath.toLowerCase();

            if (normalizedCurrent.includes(normalizedTarget)) {
                $navLinks.removeClass("active");
                $link.addClass("active");
            }
        });
    }

    /* ===================================================
       EVENTOS - NAVEGACIÓN DEL MENÚ LATERAL
    =================================================== */

    /**
     * Evento: Click en enlace de navegación
     * Redirige a la URL especificada en data-target
     */
    $navLinks.on("click", function () {
        const targetUrl = $(this).data("target");

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });

    /* ===================================================
       EVENTOS - PERFIL DE USUARIO
    =================================================== */

    /**
     * Evento: Click en avatar del usuario
     * Redirige a la página de inicio (logout)
     */
    $profileAvatar.on("click", function () {
        window.location.href = "../index.html";
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    setActiveLink();
});
=======
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const $navLinks = $(".sidebar .link[data-target]");
    const $profileAvatar = $(".profile-avatar");

    /* ===================================================
       FUNCIONES PRINCIPALES
    =================================================== */

    /**
     * Marca el enlace de navegación activo según la página actual
     * Compara la ruta del navegador con los destinos de los enlaces
     */
    function setActiveLink() {
        const currentPath = window.location.pathname;

        $navLinks.each(function () {
            const $link = $(this);
            const targetPath = $link.data("target");

            if (!targetPath) {
                return true;
            }

            // Normalizar rutas para comparación
            const normalizedTarget = targetPath.toLowerCase();
            const normalizedCurrent = currentPath.toLowerCase();

            if (normalizedCurrent.includes(normalizedTarget)) {
                $navLinks.removeClass("active");
                $link.addClass("active");
            }
        });
    }

    /* ===================================================
       EVENTOS - NAVEGACIÓN DEL MENÚ LATERAL
    =================================================== */

    /**
     * Evento: Click en enlace de navegación
     * Redirige a la URL especificada en data-target
     */
    $navLinks.on("click", function () {
        const targetUrl = $(this).data("target");

        if (targetUrl) {
            window.location.href = targetUrl;
        }
    });

    /* ===================================================
       EVENTOS - PERFIL DE USUARIO
    =================================================== */

    /**
     * Evento: Click en avatar del usuario
     * Redirige a la página de inicio (logout)
     */
    $profileAvatar.on("click", function () {
        window.location.href = "../index.html";
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    setActiveLink();
});
>>>>>>> 172b2fbaab5bd11460c024c7e4e6f41dfcad9b5b
