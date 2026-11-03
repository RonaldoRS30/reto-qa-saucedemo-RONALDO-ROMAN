
const { When, Then } = require('@cucumber/cucumber');

const CheckoutPage = require('../pages/CheckoutPage');
const CheckoutOverviewPage = require('../pages/CheckoutOverviewPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

// WHEN: Iniciar el proceso de compra
When('inicia el proceso de compra', async function () {

    await this.cartPage.proceedToCheckout();

    this.checkoutPage = new CheckoutPage(this.page);

});

// WHEN: Completar los datos del comprador
When(
    'completa sus datos con nombre {string}, apellido {string} y código postal {string}',
    async function (firstName, lastName, postalCode) {

        await this.checkoutPage.fillInformation(
            firstName,
            lastName,
            postalCode
        );

    }
);

// WHEN: Continuar al resumen de compra
When('continúa al resumen de compra', async function () {

    await this.checkoutPage.continueToOverview();

    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);

    await this.checkoutOverviewPage.verifyOverviewPage();

});

// WHEN: Continuar sin completar los datos
When('continúa sin completar sus datos', async function () {

    await this.checkoutPage.continueWithoutInformation();

});

// THEN: Validar el error del formulario
Then('debería visualizar el error de checkout {string}', async function (expectedMessage) {

    await this.checkoutPage.verifyErrorMessage(expectedMessage);

});

// WHEN: Confirmar la compra
When('confirma la compra', async function () {

    await this.checkoutOverviewPage.verifyProduct('Sauce Labs Backpack');

    await this.checkoutOverviewPage.verifyPurchaseAmounts();

    await this.checkoutOverviewPage.finishOrder();

    this.checkoutCompletePage = new CheckoutCompletePage(this.page);

});

// THEN: Validar la confirmación de compra
Then('debería visualizar el mensaje de confirmación {string}', async function (expectedMessage) {

    await this.checkoutCompletePage.verifyOrderConfirmation(expectedMessage);

});
