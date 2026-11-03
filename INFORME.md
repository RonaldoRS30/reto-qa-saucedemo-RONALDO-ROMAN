# Informe de estrategia de automatización

## Objetivo

Automatizar el flujo de un cliente de Sauce Demo: iniciar sesión, agregar productos al carrito y completar una compra. La suite también cubre los casos en los que el acceso debe rechazarse.

Aplicación bajo prueba: https://www.saucedemo.com/

## Alcance

Criterios de aceptación cubiertos:

1. Inicio de sesión con credenciales válidas (`standard_user`).
2. Rechazo de credenciales inválidas.
3. Alta de un producto desde la página de productos.
4. Visualización de ese producto en el carrito.
5. Compra hasta la pantalla de confirmación.

Cobertura adicional, fuera del mínimo del reto:

- Usuario bloqueado (`locked_out_user`), pedido de forma explícita en las especificaciones.
- Eliminar un producto del carrito.
- Intento de checkout sin nombre, apellido ni código postal.

Quedó fuera de esta entrega ordenar el inventario, comprar varios productos distintos y el logout. El flujo crítico de compra ya queda cerrado con los escenarios actuales.

## Herramientas

- **Playwright** abre Chromium, localiza elementos y hace las afirmaciones (`expect`).
- **Cucumber** ejecuta los features escritos en Gherkin y enlaza cada paso con su definición.
- **dotenv** carga `BASE_URL` y `HEADLESS` desde `.env` antes de cada ejecución.

Cada escenario abre un navegador nuevo en `support/hooks.js` y lo cierra al terminar. Así un test no deja sesión ni carrito para el siguiente. El tiempo máximo de un paso es 30 segundos.

## Patrón de diseño: Page Object Model

Cada pantalla de Sauce Demo tiene una clase en `src/pages/`:

| Clase | Pantalla |
|-------|----------|
| `LoginPage` | Login |
| `ProductsPage` | Inventario |
| `CartPage` | Carrito |
| `CheckoutPage` | Datos del comprador |
| `CheckoutOverviewPage` | Resumen e importes |
| `CheckoutCompletePage` | Confirmación del pedido |

La página guarda los localizadores y expone acciones con nombre de negocio (`login`, `addProductToCart`, `fillInformation`, `finishOrder`). Los step definitions no buscan selectores: llaman a esos métodos y comprueban el resultado.

Esa separación permite cambiar un selector en un solo archivo cuando la interfaz cambie, sin reescribir los escenarios.

## Organización de los escenarios

Hay un feature por flujo de negocio:

- `features/login.feature`
- `features/compra.feature`
- `features/checkout.feature`

Los tags permiten correr un grupo sin ejecutar toda la suite:

- `@smoke` para el login exitoso, como prueba rápida de que la app responde.
- `@login`, `@carrito` y `@checkout` para cada flujo.
- Un tag por escenario (`@login_exitoso`, `@checkout_datos_incompletos`, etc.) para depurar un caso concreto.

Los pasos están en español y describen la intención del usuario, no el detalle técnico del clic.

## Datos de prueba

| Dato | Dónde vive | Motivo |
|------|------------|--------|
| URL y modo headless | `.env` | Cambian según la máquina y no deben versionarse |
| Usuarios y contraseñas | Features | El reto los define y el escenario debe leerse solo |
| Nombre, apellido y código postal | Feature de checkout | Forman parte del caso de prueba |
| Producto `Sauce Labs Backpack` | Features de carrito y checkout | Producto estable del catálogo de demostración |

## Qué se valida

- Login correcto: el título de la página de productos es `Products`.
- Login fallido: el mensaje de error contiene el texto esperado (credenciales o usuario bloqueado).
- Carrito: el contador muestra `1`, el nombre del producto aparece en el carrito y, tras eliminarlo, no queda ningún ítem.
- Checkout exitoso: se llega a `Checkout: Overview`, el producto sigue en el resumen, se ven subtotal, impuesto y total, y la confirmación muestra `Thank you for your order!`.
- Checkout incompleto: continuar sin datos muestra `Error: First Name is required`.

## Cómo ejecutar

Las instrucciones de instalación y los comandos están en [README.md](README.md). El comando de la suite completa es `npm test`.
