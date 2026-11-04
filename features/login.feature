@login
Feature: Inicio de sesión en Sauce Demo

  @smoke
  Scenario: Inicio de sesión exitoso con usuario estándar
    Given que el usuario está en la página de inicio de sesión
    When ingresa el usuario "standard_user" y la contraseña "secret_sauce"
    And presiona el botón de inicio de sesión
    Then debería visualizar la página de productos

  @regresion
  Scenario: Inicio de sesión fallido con credenciales incorrectas
    Given que el usuario está en la página de inicio de sesión
    When ingresa el usuario "usuario_invalido" y la contraseña "password_incorrecta"
    And presiona el botón de inicio de sesión
    Then debería visualizar el mensaje de error "Username and password do not match"

  @regresion
  Scenario: Inicio de sesión fallido con usuario bloqueado
    Given que el usuario está en la página de inicio de sesión
    When ingresa el usuario "locked_out_user" y la contraseña "secret_sauce"
    And presiona el botón de inicio de sesión
    Then debería visualizar el mensaje de error "Sorry, this user has been locked out"
