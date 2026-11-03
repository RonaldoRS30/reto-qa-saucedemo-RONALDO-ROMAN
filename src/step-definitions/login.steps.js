
const { Given, When, Then } = require('@cucumber/cucumber');

const { expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');


// GIVEN: El usuario se encuentra en la página de login
Given('que el usuario está en la página de inicio de sesión', async function () {

    this.loginPage = new LoginPage(this.page, this.baseUrl);

    await this.loginPage.navigate();

});


// WHEN: El usuario ingresa sus credenciales
When('ingresa el usuario {string} y la contraseña {string}', async function (username, password) {

    await this.loginPage.enterCredentials(username, password);

});


// AND: El usuario presiona el botón de inicio de sesión
When('presiona el botón de inicio de sesión', async function () {

    await this.loginPage.clickLogin();

});


// THEN: El usuario visualiza la página de productos
Then('debería visualizar la página de productos', async function () {

    await expect(
        this.page.locator('[data-test="title"]')
    ).toHaveText('Products');

});

// THEN: El usuario visualiza un mensaje de error
Then('debería visualizar el mensaje de error {string}', async function (expectedMessage) {
    await expect(
        this.loginPage.errorMessage).toContainText(expectedMessage);
});
