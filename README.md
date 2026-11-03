# Reto QA – Sauce Demo

Repositorio: https://github.com/RonaldoRS30/reto-qa-saucedemo-RONALDO-ROMAN

Automaticé el flujo de compra de [Sauce Demo](https://www.saucedemo.com/) con Playwright y Cucumber. Los casos están escritos en Gherkin y la interacción con la pantalla vive en Page Objects, así un cambio de selector se corrige en un solo lugar.

En [INFORME.md](INFORME.md) cuento por qué partí la suite así y qué decidí dejar afuera.

## Para correrla

Hace falta Node.js 18 o superior y npm.

En la raíz del proyecto:

```bash
npm install
npx playwright install chromium
```

El primero instala Cucumber, Playwright y dotenv. El segundo descarga Chromium, que es el navegador que abren los tests.

Después copia la configuración de ejemplo. En PowerShell:

```powershell
Copy-Item .env.example .env
```

En bash o Git Bash:

```bash
cp .env.example .env
```

`BASE_URL` es la dirección de Sauce Demo (`https://www.saucedemo.com/`). Con `HEADLESS=true` los tests corren sin ventana. Si lo pones en `false`, ves el navegador mientras avanza el caso. El `.env` no se sube; el ejemplo sí, para que cualquiera pueda repetir la ejecución.

## Comandos

Toda la suite:

```bash
npm test
```

Un flujo completo:

```bash
npm run test:smoke
npm run test:login
npm run test:carrito
npm run test:checkout
```

Un solo escenario, cuando estoy revisando un fallo puntual:

```bash
npm run test:login-exitoso
npm run test:login-invalid
npm run test:login-bloqueado
npm run test:carrito-agregar
npm run test:carrito-visualizar
npm run test:carrito-eliminar
npm run test:checkout-exitoso
npm run test:checkout-error
```

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
src/pages/                 una clase por pantalla
src/step-definitions/      unen el Gherkin con las páginas
support/world.js           carga el .env y prepara el World de Cucumber
support/hooks.js           abre y cierra el navegador en cada escenario
.env.example               plantilla de configuración
```
