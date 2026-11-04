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
| `npm test` | Los 8 escenarios |
| `npm run test:smoke` | Login exitoso, agregar al carrito y compra completa |
| `npm run test:regresion` | Credenciales inválidas, usuario bloqueado, ver el carrito, quitar el producto y checkout sin datos |
| `npm run test:login` | Solo `features/login.feature` |
| `npm run test:carrito` | Solo `features/compra.feature` |
| `npm run test:checkout` | Solo `features/checkout.feature` |

## Allure

Hace falta Java. `npm test` deja los resultados en `allure-results`.

```bash
npm run allure-generate
npm run allure-open
```

Esas carpetas no se suben. Se vuelven a crear en cada ejecución.

## CI

En cada push o pull request a `main`, GitHub Actions corre `npm test` en headless y publica el reporte de Allure en la pestaña Actions.
