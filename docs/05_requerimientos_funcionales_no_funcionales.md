# 05. Requerimientos funcionales y no funcionales

Los requerimientos definen las características y condiciones que el sistema debe cumplir para responder adecuadamente a las necesidades de los usuarios.

## Requerimientos funcionales

| ID | Requerimiento funcional | Descripción / Criterio asociado |
|----|-------------------------|--------------------------------|
| RF-01 | El sistema debe permitir registrar nuevos productos en el inventario. | El formulario de registro debe incluir campos de código, nombre, cantidad y categoría, mostrando confirmación visual tras el guardado exitoso. |
| RF-02 | El sistema debe permitir editar o eliminar productos existentes. | El usuario puede modificar o eliminar registros, con mensajes de validación y confirmación previa. |
| RF-03 | El sistema debe mostrar alertas visuales cuando un producto alcance el nivel mínimo de stock. | Las alertas deben ser claras, con íconos o colores diferenciadores que indiquen la prioridad. |
| RF-04 | El sistema debe permitir la consulta y generación de reportes analíticos de inventario. | Los reportes deben ofrecer filtros (fecha, categoría, proveedor) y opciones de exportación (PDF, Excel). |
| RF-05 | El sistema debe incluir un panel visual de indicadores clave de inventario. | El panel debe mostrar gráficos de stock, productos más rotados y niveles de reposición. |
| RF-06 | El sistema debe permitir el inicio de sesión con autenticación de usuario. | El acceso se realiza mediante validación de credenciales, mostrando mensajes ante errores. |
| RF-07 | El sistema debe permitir la navegación intuitiva entre módulos. | El menú principal debe organizar las secciones (registro, alertas, reportes, panel) de forma clara y accesible. |

## Requerimientos no funcionales

| ID | Requerimiento no funcional | Descripción / Enfoque de diseño |
|----|----------------------------|--------------------------------|
| RNF-01 | Usabilidad | La interfaz debe ser intuitiva, clara y fácil de aprender, priorizando la simplicidad visual. |
| RNF-02 | Accesibilidad | Los elementos visuales deben ser legibles, con contraste adecuado, íconos descriptivos y textos accesibles. |
| RNF-03 | Consistencia visual | Se debe mantener una línea gráfica uniforme (colores, tipografías, estilos de botones y paneles). |
| RNF-04 | Retroalimentación visual | El sistema debe mostrar mensajes, notificaciones o cambios visuales ante cada acción del usuario (guardar, eliminar, error, éxito). |
| RNF-05 | Escalabilidad de diseño | La estructura visual debe permitir la futura integración de nuevos módulos o funcionalidades sin alterar la coherencia del sistema. |
| RNF-06 | Compatibilidad | El diseño debe adaptarse correctamente a diferentes tamaños de pantalla (diseño responsivo). |
| RNF-07 | Rendimiento percibido | Las pantallas deben cargar rápidamente y mostrar animaciones o indicadores de proceso para mantener la percepción de fluidez. |
| RNF-08 | Seguridad visual y de acceso | La autenticación debe proteger los datos sensibles mediante mensajes y estructuras visuales que orienten al usuario sobre la privacidad. |
