
const { expect } = require('@playwright/test');

class CheckoutOverviewPage {

    constructor(page) {
        this.page = page;

        // Localizadores del resumen de compra
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartItems = page.locator('.cart_item');
        this.itemNames = page.locator('.inventory_item_name');

        // Información económica
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');

        // Botón para finalizar
        this.finishButton = page.locator('#finish');
    }

    // Validar que estamos en el resumen de compra
    async verifyOverviewPage() {

        await expect(this.pageTitle).toHaveText('Checkout: Overview');

    }

    // Verificar que el producto esté en el resumen
    async verifyProduct(productName) {

        await expect(
            this.cartItems.filter({ hasText: productName })
        ).toHaveCount(1);

    }

    // Validar que los importes estén visibles
    async verifyPurchaseAmounts() {

        await expect(this.subtotal).toBeVisible();

        await expect(this.tax).toBeVisible();

        await expect(this.total).toBeVisible();

    }

    // Finalizar la compra
    async finishOrder() {

        await this.finishButton.click();

    }

}

module.exports = CheckoutOverviewPage;
