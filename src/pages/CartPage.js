
const { expect } = require('@playwright/test');

class CartPage {

    constructor(page) {
        this.page = page;

        // Localizadores de los elementos del carrito
        this.cartItems = page.locator('.cart_item');
        this.cartItemNames = page.locator('.inventory_item_name');
        this.checkoutButton = page.locator('#checkout');
        this.continueShoppingButton = page.locator('#continue-shopping');
    }

    // Validar que el producto esté en el carrito
    async verifyProductInCart(productName) {
        await expect(
            this.cartItems.filter({ hasText: productName })
        ).toHaveCount(1);
    }

    // Eliminar un producto del carrito
    async removeProduct(productName) {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    // Validar que el carrito esté vacío
    async verifyCartIsEmpty() {
        await expect(this.cartItems).toHaveCount(0);
    }

    // Iniciar el proceso de compra
    async proceedToCheckout() {
        await this.checkoutButton.click();
    }
}

module.exports = CartPage;
