
const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {
        this.page = page;

        // Localizadores del formulario de checkout
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');

        // Botones y mensajes
        this.continueButton = page.locator('#continue');
        this.errorMessage = page.locator('[data-test="error"]');
        this.pageTitle = page.locator('[data-test="title"]');
    }

    // Completar los datos del comprador
    async fillInformation(firstName, lastName, postalCode) {

        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.fill(lastName);

        await this.postalCodeInput.fill(postalCode);

    }

    // Continuar al resumen de compra
    async continueToOverview() {

        await this.continueButton.click();

    }

    // Continuar sin completar los datos
    async continueWithoutInformation() {

        await this.continueButton.click();

    }

    // Validar el mensaje de error
    async verifyErrorMessage(expectedMessage) {

        await expect(this.errorMessage).toContainText(expectedMessage);

    }

}

module.exports = CheckoutPage;
