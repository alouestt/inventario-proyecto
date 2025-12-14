$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const form = $("#productForm");
    const btnGuardar = $("#btnGuardar");
    const btnCancelar = $("#btnCancelar");
    const confirmationModal = $("#confirmationModal");
    const successModal = $("#successModal");
    const btnSi = $("#btnSi");
    const btnNo = $("#btnNo");
    const btnRegresar = $("#btnRegresar");
    const pageHeader = $(".page-header h1");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let currentMode = "REGISTRO";
    let productIdToEdit = null;

    /* ===================================================
       FUNCIONES AUXILIARES DE VALIDACIÓN
    =================================================== */

    // Validadores simples
    const isRequired = (value) => value.length > 0;
    const isNumeric = (value) => /^\d+$/.test(value) && parseInt(value) >= 0;

    /**
     * Valida un campo individual del formulario
     * @param {string} fieldId - ID del campo
     * @param {string} errorId - ID del elemento de error
     * @param {function} validationFn - Función de validación
     * @param {string} message - Mensaje de error
     * @returns {boolean} True si es válido
     */
    function validateField(fieldId, errorId, validationFn, message) {
        const input = $("#" + fieldId);
        const errorSpan = $("#" + errorId);

        if (input.prop("disabled")) return true;

        const isValid = validationFn(input.val().trim());

        if (!isValid) {
            input.addClass("error-field");
            errorSpan.text(message);
        } else {
            input.removeClass("error-field");
            errorSpan.text("");
        }

        return isValid;
    }

    /**
     * Valida todos los campos del formulario
     * @returns {boolean} True si todos los campos son válidos
     */
    function validateForm() {
        let isFormValid = true;

        // Validar código
        if (
            !validateField(
                "codigo",
                "error-codigo",
                isRequired,
                "El código es obligatorio."
            )
        ) {
            isFormValid = false;
        }

        // Validar nombre
        if (
            !validateField(
                "nombre",
                "error-nombre",
                isRequired,
                "El nombre es obligatorio."
            )
        ) {
            isFormValid = false;
        }

        // Validar cantidad
        if (
            !validateField(
                "cantidad",
                "error-cantidad",
                isRequired,
                "La cantidad es obligatoria."
            ) ||
            !validateField(
                "cantidad",
                "error-cantidad",
                isNumeric,
                "La cantidad debe ser un número entero positivo."
            )
        ) {
            isFormValid = false;
        }

        // Validar stock mínimo
        if (
            !validateField(
                "stockMinimo",
                "error-stockMinimo",
                isRequired,
                "El stock mínimo es obligatorio."
            ) ||
            !validateField(
                "stockMinimo",
                "error-stockMinimo",
                isNumeric,
                "El stock mínimo debe ser un número entero positivo."
            )
        ) {
            isFormValid = false;
        }

        // Validar categoría
        const categoria = $("#categoria");
        if (categoria.val() === "") {
            categoria.addClass("error-field");
            $("#error-categoria").text("Debe seleccionar una categoría.");
            isFormValid = false;
        } else {
            categoria.removeClass("error-field");
            $("#error-categoria").text("");
        }

        return isFormValid;
    }

    /* ===================================================
       DETECCIÓN Y CARGA DE MODO EDICIÓN
    =================================================== */

    /**
     * Detecta si se abre en modo edición o registro
     * Consulta parámetros de URL
     */
    function checkEditMode() {
        const urlParams = new URLSearchParams(window.location.search);
        const action = urlParams.get("action");
        const id = urlParams.get("id");

        if (action === "edit" && id) {
            currentMode = "EDICION";
            productIdToEdit = id;

            // Actualizar textos en UI
            pageHeader.text("Editar producto");
            btnGuardar.text("Actualizar");
            confirmationModal
                .find(".modal-title")
                .text("Confirmar actualización");

            loadProductData(id);
        } else {
            pageHeader.text("Registrar producto");
            btnGuardar.text("Guardar");
        }
    }

    /**
     * Carga datos del producto desde localStorage
     * @param {string} id - ID del producto
     */
    function loadProductData(id) {
        const stored = localStorage.getItem("productToEdit");

        if (!stored) {
            return;
        }

        try {
            const product = JSON.parse(stored);

            if (String(product.id) === String(id)) {
                // Cargar valores en campos
                $("#codigo").val(product.codigo).prop("disabled", true);
                $("#nombre").val(product.nombre);
                $("#cantidad").val(product.cantidad);
                $("#stockMinimo").val(product.stockMinimo);
                $("#categoria").val(product.categoria);

                localStorage.removeItem("productToEdit");
            }
        } catch (error) {
            console.error("Error al cargar datos del producto:", error);
        }
    }

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    checkEditMode();

    /* ===================================================
       EVENTOS - GUARDAR/ACTUALIZAR
    =================================================== */

    /**
     * Evento: Click en botón Guardar/Actualizar
     * Valida formulario y muestra modal de confirmación
     */
    btnGuardar.on("click", function (e) {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const actionText = currentMode === "EDICION" ? "actualizar" : "guardar";

        confirmationModal
            .find(".modal-message p")
            .html(
                `¿Está seguro de que desea <strong>${actionText}</strong> el producto?`
            );

        confirmationModal.addClass("show");
    });

    /**
     * Evento: Click en botón No (cancelar operación)
     */
    btnNo.on("click", function () {
        confirmationModal.removeClass("show");
    });

    /**
     * Evento: Click en botón Sí (confirmar operación)
     * Guarda producto en localStorage
     */
    btnSi.on("click", function () {
        confirmationModal.removeClass("show");

        const action = currentMode === "EDICION" ? "actualizado" : "guardado";

        // Preparar datos del producto
        const productData = {
            id:
                productIdToEdit ||
                "PROD_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
            codigo: $("#codigo").val(),
            nombre: $("#nombre").val(),
            cantidad: $("#cantidad").val(),
            stockMinimo: $("#stockMinimo").val(),
            categoria: $("#categoria option:selected").text(),
        };

        // Guardar en localStorage
        localStorage.setItem("productToUpdate", JSON.stringify(productData));

        // Mostrar modal de éxito
        successModal
            .find(".modal-message p")
            .text(`El producto ha sido ${action} correctamente.`);

        successModal.addClass("show");
    });

    /**
     * Evento: Click en botón Regresar (desde modal de éxito)
     * Vuelve a la página de gestión
     */
    btnRegresar.on("click", function () {
        successModal.removeClass("show");
        window.location.href = "../pages/gestionar-productos.html";
    });

    /**
     * Evento: Click en botón Cancelar
     * Vuelve a la página anterior sin guardar
     */
    btnCancelar.on("click", function () {
        window.location.href = "../pages/gestionar-productos.html";
    });

    /* ===================================================
       EVENTOS - VALIDACIÓN EN TIEMPO REAL
    =================================================== */

    /**
     * Evento: Input o cambio en campos del formulario
     * Valida cada campo mientras el usuario escribe
     */
    form.on("input change", "input, select", function () {
        const $input = $(this);
        const fieldId = $input.attr("id");
        const errorSpan = $(`#error-${fieldId}`);
        const value = $input.val().trim();

        // Saltar si el campo está deshabilitado
        if ($input.prop("disabled")) return;

        let isValid = true;
        let message = "Campo obligatorio.";

        // Validar según el tipo de campo
        if (fieldId === "codigo" || fieldId === "nombre") {
            isValid = isRequired(value);
        } else if (fieldId === "cantidad" || fieldId === "stockMinimo") {
            isValid = isRequired(value) && isNumeric(value);
            if (!isValid && isRequired(value)) {
                message =
                    fieldId === "cantidad"
                        ? "La cantidad debe ser un número entero positivo."
                        : "El stock mínimo debe ser un número entero positivo.";
            }
        } else if (fieldId === "categoria") {
            isValid = value !== "";
            message = "Debe seleccionar una categoría.";
        }

        // Mostrar/ocultar errores
        if (isValid) {
            $input.removeClass("error-field");
            errorSpan.text("");
        } else {
            $input.addClass("error-field");
            errorSpan.text(message);
        }
    });
});
