<<<<<<< HEAD
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const form = $("#orderForm");
    const productoSelect = $("#producto");
    const cantidadActual = $("#cantidadActual");
    const stockMinimo = $("#stockMinimo");
    const cantidadInput = $("#cantidad");
    const btnGenerar = $("#btnGenerar");
    const btnCancelar = $("#btnCancelar");
    const fechaPedido = $("#fechaPedido");
    const proveedor = $("#proveedor");
    const confirmationModal = $("#confirmationModal");
    const successModal = $("#successModal");
    const btnSi = $("#btnSi");
    const btnNo = $("#btnNo");
    const btnRegresar = $("#btnRegresar");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let orderDataToSave = null;

    /* ===================================================
       FUNCIONES AUXILIARES
    =================================================== */

    /**
     * Valida que el valor sea numérico y positivo
     * @param {string} value - Valor a validar
     * @returns {boolean} True si es numérico y positivo
     */
    const isNumeric = (value) => /^\d+$/.test(value) && parseInt(value) > 0;

    /**
     * Obtiene todos los productos desde localStorage
     * @returns {array} Array de productos
     */
    function getProducts() {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Carga los productos en el select
     */
    function loadProducts() {
        const products = getProducts();
        productoSelect.empty();
        productoSelect.append(
            '<option value="">Seleccione un producto</option>'
        );

        products.forEach((product) => {
            productoSelect.append(
                `<option value="${product.id}" data-cantidad="${product.cantidad}" data-stock-minimo="${product.stockMinimo}">${product.nombre}</option>`
            );
        });
    }

    /**
     * Establece la fecha actual en el campo de fecha
     */
    function setTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        fechaPedido.val(`${year}-${month}-${day}`);
    }

    /* ===================================================
       EVENTOS
    =================================================== */

    /**
     * Evento: Seleccionar producto
     * Auto-completa cantidad actual y stock mínimo
     */
    productoSelect.on("change", function () {
        const selectedOption = $(this).find("option:selected");

        if ($(this).val()) {
            const cantidad = selectedOption.data("cantidad");
            const minimo = selectedOption.data("stock-minimo");

            cantidadActual.val(cantidad);
            stockMinimo.val(minimo);
            cantidadInput.val("");
            cantidadInput.focus();
        } else {
            cantidadActual.val("");
            stockMinimo.val("");
            cantidadInput.val("");
        }
    });

    /**
     * Evento: Click en botón Generar
     * Valida y muestra modal de confirmación
     */
    btnGenerar.on("click", function (e) {
        e.preventDefault();

        // Validaciones
        if (!productoSelect.val()) {
            alert("Debe seleccionar un producto");
            return;
        }

        if (!cantidadInput.val().trim()) {
            $("#error-cantidad").text("La cantidad es obligatoria");
            cantidadInput.addClass("error-field");
            return;
        }

        if (!isNumeric(cantidadInput.val())) {
            $("#error-cantidad").text(
                "La cantidad debe ser un número entero positivo"
            );
            cantidadInput.addClass("error-field");
            return;
        }

        if (!fechaPedido.val()) {
            alert("Debe seleccionar una fecha");
            return;
        }

        if (!proveedor.val()) {
            alert("Debe seleccionar un proveedor");
            return;
        }

        // Preparar datos del pedido
        const selectedProduct = getProducts().find(
            (p) => p.id === productoSelect.val()
        );

        orderDataToSave = {
            id: "PED_" + Date.now(),
            producto: selectedProduct.nombre,
            productoCodigo: selectedProduct.codigo,
            cantidadActual: selectedProduct.cantidad,
            stockMinimo: selectedProduct.stockMinimo,
            cantidadPedida: cantidadInput.val(),
            fechaPedido: fechaPedido.val(),
            proveedor: proveedor.val(),
            estado: "Pendiente",
        };

        // Mostrar modal de confirmación
        confirmationModal.addClass("show");
    });

    /**
     * Evento: Click en botón No (modal confirmación)
     * Cancela el pedido
     */
    btnNo.on("click", function () {
        confirmationModal.removeClass("show");
        orderDataToSave = null;
    });

    /**
     * Evento: Click en botón Sí (modal confirmación)
     * Guarda el pedido en localStorage
     */
    btnSi.on("click", function () {
        confirmationModal.removeClass("show");

        // Guardar pedido
        localStorage.setItem("lastOrder", JSON.stringify(orderDataToSave));

        // Mostrar modal de éxito
        successModal.addClass("show");
    });

    /**
     * Evento: Click en botón Regresar (modal éxito)
     * Limpia el formulario y regresa a alertas-stock
     */
    btnRegresar.on("click", function () {
        successModal.removeClass("show");
        form[0].reset();
        cantidadActual.val("");
        stockMinimo.val("");
        setTodayDate();
        orderDataToSave = null;
        window.location.href = "../pages/alertas-stock.html";
    });

    /**
     * Evento: Input en campo cantidad
     * Limpia errores al escribir
     */
    cantidadInput.on("input", function () {
        if ($(this).val()) {
            $(this).removeClass("error-field");
            $("#error-cantidad").text("");
        }
    });

    /**
     * Evento: Click en botón Cancelar
     * Regresa a alertas-stock
     */
    btnCancelar.on("click", function () {
        window.location.href = "../pages/alertas-stock.html";
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    loadProducts();
    setTodayDate();
});
=======
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const form = $("#orderForm");
    const productoSelect = $("#producto");
    const cantidadActual = $("#cantidadActual");
    const stockMinimo = $("#stockMinimo");
    const cantidadInput = $("#cantidad");
    const btnGenerar = $("#btnGenerar");
    const btnCancelar = $("#btnCancelar");
    const fechaPedido = $("#fechaPedido");
    const proveedor = $("#proveedor");
    const confirmationModal = $("#confirmationModal");
    const successModal = $("#successModal");
    const btnSi = $("#btnSi");
    const btnNo = $("#btnNo");
    const btnRegresar = $("#btnRegresar");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let orderDataToSave = null;

    /* ===================================================
       FUNCIONES AUXILIARES
    =================================================== */

    /**
     * Valida que el valor sea numérico y positivo
     * @param {string} value - Valor a validar
     * @returns {boolean} True si es numérico y positivo
     */
    const isNumeric = (value) => /^\d+$/.test(value) && parseInt(value) > 0;

    /**
     * Obtiene todos los productos desde localStorage
     * @returns {array} Array de productos
     */
    function getProducts() {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Carga los productos en el select
     */
    function loadProducts() {
        const products = getProducts();
        productoSelect.empty();
        productoSelect.append(
            '<option value="">Seleccione un producto</option>'
        );

        products.forEach((product) => {
            productoSelect.append(
                `<option value="${product.id}" data-cantidad="${product.cantidad}" data-stock-minimo="${product.stockMinimo}">${product.nombre}</option>`
            );
        });
    }

    /**
     * Establece la fecha actual en el campo de fecha
     */
    function setTodayDate() {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        fechaPedido.val(`${year}-${month}-${day}`);
    }

    /* ===================================================
       EVENTOS
    =================================================== */

    /**
     * Evento: Seleccionar producto
     * Auto-completa cantidad actual y stock mínimo
     */
    productoSelect.on("change", function () {
        const selectedOption = $(this).find("option:selected");

        if ($(this).val()) {
            const cantidad = selectedOption.data("cantidad");
            const minimo = selectedOption.data("stock-minimo");

            cantidadActual.val(cantidad);
            stockMinimo.val(minimo);
            cantidadInput.val("");
            cantidadInput.focus();
        } else {
            cantidadActual.val("");
            stockMinimo.val("");
            cantidadInput.val("");
        }
    });

    /**
     * Evento: Click en botón Generar
     * Valida y muestra modal de confirmación
     */
    btnGenerar.on("click", function (e) {
        e.preventDefault();

        // Validaciones
        if (!productoSelect.val()) {
            alert("Debe seleccionar un producto");
            return;
        }

        if (!cantidadInput.val().trim()) {
            $("#error-cantidad").text("La cantidad es obligatoria");
            cantidadInput.addClass("error-field");
            return;
        }

        if (!isNumeric(cantidadInput.val())) {
            $("#error-cantidad").text(
                "La cantidad debe ser un número entero positivo"
            );
            cantidadInput.addClass("error-field");
            return;
        }

        if (!fechaPedido.val()) {
            alert("Debe seleccionar una fecha");
            return;
        }

        if (!proveedor.val()) {
            alert("Debe seleccionar un proveedor");
            return;
        }

        // Preparar datos del pedido
        const selectedProduct = getProducts().find(
            (p) => p.id === productoSelect.val()
        );

        orderDataToSave = {
            id: "PED_" + Date.now(),
            producto: selectedProduct.nombre,
            productoCodigo: selectedProduct.codigo,
            cantidadActual: selectedProduct.cantidad,
            stockMinimo: selectedProduct.stockMinimo,
            cantidadPedida: cantidadInput.val(),
            fechaPedido: fechaPedido.val(),
            proveedor: proveedor.val(),
            estado: "Pendiente",
        };

        // Mostrar modal de confirmación
        confirmationModal.addClass("show");
    });

    /**
     * Evento: Click en botón No (modal confirmación)
     * Cancela el pedido
     */
    btnNo.on("click", function () {
        confirmationModal.removeClass("show");
        orderDataToSave = null;
    });

    /**
     * Evento: Click en botón Sí (modal confirmación)
     * Guarda el pedido en localStorage
     */
    btnSi.on("click", function () {
        confirmationModal.removeClass("show");

        // Guardar pedido
        localStorage.setItem("lastOrder", JSON.stringify(orderDataToSave));

        // Mostrar modal de éxito
        successModal.addClass("show");
    });

    /**
     * Evento: Click en botón Regresar (modal éxito)
     * Limpia el formulario y regresa a alertas-stock
     */
    btnRegresar.on("click", function () {
        successModal.removeClass("show");
        form[0].reset();
        cantidadActual.val("");
        stockMinimo.val("");
        setTodayDate();
        orderDataToSave = null;
        window.location.href = "../pages/alertas-stock.html";
    });

    /**
     * Evento: Input en campo cantidad
     * Limpia errores al escribir
     */
    cantidadInput.on("input", function () {
        if ($(this).val()) {
            $(this).removeClass("error-field");
            $("#error-cantidad").text("");
        }
    });

    /**
     * Evento: Click en botón Cancelar
     * Regresa a alertas-stock
     */
    btnCancelar.on("click", function () {
        window.location.href = "../pages/alertas-stock.html";
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    loadProducts();
    setTodayDate();
});
>>>>>>> 172b2fbaab5bd11460c024c7e4e6f41dfcad9b5b
