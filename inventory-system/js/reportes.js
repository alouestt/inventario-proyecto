<<<<<<< HEAD
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const fechaDesde = $("#fechaDesde");
    const fechaHasta = $("#fechaHasta");
    const btnGenerar = $("#btnGenerar");
    const btnExportPDF = $("#btnExportPDF");
    const btnExportExcel = $("#btnExportExcel");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let barChartInstance = null;
    let pieChartInstance = null;

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
     * Procesa los datos y genera ambos gráficos
     */
    function generateCharts() {
        const products = getProducts();

        // Agrupar cantidad por categoría
        const categorias = {};
        products.forEach((product) => {
            if (!categorias[product.categoria]) {
                categorias[product.categoria] = 0;
            }
            categorias[product.categoria] += parseInt(product.cantidad) || 0;
        });

        const labels = Object.keys(categorias);
        const data = Object.values(categorias);

        generateBarChart(labels, data);
        generatePieChart(labels, data);
    }

    /**
     * Genera gráfico de barras con datos por categoría
     * @param {array} labels - Nombres de categorías
     * @param {array} data - Cantidad de stock por categoría
     */
    function generateBarChart(labels, data) {
        const ctx = document.getElementById("barChart").getContext("2d");

        // Destruir gráfico anterior si existe
        if (barChartInstance) {
            barChartInstance.destroy();
        }

        barChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Stock por Categoría",
                        data: data,
                        backgroundColor: "#FFEB3B",
                        borderColor: "#FFEB3B",
                        borderWidth: 1,
                    },
                    {
                        label: "Movimiento",
                        data: data.map((d) => d * 0.8),
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

    /**
     * Genera gráfico de pastel (doughnut)
     * @param {array} labels - Nombres de categorías
     * @param {array} data - Cantidad de stock por categoría
     */
    function generatePieChart(labels, data) {
        const ctx = document.getElementById("pieChart").getContext("2d");

        // Destruir gráfico anterior si existe
        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        const colors = ["#FFEB3B", "#6F41CA"];

        pieChartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            ...colors,
                            "#FF9800",
                            "#2196F3",
                            "#4CAF50",
                            "#9C27B0",
                        ],
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
     * Establece las fechas por defecto
     * Desde: Primer día del mes actual
     * Hasta: Día actual
     */
    function setDefaultDates() {
        const today = new Date();
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        fechaDesde.val(formatDate(firstDayOfMonth));
        fechaHasta.val(formatDate(today));
    }

    /* ===================================================
       EVENTOS
    =================================================== */

    /**
     * Evento: Click en botón Generar reporte
     * Regenera los gráficos con datos actuales
     */
    btnGenerar.on("click", function () {
        generateCharts();
    });

    /**
     * Evento: Click en botón Exportar PDF
     * Nota: Función no habilitada (requiere librería externa)
     */
    btnExportPDF.on("click", function () {
        alert("Función de exportar a PDF no habilitada");
    });

    /**
     * Evento: Click en botón Exportar Excel
     * Nota: Función no habilitada (requiere librería externa)
     */
    btnExportExcel.on("click", function () {
        alert("Función de exportar a Excel no habilitada");
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    setDefaultDates();
    generateCharts();
});
=======
$(document).ready(function () {
    /* ===================================================
       REFERENCIAS A ELEMENTOS DEL DOM
    =================================================== */

    const fechaDesde = $("#fechaDesde");
    const fechaHasta = $("#fechaHasta");
    const btnGenerar = $("#btnGenerar");
    const btnExportPDF = $("#btnExportPDF");
    const btnExportExcel = $("#btnExportExcel");

    /* ===================================================
       VARIABLES DE ESTADO
    =================================================== */

    let barChartInstance = null;
    let pieChartInstance = null;

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
     * Procesa los datos y genera ambos gráficos
     */
    function generateCharts() {
        const products = getProducts();

        // Agrupar cantidad por categoría
        const categorias = {};
        products.forEach((product) => {
            if (!categorias[product.categoria]) {
                categorias[product.categoria] = 0;
            }
            categorias[product.categoria] += parseInt(product.cantidad) || 0;
        });

        const labels = Object.keys(categorias);
        const data = Object.values(categorias);

        generateBarChart(labels, data);
        generatePieChart(labels, data);
    }

    /**
     * Genera gráfico de barras con datos por categoría
     * @param {array} labels - Nombres de categorías
     * @param {array} data - Cantidad de stock por categoría
     */
    function generateBarChart(labels, data) {
        const ctx = document.getElementById("barChart").getContext("2d");

        // Destruir gráfico anterior si existe
        if (barChartInstance) {
            barChartInstance.destroy();
        }

        barChartInstance = new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Stock por Categoría",
                        data: data,
                        backgroundColor: "#FFEB3B",
                        borderColor: "#FFEB3B",
                        borderWidth: 1,
                    },
                    {
                        label: "Movimiento",
                        data: data.map((d) => d * 0.8),
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

    /**
     * Genera gráfico de pastel (doughnut)
     * @param {array} labels - Nombres de categorías
     * @param {array} data - Cantidad de stock por categoría
     */
    function generatePieChart(labels, data) {
        const ctx = document.getElementById("pieChart").getContext("2d");

        // Destruir gráfico anterior si existe
        if (pieChartInstance) {
            pieChartInstance.destroy();
        }

        const colors = ["#FFEB3B", "#6F41CA"];

        pieChartInstance = new Chart(ctx, {
            type: "doughnut",
            data: {
                labels: labels,
                datasets: [
                    {
                        data: data,
                        backgroundColor: [
                            ...colors,
                            "#FF9800",
                            "#2196F3",
                            "#4CAF50",
                            "#9C27B0",
                        ],
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
     * Establece las fechas por defecto
     * Desde: Primer día del mes actual
     * Hasta: Día actual
     */
    function setDefaultDates() {
        const today = new Date();
        const firstDayOfMonth = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );

        const formatDate = (date) => {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");
            return `${year}-${month}-${day}`;
        };

        fechaDesde.val(formatDate(firstDayOfMonth));
        fechaHasta.val(formatDate(today));
    }

    /* ===================================================
       EVENTOS
    =================================================== */

    /**
     * Evento: Click en botón Generar reporte
     * Regenera los gráficos con datos actuales
     */
    btnGenerar.on("click", function () {
        generateCharts();
    });

    /**
     * Evento: Click en botón Exportar PDF
     * Nota: Función no habilitada (requiere librería externa)
     */
    btnExportPDF.on("click", function () {
        alert("Función de exportar a PDF no habilitada");
    });

    /**
     * Evento: Click en botón Exportar Excel
     * Nota: Función no habilitada (requiere librería externa)
     */
    btnExportExcel.on("click", function () {
        alert("Función de exportar a Excel no habilitada");
    });

    /* ===================================================
       INICIALIZACIÓN
    =================================================== */

    setDefaultDates();
    generateCharts();
});
>>>>>>> 172b2fbaab5bd11460c024c7e4e6f41dfcad9b5b
