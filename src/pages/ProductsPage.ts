import { expect, Locator, Page } from '@playwright/test';

export default class ProductsPage {
    private readonly page: Page;

    private readonly inventoryItems: Locator;
    readonly cartBadge: Locator;
    private readonly cartLink: Locator;
    private readonly pageTitle: Locator;

    constructor(page: Page) {
        this.page = page;
        this.inventoryItems = page.locator('.inventory_item');
        this.cartBadge = page.locator('.shopping_cart_badge');
        this.cartLink = page.locator('.shopping_cart_link');
        this.pageTitle = page.locator('[data-test="title"]');
    }

    async verifyProductsPage(): Promise<void> {
        await expect(this.pageTitle).toHaveText('Products');
    }

    async addProductToCart(productName: string): Promise<void> {
        const product = this.inventoryItems.filter({
            hasText: productName
        });

        await product.locator('button').click();
    }

    async openCart(): Promise<void> {
        await this.cartLink.click();
    }
}
