
Feature: Gestión del carrito de compras en Sauce Demo

  @carrito @carrito_agregar_producto
  Scenario: Agregar un producto al carrito
    Given que el usuario inicia sesión con "standard_user" y "secret_sauce"
    When agrega el producto "Sauce Labs Backpack" al carrito
    Then el contador del carrito debería mostrar "1"

  @carrito @carrito_visualizar_productos
  Scenario: Visualizar los productos agregados al carrito
    Given que el usuario inicia sesión con "standard_user" y "secret_sauce"
    When agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    Then debería visualizar el producto "Sauce Labs Backpack"

  @carrito @carrito_eliminar_producto
  Scenario: Eliminar un producto del carrito
    Given que el usuario inicia sesión con "standard_user" y "secret_sauce"
    When agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    And elimina el producto "Sauce Labs Backpack" del carrito
    Then el carrito debería estar vacío
