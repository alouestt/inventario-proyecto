$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const $loginForm = $("#loginForm");
    const $usuarioInput = $("#usuario");
    const $passwordInput = $("#password");
    const $loginBtn = $("#loginBtn");
    const $inputFields = $(".input-field");
    const $inputWrappers = $(".input-wrapper");

    /* ===================================================
       CONSTANTES
    =================================================== */

    const COLOR_FOCUS = "#6f41ca";
    const COLOR_BLUR = "#8f8f8f";
    const KEY_ENTER = 13;
    const REDIRECT_URL = "pages/gestionar-productos.html";

    /* ===================================================
       FUNCIONES DE VALIDACIÓN
    =================================================== */

    /**
     * Valida los campos del formulario de login
     * @returns {boolean} True si son válidos
     */
    function validateLoginForm() {
        const usuario = $usuarioInput.val().trim();
        const password = $passwordInput.val().trim();

        if (usuario === "" || password === "") {
            alert("Por favor, complete todos los campos");
            return false;
        }

        if (usuario.length < 3) {
            alert("El usuario debe tener al menos 3 caracteres");
            return false;
        }

        if (password.length < 4) {
            alert("La contraseña debe tener al menos 4 caracteres");
            return false;
        }

        return true;
    }

    /**
     * Limpia los campos del formulario
     */
    function clearLoginForm() {
        $usuarioInput.val("");
        $passwordInput.val("");
        resetInputStyles();
    }

    /**
     * Resetea los estilos de los inputs
     */
    function resetInputStyles() {
        $inputFields.removeClass("focus");
        $inputWrappers.css("border-color", COLOR_BLUR);
    }

    /* ===================================================
       EVENTOS - ENVÍO DE FORMULARIO
    =================================================== */

    /**
     * Evento: Submit del formulario de login
     * Valida datos y redirige al dashboard
     */
    $loginForm.on("submit", function (e) {
        e.preventDefault();

        if (!validateLoginForm()) {
            return;
        }

        clearLoginForm();
        alert("¡Inicio de sesión exitoso! Redirigiendo...");
        window.location.href = REDIRECT_URL;
    });

    /* ===================================================
       EVENTOS - TECLADO
    =================================================== */

    /**
     * Evento: Presionar Enter para enviar formulario
     */
    $usuarioInput.add($passwordInput).on("keypress", function (e) {
        if (e.which === KEY_ENTER) {
            $loginBtn.click();
        }
    });

    /* ===================================================
       EVENTOS - ESTILOS DINÁMICOS
    =================================================== */

    /**
     * Evento: Input recibe foco
     * Cambia color del borde a púrpura
     */
    $inputFields.on("focus", function () {
        $(this).addClass("focus");
        $(this).closest(".input-wrapper").css("border-color", COLOR_FOCUS);
    });

    /**
     * Evento: Input pierde foco
     * Restaura color del borde si está vacío
     */
    $inputFields.on("blur", function () {
        $(this).removeClass("focus");

        if ($(this).val().trim() === "") {
            $(this).closest(".input-wrapper").css("border-color", COLOR_BLUR);
        }
    });

    /**
     * Evento: Escribir en campo usuario
     * Valida longitud mínima
     */
    $usuarioInput.on("input", function () {
        const value = $(this).val().trim();

        if (value.length >= 3) {
            $(this).closest(".input-wrapper").css("border-color", COLOR_FOCUS);
        }
    });

    /**
     * Evento: Escribir en campo contraseña
     * Valida longitud mínima
     */
    $passwordInput.on("input", function () {
        const value = $(this).val().trim();

        if (value.length >= 4) {
            $(this).closest(".input-wrapper").css("border-color", COLOR_FOCUS);
        }
    });
});
