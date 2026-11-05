import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import { leerCsv } from '../../support/csv';
import { CustomWorld } from '../../support/world';

Given('que el usuario está en la página de inicio de sesión', async function (this: CustomWorld) {
    this.loginPage = new LoginPage(this.page, this.baseUrl);
    await this.loginPage.navigate();
});

When('ingresa el usuario {string} y la contraseña {string}', async function (this: CustomWorld, username: string, password: string) {
    const clave = password === 'configurada' ? this.saucePassword() : password;
    await this.loginPage!.enterCredentials(username, clave);
});

When('ingresa el usuario {string} y la contraseña configurada', async function (this: CustomWorld, username: string) {
    await this.loginPage!.enterCredentials(username, this.saucePassword());
});

When('intenta iniciar sesión con cada caso del archivo {string}', async function (this: CustomWorld, archivo: string) {
    for (const caso of leerCsv(archivo)) {
        const clave = caso.clave === 'configurada' ? this.saucePassword() : caso.clave;
        await this.loginPage!.navigate();
        await this.loginPage!.login(caso.usuario, clave);
        await expect(this.loginPage!.errorMessage).toContainText(caso.mensaje);
    }
});

When('presiona el botón de inicio de sesión', async function (this: CustomWorld) {
    await this.loginPage!.clickLogin();
});

Then('debería visualizar la página de productos', async function (this: CustomWorld) {
    await expect(this.page.locator('[data-test="title"]')).toHaveText('Products');
});

Then('debería visualizar el mensaje de error {string}', async function (this: CustomWorld, expectedMessage: string) {
    await expect(this.loginPage!.errorMessage).toContainText(expectedMessage);
});
