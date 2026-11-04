import { expect, Locator, Page } from '@playwright/test';

export default class CheckoutCompletePage {
    private readonly page: Page;

    private readonly pageTitle: Locator;
    private readonly confirmationHeader: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.locator('[data-test="title"]');
        this.confirmationHeader = page.locator('[data-test="complete-header"]');
    }

    async verifyOrderConfirmation(expectedMessage: string): Promise<void> {
        await expect(this.pageTitle).toHaveText('Checkout: Complete!');
        await expect(this.confirmationHeader).toHaveText(expectedMessage);
    }
}
