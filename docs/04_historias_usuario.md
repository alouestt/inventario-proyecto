# 04. Historias de usuario

Las historias de usuario describen las funcionalidades que el sistema debe ofrecer desde la perspectiva del usuario final.  
Cada historia se formula con el formato estándar de Scrum:

> Como [tipo de usuario], quiero [acción o funcionalidad] para [beneficio o resultado esperado].

## Historias de usuario

|   **ID**  | **Historia de usuario**                                                                                                                                       | **Criterios de aceptación**                                                                                                                                   | **Prioridad** |
| :-------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-----------: |
| **HU-01** | Como usuario operativo, quiero registrar nuevos productos en el sistema para mantener actualizado el inventario.                                              | - El formulario debe permitir ingresar código, nombre, cantidad y categoría.<br>- El sistema debe confirmar el registro exitoso.                              |      Alta     |
| **HU-02** | Como usuario operativo, quiero editar o eliminar productos existentes para mantener la información actualizada y evitar duplicidades.                         | - El sistema debe mostrar la lista de productos con opciones de edición y eliminación.<br>- Debe solicitar confirmación antes de eliminar un registro.        |      Alta     |
| **HU-03** | Como usuario administrativo, quiero visualizar alertas automáticas de bajo stock para realizar pedidos oportunos y evitar desabastecimiento.                  | - El sistema debe emitir una alerta visual cuando un producto esté por debajo del stock mínimo.<br>- Las alertas deben visualizarse desde el panel principal. |      Alta     |
| **HU-04** | Como usuario administrativo, quiero consultar y exportar reportes analíticos de inventario para apoyar la toma de decisiones estratégicas.                    | - El sistema debe generar reportes con filtros por fecha, categoría y proveedor.<br>- Debe permitir exportar los reportes en formato PDF o Excel.             |     Media     |
| **HU-05** | Como usuario directivo, quiero acceder a un panel resumen de indicadores de inventario para obtener una visión general de la gestión y desempeño del sistema. | - El panel debe incluir gráficos de stock, productos más rotados y niveles de reposición.<br>- Debe ser visualmente claro y fácil de interpretar.             |     Media     |
| **HU-06** | Como usuario, quiero iniciar sesión de manera segura para acceder únicamente a la información correspondiente a mi rol.                                       | - El sistema debe validar credenciales.<br>- Debe mostrar mensajes claros ante errores de autenticación.                                                      |      Alta     |


## Gestión en el tablero Scrum
Las historias de usuario se gestionan en el tablero Trello del proyecto, organizado en columnas:  
**En revisión**, **Por hacer**, **En progreso** y **Hecho**.  
Enlace: https://trello.com/invite/b/68e2c65ddd35703bcb242b7d/ATTI558ca92612777e0924c4fb3885e18f5cF61F253B/sistema-de-gestion-de-inventarios