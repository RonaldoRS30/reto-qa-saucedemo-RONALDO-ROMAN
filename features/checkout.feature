@checkout
Feature: Proceso de compra en Sauce Demo

  @smoke
  Scenario: Completar una compra exitosamente
    Given que el usuario inicia sesión con "standard_user" y "secret_sauce"
    And agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    When inicia el proceso de compra
    And completa sus datos con nombre "Ronaldo", apellido "Roman" y código postal "15012"
    And continúa al resumen de compra
    And confirma la compra
    Then debería visualizar el mensaje de confirmación "Thank you for your order!"

  @regresion
  Scenario: Intentar continuar sin completar los datos obligatorios
    Given que el usuario inicia sesión con "standard_user" y "secret_sauce"
    And agrega el producto "Sauce Labs Backpack" al carrito
    And ingresa al carrito de compras
    When inicia el proceso de compra
    And continúa sin completar sus datos
    Then debería visualizar el error de checkout "Error: First Name is required"
