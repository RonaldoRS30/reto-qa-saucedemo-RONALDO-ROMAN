@login
Feature: Inicio de sesión en Sauce Demo

  @smoke
  Scenario: Inicio de sesión exitoso con usuario estándar
    Given que el usuario está en la página de inicio de sesión
    When ingresa el usuario "standard_user" y la contraseña configurada
    And presiona el botón de inicio de sesión
    Then debería visualizar la página de productos

  @regresion
  Scenario Outline: Inicio de sesión fallido - <caso>
    Given que el usuario está en la página de inicio de sesión
    When ingresa el usuario "<usuario>" y la contraseña "<clave>"
    And presiona el botón de inicio de sesión
    Then debería visualizar el mensaje de error "<mensaje>"

    Examples:
      | caso               | usuario          | clave               | mensaje                              |
      | credenciales malas | usuario_invalido | password_incorrecta | Username and password do not match   |
      | usuario bloqueado  | locked_out_user  | configurada         | Sorry, this user has been locked out |
      | usuario vacio      |                  | configurada         | Username is required                 |
      | clave vacia        | standard_user    |                     | Password is required                 |
