import { expect, Locator, Page } from '@playwright/test';

export default class CheckoutOverviewPage {
    private readonly page: Page;

    private readonly pageTitle: Locator;
    private readonly cartItems: Locator;
    private readonly subtotal: Locator;
    private readonly tax: Locator;
    private readonly total: Locator;
    private readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.cartItems = page.locator('.cart_item');
        this.subtotal = page.locator('.summary_subtotal_label');
        this.tax = page.locator('.summary_tax_label');
        this.total = page.locator('.summary_total_label');
        this.finishButton = page.locator('#finish');
    }

    async verifyOverviewPage(): Promise<void> {
        await expect(this.pageTitle).toHaveText('Checkout: Overview');
    }

    async verifyProduct(productName: string): Promise<void> {
        await expect(
            this.cartItems.filter({ hasText: productName })
        ).toHaveCount(1);
    }

    async verifyPurchaseAmounts(): Promise<void> {
        await expect(this.subtotal).toBeVisible();
        await expect(this.tax).toBeVisible();
        await expect(this.total).toBeVisible();
    }

    async finishOrder(): Promise<void> {
        await this.finishButton.click();
    }
}
