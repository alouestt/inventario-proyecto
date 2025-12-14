$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const tableBody = $(".product-table tbody");
    const searchInput = $(".search-input");

    /* ===================================================
       FUNCIONES PRINCIPALES
    =================================================== */

    /**
     * Determina el estado del stock del producto
     * @param {number} cantidad - Cantidad actual
     * @param {number} stockMinimo - Stock mínimo requerido
     * @returns {object} Objeto con texto y clase CSS del estado
     */
    function getProductStatus(cantidad, stockMinimo) {
        if (cantidad < stockMinimo) {
            return { text: "Bajo", class: "status-bajo" };
        } else if (cantidad < stockMinimo * 2) {
            return { text: "Medio", class: "status-medio" };
        } else {
            return { text: "Normal", class: "status-normal" };
        }
    }

    /**
     * Obtiene todos los productos desde localStorage
     * @returns {array} Array de productos con stockMinimo por defecto
     */
    function getProductsFromStorage() {
        const stored = localStorage.getItem("products");
        if (!stored) return [];

        try {
            const products = JSON.parse(stored);
            return products.map((product) => ({
                ...product,
                stockMinimo: product.stockMinimo || 10,
            }));
        } catch (error) {
            console.error("Error al cargar productos:", error);
            return [];
        }
    }

    /**
     * Renderiza la tabla con los productos proporcionados
     * @param {array} products - Array de productos a mostrar
     */
    function renderTable(products) {
        tableBody.empty();

        if (products.length === 0) {
            tableBody.append(
                '<tr><td colspan="5" style="text-align: center; padding: 20px;">No hay productos</td></tr>'
            );
            return;
        }

        products.forEach((product) => {
            const status = getProductStatus(
                product.cantidad,
                product.stockMinimo
            );
            const row = `
                <tr>
                    <td>${product.codigo}</td>
                    <td>${product.nombre}</td>
                    <td>${product.cantidad}</td>
                    <td>${product.stockMinimo}</td>
                    <td><span class="${status.class}">${status.text}</span></td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    /**
     * Filtra productos por código
     * @param {string} searchTerm - Término de búsqueda
     */
    function filterProducts(searchTerm) {
        const allProducts = getProductsFromStorage();
        const filtered = allProducts.filter((product) =>
            product.codigo.toLowerCase().includes(searchTerm.toLowerCase())
        );
        renderTable(filtered);
    }

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    const allProducts = getProductsFromStorage();
    renderTable(allProducts);

    /* ===================================================
       EVENTOS
    =================================================== */

    // Buscar productos por código
    searchInput.on("input", function () {
        filterProducts($(this).val());
    });

    // Botón: Ver productos (gestionar)
    $("#btnVerProductos").on("click", function () {
        window.location.href = "../pages/gestionar-productos.html";
    });

    // Botón: Generar pedido
    $("#btnGenerarPedido").on("click", function () {
        window.location.href = "../pages/generar-pedido.html";
    });
});
