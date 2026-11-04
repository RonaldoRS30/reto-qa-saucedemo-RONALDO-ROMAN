import { expect, Locator, Page } from '@playwright/test';

export default class CheckoutPage {
    private readonly page: Page;

    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueButton: Locator;
    private readonly errorMessage: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = page.locator('#first-name');
        this.lastNameInput = page.locator('#last-name');
        this.postalCodeInput = page.locator('#postal-code');
        this.continueButton = page.locator('#continue');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async fillInformation(firstName: string, lastName: string, postalCode: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
    }

    async continueToOverview(): Promise<void> {
        await this.continueButton.click();
    }

    async continueWithoutInformation(): Promise<void> {
        await this.continueButton.click();
    }

    async verifyErrorMessage(expectedMessage: string): Promise<void> {
        await expect(this.errorMessage).toContainText(expectedMessage);
    }
}
