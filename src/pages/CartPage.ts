import { expect, Locator, Page } from '@playwright/test';

export default class CartPage {
    private readonly page: Page;

    private readonly cartItems: Locator;
    private readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.locator('.cart_item');
        this.checkoutButton = page.locator('#checkout');
    }

    async verifyProductInCart(productName: string): Promise<void> {
        await expect(
            this.cartItems.filter({ hasText: productName })
        ).toHaveCount(1);
    }

    async removeProduct(productName: string): Promise<void> {
        const product = this.cartItems.filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    async verifyCartIsEmpty(): Promise<void> {
        await expect(this.cartItems).toHaveCount(0);
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
    }
}
