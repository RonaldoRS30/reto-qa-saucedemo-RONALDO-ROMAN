@carrito
Feature: Gestión del carrito de compras en Sauce Demo

  @smoke
  Scenario: Agregar un producto al carrito
    Given que el usuario inicia sesión con "standard_user" y la contraseña configurada
    When agrega el producto "Sauce Labs Backpack" al carrito
    Then el contador del carrito debería mostrar "1"

  @regresion
  Scenario: Visualizar los productos agregados al carrito
    Given que el usuario inicia sesión con "standard_user" y la contraseña configurada
    When agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    Then debería visualizar el producto "Sauce Labs Backpack"

  @regresion
  Scenario: Eliminar un producto del carrito
    Given que el usuario inicia sesión con "standard_user" y la contraseña configurada
    When agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    And elimina el producto "Sauce Labs Backpack" del carrito
    Then el carrito debería estar vacío
