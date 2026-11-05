# Reto QA – Sauce Demo

Repositorio: https://github.com/RonaldoRS30/reto-qa-saucedemo-RONALDO-ROMAN

Suite de Sauce Demo con Playwright, Cucumber y TypeScript. El detalle de la estrategia está en [INFORME.md](INFORME.md).

## Preparar

Node.js 18 o superior.

```bash
npm install
npx playwright install chromium
```

En PowerShell:

```powershell
Copy-Item .env.example .env
```

En bash:

```bash
cp .env.example .env
```

`BASE_URL` queda en `https://www.saucedemo.com/`. `HEADLESS=true` corre sin ventana. `HEADLESS=false` muestra el navegador.

## Ejecutar

| Comando | Qué corre |
|---|---|
| `npm test` | Los 10 escenarios |
| `npm run test:smoke` | Login exitoso, agregar al carrito y compra completa |
| `npm run test:regresion` | Login fallido (clave inválida, usuario bloqueado, usuario vacío y clave vacía), ver el carrito, quitar el producto y checkout sin datos |
| `npm run test:login` | Solo `features/login.feature` |
| `npm run test:carrito` | Solo `features/compra.feature` |
| `npm run test:checkout` | Solo `features/checkout.feature` |

## Allure

Hace falta Java. El reporte de la última ejecución ya está en el repositorio. Para abrirlo:

```bash
npm run allure-open
```

Si acabas de correr la suite, regenera antes de abrir:

```bash
npm test
npm run allure-generate
npm run allure-open
```

## CI

En cada push o pull request a `main`, GitHub Actions corre `npm test` en headless y publica el reporte de Allure en la pestaña Actions.
