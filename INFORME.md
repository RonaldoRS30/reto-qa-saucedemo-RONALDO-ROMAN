# Cómo armé esta automatización

Sauce Demo: https://www.saucedemo.com/

El flujo es entrar, agregar un producto y terminar la compra. Lo partí en tres features: `login`, `compra` y `checkout`.

## Qué cubrí

Camino feliz, tag `@smoke`: login con `standard_user` y la contraseña de `SAUCE_PASSWORD`, agregar Sauce Labs Backpack y compra hasta `Thank you for your order!`.

Regresión, tag `@regresion`: un Scenario Outline de login y el mismo conjunto leído desde `data/login-negativo.csv`, más ver el carrito, quitar el producto y checkout sin nombre. El usuario bloqueado sigue en el outline porque el reto lo pide.

`@login`, `@carrito` y `@checkout` van una sola vez, arriba de cada feature.

Quedó afuera ordenar el inventario, comprar varios productos y el logout.

## Herramientas

- Playwright abre Chromium y hace las comprobaciones.
- Cucumber ejecuta el Gherkin. Los pasos están en español.
- TypeScript en páginas y steps. `config/cucumber.js` los carga con `ts-node`.
- Cada escenario abre y cierra su navegador en `support/hooks.ts` y adjunta la captura final al reporte. Si falla, el trace queda en `evidencias/`. El tiempo máximo de un paso es 30 segundos.
- La URL y `HEADLESS` salen de `.env`. Los usuarios están escritos en el feature.
- GitHub Actions corre `npm test` en cada push a `main` y guarda el reporte de Allure. No hay despliegue.

## Page Object Model

Una clase por pantalla en `src/pages/`: login, productos, carrito, datos, resumen y confirmación.

La clase guarda los localizadores y las acciones (`login`, `addProductToCart`, `fillInformation`, `finishOrder`). Los steps solo las llaman. Un cambio de selector se corrige en la página.

## Qué afirma cada caso

- Login correcto: el título es `Products`.
- Login fallido: el mensaje contiene el texto de Sauce Demo.
- Carrito: el contador queda en `1`, el nombre aparece y, al quitarlo, la lista queda en cero.
- Compra: el resumen muestra el producto, subtotal, impuesto y total, y cierra con `Thank you for your order!`.
- Datos incompletos: `Error: First Name is required`.

Los comandos están en [README.md](README.md).
