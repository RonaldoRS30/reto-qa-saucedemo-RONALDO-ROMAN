# Cómo armé esta automatización

El reto pide que un cliente de Sauce Demo pueda entrar, agregar un producto y terminar la compra. Lo tomé como un flujo de punta a punta y lo partí en tres features: login, carrito y checkout. Cada archivo se lee como una historia corta, y si algo falla sé en qué tramo del negocio está.

La aplicación es https://www.saucedemo.com/.

## Qué cubrí

Con `standard_user` y `secret_sauce` el usuario entra, agrega Sauce Labs Backpack, lo ve en el carrito y llega hasta `Thank you for your order!`.

Al lado del camino feliz dejé los casos que tienen que fallar. Un login que siempre pasa no me dice si la suite distingue un error de un éxito:

- una clave que no existe
- `locked_out_user`, que Sauce Demo rechaza a propósito
- el checkout sin nombre, para ver que el formulario frena
- quitar el producto y comprobar que el carrito queda vacío

Dejé afuera ordenar el inventario, comprar varios productos distintos y el logout. El camino de compra y los rechazos de acceso ya cubren lo que pide el reto, y preferí afirmar bien esos casos antes de abrir más escenarios.

## Por qué Playwright con Cucumber

Playwright abre Chromium, espera los elementos y hace las comprobaciones. Cucumber se queda con el lenguaje del caso. Los pasos están en español y dicen lo que haría el usuario: agregar el producto, ver el mensaje, confirmar la compra. Para entender un escenario alcanza con leer el feature.

Cada caso abre su propio navegador en `support/hooks.js` y lo cierra al terminar. El carrito o la sesión de uno no se le pasan al siguiente. Si un paso se queda colgado, corta a los 30 segundos.

La URL y si el navegador se muestra salen de `.env`. Los usuarios los escribí en el feature: el reto los define y quiero que el caso se entienda sin abrir otro archivo.

## Page Object Model

Cada pantalla tiene su clase en `src/pages/`: login, productos, carrito, datos del comprador, resumen y confirmación.

Ahí están los localizadores y las acciones con nombre claro: `login`, `addProductToCart`, `fillInformation`, `finishOrder`. Los steps llaman a esos métodos y revisan el resultado. Si cambia el id de un botón, lo corrijo en la página y los features siguen igual.

Me sirvió sobre todo en el checkout, que cruza tres pantallas. Si los selectores hubieran quedado en los steps, `checkout.steps.js` se volvería difícil de seguir.

## Cómo decido que el caso pasó

Reviso en qué estado quedó la pantalla:

- Si el login es correcto, el título dice `Products`.
- Si falla, el mensaje trae el texto de Sauce Demo, sea por credenciales o porque el usuario está bloqueado.
- En el carrito, el contador marca `1`, aparece el nombre del producto y, al quitarlo, la lista queda en cero.
- En la compra, el resumen sigue mostrando el producto, se ven subtotal, impuesto y total, y al final aparece `Thank you for your order!`.
- Si faltan los datos, seguir adelante muestra `Error: First Name is required`.

## Para ejecutarla

Los comandos están en [README.md](README.md). Con `npm test` corre la suite completa.
