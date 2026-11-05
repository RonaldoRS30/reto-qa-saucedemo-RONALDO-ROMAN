import { Locator, Page } from '@playwright/test';

export default class LoginPage {
    private readonly page: Page;
    private readonly baseUrl: string;

    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    readonly errorMessage: Locator;

    private typedUsername = '';
    private typedPassword = '';

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
        this.typedUsername = username;
        this.typedPassword = password;
        await this.writeCredentials();
    }

    async clickLogin(): Promise<void> {
        await this.writeCredentials();
        await this.loginButton.click();
    }

    private async writeCredentials(): Promise<void> {
        await this.writeInput(this.usernameInput, this.typedUsername);
        await this.writeInput(this.passwordInput, this.typedPassword);
        if (this.typedUsername === '') {
            await this.writeInput(this.usernameInput, '');
        }
        if (this.typedPassword === '') {
            await this.writeInput(this.passwordInput, '');
        }
    }

    private async writeInput(input: Locator, value: string): Promise<void> {
        await input.fill(value);
        await input.evaluate((element, next: string) => {
            const field = element as HTMLInputElement;
            const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;
            setter?.call(field, next);
            field.dispatchEvent(new Event('input', { bubbles: true }));
        }, value);
    }

    async login(username: string, password: string): Promise<void> {
        await this.enterCredentials(username, password);
        await this.clickLogin();
    }
}
