# Reto QA – Sauce Demo

Repositorio: https://github.com/RonaldoRS30/reto-qa-saucedemo-RONALDO-ROMAN

Suite de pruebas automatizadas de extremo a extremo para [Sauce Demo](https://www.saucedemo.com/), hecha con Playwright y Cucumber (Gherkin) y organizada con el patrón Page Object Model.

Cubre inicio de sesión, carrito y compra hasta la confirmación, incluyendo usuario estándar, credenciales inválidas y usuario bloqueado.

La estrategia de automatización y los patrones usados están en [INFORME.md](INFORME.md).

## Requisitos

- Node.js 18 o superior
- npm

## Instalación

Desde la raíz del proyecto:

```bash
npm install
npx playwright install chromium
```

`npm install` instala Cucumber, Playwright y dotenv. El segundo comando descarga el navegador Chromium que usan los tests.

## Configuración

Copia el ejemplo de variables y ajústalo si hace falta:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

| Variable   | Uso                                                                 |
|------------|---------------------------------------------------------------------|
| `BASE_URL` | Dirección de Sauce Demo. Valor esperado: `https://www.saucedemo.com/` |
| `HEADLESS` | `true` ejecuta sin ventana. `false` muestra el navegador.          |

El archivo `.env` no se sube al repositorio. `.env.example` sí, para que cualquiera pueda recrearlo.

## Ejecución

Toda la suite:

```bash
npm test
```

Por flujo:

```bash
npm run test:smoke
npm run test:login
npm run test:carrito
npm run test:checkout
```

Por escenario:

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

## Escenarios

| Feature | Qué valida |
|---------|------------|
| `features/login.feature` | Login correcto, credenciales inválidas y usuario bloqueado |
| `features/compra.feature` | Agregar un producto, verlo en el carrito y eliminarlo |
| `features/checkout.feature` | Compra completa y error al continuar sin datos obligatorios |

## Usuarios de prueba

Sauce Demo publica estas cuentas. La contraseña de ambas es `secret_sauce`.

| Usuario           | Resultado esperado                          |
|-------------------|---------------------------------------------|
| `standard_user`   | Entra al inventario y puede comprar         |
| `locked_out_user` | No entra. Muestra que el usuario está bloqueado |

## Estructura

```text
features/                  Escenarios en Gherkin
src/pages/                 Page Objects (localizadores y acciones)
src/step-definitions/      Steps que conectan Gherkin con las páginas
support/world.js           World de Cucumber y carga de .env
support/hooks.js           Abre y cierra el navegador en cada escenario
.env.example               Plantilla de configuración
```

## Credenciales y datos

Los usuarios van escritos en los features, porque el reto los fija. La URL y el modo headless salen de `.env`, para no dejar la dirección de la aplicación hardcodeada en el código.
