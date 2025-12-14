$(document).ready(function () {
    /* ===================================================
       VARIABLES DE ESTADO PARA GRÁFICOS
    =================================================== */

    let pieChartInstance = null;
    let barChartInstance = null;

    /* ===================================================
       FUNCIONES PRINCIPALES
    =================================================== */

    /**
     * Obtiene los productos desde localStorage
     * @returns {array} Array de productos
     */
    function getProducts() {
        const stored = localStorage.getItem("products");
        return stored ? JSON.parse(stored) : [];
    }

    /**
     * Calcula e inserta los indicadores principales en el dashboard
     * @returns {object} Objeto con datos de indicadores
     */
    function calculateIndicators() {
        const products = getProducts();

        const totalProductos = products.length;
        const productosBaroStock = products.filter(
            (p) => parseInt(p.cantidad) < parseInt(p.stockMinimo)
        ).length;

        const categorias = new Set(products.map((p) => p.categoria)).size;

        // Insertar valores en DOM
        $("#totalProductos").text(totalProductos);
        $("#productosBaroStock").text(productosBaroStock);
        $("#categorias").text(categorias);

        return { products, totalProductos, productosBaroStock, categorias };
    }

    /**
     * Genera ambos gráficos (pie y bar)
     */
    function generateCharts() {
        const products = getProducts();

        const labels = products.map((p) => p.nombre);
        const cantidades = products.map((p) => parseInt(p.cantidad) || 0);

        generatePieChart(labels, cantidades);
        generateBarChart(products);
    }

    /**
     * Genera gráfico de pastel (doughnut chart)
     * Muestra distribución de stock por producto
     * @param {array} labels - Nombres de productos
     * @param {array} data - Cantidades de stock
     */
    function generatePieChart(labels, data) {
        const ctx = document.getElementById("pieChart").getContext("2d");

        // Destruir instancia anterior si existe
        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        // Paleta de colores para el gráfico
        const colors = [
            "#FFEB3B",
            "#6F41CA",
            "#FF9800",
            "#2196F3",
            "#4CAF50",
            "#9C27B0",
            "#00BCD4",
            "#E91E63",
        ];

        pieChartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: colors.slice(0, data.length),
                        borderWidth: 2,
                        borderColor: "#fff",
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
            },
        });
    }

    /**
     * Genera gráfico de barras
     * Compara stock actual vs stock mínimo
     * @param {array} products - Array de productos
     */
    function generateBarChart(products) {
        const ctx = document.getElementById("barChart").getContext("2d");

        // Destruir instancia anterior si existe
        if (barChartInstance) {
            barChartInstance.destroy();
        }

        const labels = products.map((p) => p.nombre.substring(0, 10));
        const cantidades = products.map((p) => parseInt(p.cantidad) || 0);
        const minimoStock = products.map((p) => parseInt(p.stockMinimo) || 0);

        barChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Stock Actual",
                        data: cantidades,
                        backgroundColor: "#FFEB3B",
                        borderColor: "#FFEB3B",
                        borderWidth: 1,
                    },
                    {
                        label: "Stock Mínimo",
                        data: minimoStock,
                        backgroundColor: "#6F41CA",
                        borderColor: "#6F41CA",
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            display: true,
                            color: "#e0e0e0",
                        },
                    },
                    x: {
                        grid: {
                            display: false,
                        },
                    },
                },
            },
        });
    }

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    calculateIndicators();
    generateCharts();
});
