
const { expect } = require('@playwright/test');

class ProductsPage {

    constructor(page) {
        this.page = page;

        // Localizadores de los elementos de la página
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('[data-test="title"]');
    }

    // Validar que estamos en la página de productos
    async verifyProductsPage() {
        await expect(this.pageTitle).toHaveText('Products');
    }

    // Agregar un producto al carrito por su nombre
    async addProductToCart(productName) {
        const product = this.inventoryItems.filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    // Abrir el carrito de compras
    async openCart() {
        await this.cartLink.click();
    }
}

module.exports = ProductsPage;
