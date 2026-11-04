# Reto QA – Sauce Demo

Repositorio: https://github.com/RonaldoRS30/reto-qa-saucedemo-RONALDO-ROMAN

Automaticé el flujo de compra de [Sauce Demo](https://www.saucedemo.com/) con Playwright y Cucumber. Los casos están escritos en Gherkin y las páginas en TypeScript, con Page Object Model. 


## Para correrla

Hace falta Node.js 18 o superior y npm.

En la raíz del proyecto:

```bash
npm install
npx playwright install chromium
```

El primero instala Cucumber, Playwright, TypeScript, ts-node y dotenv. El segundo descarga Chromium, que es el navegador que abren los tests.


`BASE_URL` es la dirección de Sauce Demo (`https://www.saucedemo.com/`). Con `HEADLESS=true` los tests corren sin ventana. Si lo pones en `false`, ves el navegador mientras avanza el caso. El `.env` no se sube; el ejemplo sí, para que cualquiera pueda repetir la ejecución.

## Comandos

Toda la suite:

```bash
npm test
```

Smoke es el camino feliz de cada flujo: login, agregar al carrito y compra. Regresión son los casos que comprueban que lo demás sigue en pie: accesos rechazados, ver y quitar el producto, y el formulario incompleto.

```bash
npm run test:smoke
npm run test:regresion
npm run test:login
npm run test:carrito
npm run test:checkout
```

El reporte de Allure se arma después de una ejecución. `npm test` escribe la carpeta `allure-results`. Para verla en el navegador:

```bash
npm run allure-generate
npm run allure-open
```

Eso necesita Java instalado, porque el visor de Allure corre sobre Java. Esas carpetas no se suben al repositorio: se regeneran cada vez que corres la suite.

En GitHub Actions la suite corre sola en cada push o pull request a `main`. El workflow instala Node y Chromium, ejecuta `npm test` en headless y deja el reporte de Allure como artefacto descargable en la pestaña Actions. También se puede lanzar a mano con Run workflow.

## Qué prueba cada feature

`features/login.feature` entra con el usuario estándar, rechaza una clave incorrecta y también al usuario bloqueado.

`features/compra.feature` agrega Sauce Labs Backpack, lo busca en el carrito y después lo elimina.

`features/checkout.feature` termina la compra hasta el mensaje de agradecimiento, y también intenta seguir sin llenar el formulario.

## Usuarios

Sauce Demo publica estas cuentas. Las dos usan la contraseña `secret_sauce`.

`standard_user` entra al inventario y puede comprar. `locked_out_user` se queda en el login y la página avisa que la cuenta está bloqueada.

Los dejé escritos en los features porque el reto los fija y el escenario se lee solo. La URL y el modo headless sí salen del `.env`, porque cambian según la máquina.

## Cómo está el código

```text
features/                  escenarios en Gherkin
src/pages/                 una clase por pantalla, en TypeScript
src/step-definitions/      unen el Gherkin con las páginas
support/world.ts           carga el .env y prepara el World de Cucumber
support/hooks.ts           abre y cierra el navegador en cada escenario
config/cucumber.js         le dice a Cucumber que traduzca los .ts con ts-node
.env.example               plantilla de configuración
```
