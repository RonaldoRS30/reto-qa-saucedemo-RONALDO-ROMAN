import { Then, When } from '@cucumber/cucumber';
import CheckoutPage from '../pages/CheckoutPage';
import CheckoutOverviewPage from '../pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../pages/CheckoutCompletePage';
import { CustomWorld } from '../../support/world';

When('inicia el proceso de compra', async function (this: CustomWorld) {
    await this.cartPage!.proceedToCheckout();
    this.checkoutPage = new CheckoutPage(this.page);
});

When(
    'completa sus datos con nombre {string}, apellido {string} y código postal {string}',
    async function (this: CustomWorld, firstName: string, lastName: string, postalCode: string) {
        await this.checkoutPage!.fillInformation(firstName, lastName, postalCode);
    }
);

When('continúa al resumen de compra', async function (this: CustomWorld) {
    await this.checkoutPage!.continueToOverview();
    this.checkoutOverviewPage = new CheckoutOverviewPage(this.page);
    await this.checkoutOverviewPage.verifyOverviewPage();
});

When('continúa sin completar sus datos', async function (this: CustomWorld) {
    await this.checkoutPage!.continueWithoutInformation();
});

Then('debería visualizar el error de checkout {string}', async function (this: CustomWorld, expectedMessage: string) {
    await this.checkoutPage!.verifyErrorMessage(expectedMessage);
});

When('confirma la compra', async function (this: CustomWorld) {
    await this.checkoutOverviewPage!.verifyProduct('Sauce Labs Backpack');
    await this.checkoutOverviewPage!.verifyPurchaseAmounts();
    await this.checkoutOverviewPage!.finishOrder();
    this.checkoutCompletePage = new CheckoutCompletePage(this.page);
});

Then('debería visualizar el mensaje de confirmación {string}', async function (this: CustomWorld, expectedMessage: string) {
    await this.checkoutCompletePage!.verifyOrderConfirmation(expectedMessage);
});
