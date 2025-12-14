<<<<<<< HEAD
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const $productTableBody = $(".product-table tbody");
    const $searchInput = $(".search-input");
    const $deleteConfirmationModal = $("#deleteConfirmationModal");
    const $deleteSuccessModal = $("#deleteSuccessModal");
    const $btnConfirmDelete = $("#btnConfirmDelete");
    const $btnCancelDelete = $("#btnCancelDelete");
    const $btnRegresarDelete = $("#btnRegresarDelete");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let currentProductId = null;
    let currentProductName = "";

    /* ===================================================
       FUNCIONES DE ALMACENAMIENTO
    =================================================== */

    /**
     * Obtiene todos los productos desde localStorage
     * @returns {array} Array de productos
     */
    function getProducts() {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Guarda productos en localStorage
     * @param {array} products - Array de productos
     */
    function saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    /* ===================================================
       CARGA INICIAL DE DATOS
    =================================================== */

    /**
     * Carga productos de prueba si no existen en localStorage
     */
    function loadInitialProducts() {
        if (!localStorage.getItem("products")) {
            const initialProducts = [
                {
                    id: "001",
                    codigo: "001",
                    nombre: "Teclado",
                    cantidad: 25,
                    categoria: "Periféricos",
                    stockMinimo: 10,
                },
                {
                    id: "002",
                    codigo: "002",
                    nombre: "Monitor",
                    cantidad: 8,
                    categoria: "Pantallas",
                    stockMinimo: 5,
                },
                {
                    id: "003",
                    codigo: "003",
                    nombre: "Mouse",
                    cantidad: 50,
                    categoria: "Periféricos",
                    stockMinimo: 15,
                },
                {
                    id: "004",
                    codigo: "004",
                    nombre: "Portátil",
                    cantidad: 10,
                    categoria: "Equipos",
                    stockMinimo: 5,
                },
                {
                    id: "005",
                    codigo: "005",
                    nombre: "Impresora láser",
                    cantidad: 12,
                    categoria: "Equipos",
                    stockMinimo: 8,
                },
                {
                    id: "006",
                    codigo: "006",
                    nombre: "Audífonos inalámbricos",
                    cantidad: 34,
                    categoria: "Periféricos",
                    stockMinimo: 20,
                },
                {
                    id: "007",
                    codigo: "007",
                    nombre: "Disco duro externo 1TB",
                    cantidad: 20,
                    categoria: "Almacenamiento",
                    stockMinimo: 10,
                },
                {
                    id: "008",
                    codigo: "008",
                    nombre: "Webcam full HD",
                    cantidad: 18,
                    categoria: "Accesorios",
                    stockMinimo: 10,
                },
            ];
            saveProducts(initialProducts);
        }
    }

    /* ===================================================
       PROCESAR ACTUALIZACIÓN DE PRODUCTO
    =================================================== */

    /**
     * Procesa producto actualizado desde registrar-producto.js
     * Inserta nuevo o actualiza existente
     */
    function handleProductUpdate() {
        const productDataString = localStorage.getItem("productToUpdate");

        if (productDataString) {
            try {
                const product = JSON.parse(productDataString);
                let products = getProducts();

                // Buscar si el producto ya existe (edición)
                const existingIndex = products.findIndex(
                    (p) => String(p.id) === String(product.id)
                );

                if (existingIndex !== -1) {
                    // Actualizar producto existente
                    products[existingIndex] = product;
                } else {
                    // Agregar nuevo producto
                    products.push(product);
                }

                saveProducts(products);
                renderProducts();
                localStorage.removeItem("productToUpdate");
            } catch (error) {
                console.error("Error al procesar actualización:", error);
                localStorage.removeItem("productToUpdate");
            }
        }
    }

    /* ===================================================
       RENDERIZAR TABLA
    =================================================== */

    /**
     * Crea una fila de la tabla para un producto
     * @param {object} product - Producto
     * @returns {string} HTML de la fila
     */
    function createProductRow(product) {
        return `
            <tr data-id="${product.id}">
                <td>${product.codigo}</td>
                <td>${product.nombre}</td>
                <td>${product.cantidad}</td>
                <td>${product.categoria}</td>
                <td>
                    <button class="btn-edit" data-product-id="${product.id}">Editar</button>
                    <button class="btn-delete" data-product-id="${product.id}" data-product-name="${product.nombre}">Eliminar</button>
                </td>
            </tr>
        `;
    }

    /**
     * Renderiza la tabla con todos los productos
     */
    function renderProducts() {
        const products = getProducts();
        let html = "";

        products.forEach((product) => {
            html += createProductRow(product);
        });

        $productTableBody.html(html);
    }

    /* ===================================================
       EVENTOS - BÚSQUEDA
    =================================================== */

    /**
     * Evento: Escribir en barra de búsqueda
     * Filtra productos por código
     */
    $searchInput.on("keyup", function () {
        const text = $(this).val().toUpperCase();

        $productTableBody.find("tr").each(function () {
            const code = $(this).find("td:eq(0)").text().toUpperCase();
            $(this).toggle(code.includes(text));
        });
    });

    /* ===================================================
       EVENTOS - ELIMINAR PRODUCTO
    =================================================== */

    /**
     * Evento: Click en botón Eliminar
     * Abre modal de confirmación
     */
    $(".product-table").on("click", ".btn-delete", function () {
        currentProductId = $(this).data("product-id");
        currentProductName = $(this).data("product-name");

        if (!currentProductId) {
            return;
        }

        $("#deleteMessage").html(
            `¿Está seguro de que desea eliminar el producto <strong>"${currentProductName}"</strong>?`
        );

        $deleteConfirmationModal.addClass("show");
    });

    /**
     * Evento: Confirmar eliminación
     * Elimina producto de localStorage y actualiza tabla
     */
    $btnConfirmDelete.on("click", function () {
        let products = getProducts();
        const initialLength = products.length;

        products = products.filter(
            (p) => String(p.id) !== String(currentProductId)
        );

        if (products.length === initialLength) {
            return;
        }

        saveProducts(products);
        renderProducts();

        $deleteConfirmationModal.removeClass("show");

        $("#deleteConfirmationMessage").html(
            `Se ha eliminado el producto <strong>"${currentProductName}"</strong> correctamente.`
        );

        $deleteSuccessModal.addClass("show");

        currentProductId = null;
        currentProductName = "";
    });

    /**
     * Evento: Cancelar eliminación
     */
    $btnCancelDelete.on("click", function () {
        $deleteConfirmationModal.removeClass("show");
        currentProductId = null;
        currentProductName = "";
    });

    /**
     * Evento: Cerrar modal de éxito
     */
    $btnRegresarDelete.on("click", function () {
        $deleteSuccessModal.removeClass("show");
    });

    /* ===================================================
       EVENTOS - EDITAR PRODUCTO
    =================================================== */

    /**
     * Evento: Click en botón Editar
     * Guarda producto en localStorage y navega a formulario
     */
    $(".product-table").on("click", ".btn-edit", function () {
        const productId = $(this).data("product-id");
        const products = getProducts();
        const product = products.find(
            (p) => String(p.id) === String(productId)
        );

        if (product) {
            localStorage.setItem("productToEdit", JSON.stringify(product));
            window.location.href = `../pages/registrar-producto.html?action=edit&id=${productId}`;
        }
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    loadInitialProducts();
    renderProducts();
    handleProductUpdate();
});
=======
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const $productTableBody = $(".product-table tbody");
    const $searchInput = $(".search-input");
    const $deleteConfirmationModal = $("#deleteConfirmationModal");
    const $deleteSuccessModal = $("#deleteSuccessModal");
    const $btnConfirmDelete = $("#btnConfirmDelete");
    const $btnCancelDelete = $("#btnCancelDelete");
    const $btnRegresarDelete = $("#btnRegresarDelete");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let currentProductId = null;
    let currentProductName = "";

    /* ===================================================
       FUNCIONES DE ALMACENAMIENTO
    =================================================== */

    /**
     * Obtiene todos los productos desde localStorage
     * @returns {array} Array de productos
     */
    function getProducts() {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Guarda productos en localStorage
     * @param {array} products - Array de productos
     */
    function saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }

    /* ===================================================
       CARGA INICIAL DE DATOS
    =================================================== */

    /**
     * Carga productos de prueba si no existen en localStorage
     */
    function loadInitialProducts() {
        if (!localStorage.getItem("products")) {
            const initialProducts = [
                {
                    id: "001",
                    codigo: "001",
                    nombre: "Teclado",
                    cantidad: 25,
                    categoria: "Periféricos",
                    stockMinimo: 10,
                },
                {
                    id: "002",
                    codigo: "002",
                    nombre: "Monitor",
                    cantidad: 8,
                    categoria: "Pantallas",
                    stockMinimo: 5,
                },
                {
                    id: "003",
                    codigo: "003",
                    nombre: "Mouse",
                    cantidad: 50,
                    categoria: "Periféricos",
                    stockMinimo: 15,
                },
                {
                    id: "004",
                    codigo: "004",
                    nombre: "Portátil",
                    cantidad: 10,
                    categoria: "Equipos",
                    stockMinimo: 5,
                },
                {
                    id: "005",
                    codigo: "005",
                    nombre: "Impresora láser",
                    cantidad: 12,
                    categoria: "Equipos",
                    stockMinimo: 8,
                },
                {
                    id: "006",
                    codigo: "006",
                    nombre: "Audífonos inalámbricos",
                    cantidad: 34,
                    categoria: "Periféricos",
                    stockMinimo: 20,
                },
                {
                    id: "007",
                    codigo: "007",
                    nombre: "Disco duro externo 1TB",
                    cantidad: 20,
                    categoria: "Almacenamiento",
                    stockMinimo: 10,
                },
                {
                    id: "008",
                    codigo: "008",
                    nombre: "Webcam full HD",
                    cantidad: 18,
                    categoria: "Accesorios",
                    stockMinimo: 10,
                },
            ];
            saveProducts(initialProducts);
        }
    }

    /* ===================================================
       PROCESAR ACTUALIZACIÓN DE PRODUCTO
    =================================================== */

    /**
     * Procesa producto actualizado desde registrar-producto.js
     * Inserta nuevo o actualiza existente
     */
    function handleProductUpdate() {
        const productDataString = localStorage.getItem("productToUpdate");

        if (productDataString) {
            try {
                const product = JSON.parse(productDataString);
                let products = getProducts();

                // Buscar si el producto ya existe (edición)
                const existingIndex = products.findIndex(
                    (p) => String(p.id) === String(product.id)
                );

                if (existingIndex !== -1) {
                    // Actualizar producto existente
                    products[existingIndex] = product;
                } else {
                    // Agregar nuevo producto
                    products.push(product);
                }

                saveProducts(products);
                renderProducts();
                localStorage.removeItem("productToUpdate");
            } catch (error) {
                console.error("Error al procesar actualización:", error);
                localStorage.removeItem("productToUpdate");
            }
        }
    }

    /* ===================================================
       RENDERIZAR TABLA
    =================================================== */

    /**
     * Crea una fila de la tabla para un producto
     * @param {object} product - Producto
     * @returns {string} HTML de la fila
     */
    function createProductRow(product) {
        return `
            <tr data-id="${product.id}">
                <td>${product.codigo}</td>
                <td>${product.nombre}</td>
                <td>${product.cantidad}</td>
                <td>${product.categoria}</td>
                <td>
                    <button class="btn-edit" data-product-id="${product.id}">Editar</button>
                    <button class="btn-delete" data-product-id="${product.id}" data-product-name="${product.nombre}">Eliminar</button>
                </td>
            </tr>
        `;
    }

    /**
     * Renderiza la tabla con todos los productos
     */
    function renderProducts() {
        const products = getProducts();
        let html = "";

        products.forEach((product) => {
            html += createProductRow(product);
        });

        $productTableBody.html(html);
    }

    /* ===================================================
       EVENTOS - BÚSQUEDA
    =================================================== */

    /**
     * Evento: Escribir en barra de búsqueda
     * Filtra productos por código
     */
    $searchInput.on("keyup", function () {
        const text = $(this).val().toUpperCase();

        $productTableBody.find("tr").each(function () {
            const code = $(this).find("td:eq(0)").text().toUpperCase();
            $(this).toggle(code.includes(text));
        });
    });

    /* ===================================================
       EVENTOS - ELIMINAR PRODUCTO
    =================================================== */

    /**
     * Evento: Click en botón Eliminar
     * Abre modal de confirmación
     */
    $(".product-table").on("click", ".btn-delete", function () {
        currentProductId = $(this).data("product-id");
        currentProductName = $(this).data("product-name");

        if (!currentProductId) {
            return;
        }

        $("#deleteMessage").html(
            `¿Está seguro de que desea eliminar el producto <strong>"${currentProductName}"</strong>?`
        );

        $deleteConfirmationModal.addClass("show");
    });

    /**
     * Evento: Confirmar eliminación
     * Elimina producto de localStorage y actualiza tabla
     */
    $btnConfirmDelete.on("click", function () {
        let products = getProducts();
        const initialLength = products.length;

        products = products.filter(
            (p) => String(p.id) !== String(currentProductId)
        );

        if (products.length === initialLength) {
            return;
        }

        saveProducts(products);
        renderProducts();

        $deleteConfirmationModal.removeClass("show");

        $("#deleteConfirmationMessage").html(
            `Se ha eliminado el producto <strong>"${currentProductName}"</strong> correctamente.`
        );

        $deleteSuccessModal.addClass("show");

        currentProductId = null;
        currentProductName = "";
    });

    /**
     * Evento: Cancelar eliminación
     */
    $btnCancelDelete.on("click", function () {
        $deleteConfirmationModal.removeClass("show");
        currentProductId = null;
        currentProductName = "";
    });

    /**
     * Evento: Cerrar modal de éxito
     */
    $btnRegresarDelete.on("click", function () {
        $deleteSuccessModal.removeClass("show");
    });

    /* ===================================================
       EVENTOS - EDITAR PRODUCTO
    =================================================== */

    /**
     * Evento: Click en botón Editar
     * Guarda producto en localStorage y navega a formulario
     */
    $(".product-table").on("click", ".btn-edit", function () {
        const productId = $(this).data("product-id");
        const products = getProducts();
        const product = products.find(
            (p) => String(p.id) === String(productId)
        );

        if (product) {
            localStorage.setItem("productToEdit", JSON.stringify(product));
            window.location.href = `../pages/registrar-producto.html?action=edit&id=${productId}`;
        }
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    loadInitialProducts();
    renderProducts();
    handleProductUpdate();
});
>>>>>>> 172b2fbaab5bd11460c024c7e4e6f41dfcad9b5b
