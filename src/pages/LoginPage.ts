import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly page: Page;
    private readonly baseUrl: string;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    readonly errorMessage: Locator;

    constructor(page: Page, baseUrl: string) {
        this.page = page;
        this.baseUrl = baseUrl;

        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
        this.errorMessage = page.locator('[data-test="error"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto(this.baseUrl);
    }

    async enterCredentials(username: string, password: string): Promise<void> {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
    }

    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterCredentials(username, password);
        await this.clickLogin();
    }
}
