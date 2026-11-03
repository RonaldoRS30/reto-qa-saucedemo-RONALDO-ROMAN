
const { expect } = require('@playwright/test');

class CheckoutCompletePage {

    constructor(page) {
        this.page = page;

        // Localizadores de confirmación
        this.pageTitle = page.locator('[data-test="title"]');
        this.confirmationHeader = page.locator('[data-test="complete-header"]');
        this.confirmationText = page.locator('[data-test="complete-text"]');
    }

    // Validar que se completó la compra
  
async verifyOrderConfirmation(expectedMessage) {

    await expect(this.pageTitle).toHaveText('Checkout: Complete!');

    await expect(this.confirmationHeader).toHaveText(expectedMessage);

}


}

module.exports = CheckoutCompletePage;
