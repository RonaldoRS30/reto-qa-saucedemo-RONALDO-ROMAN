import { IWorldOptions, setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import dotenv from 'dotenv';
import LoginPage from '../src/pages/LoginPage';
import ProductsPage from '../src/pages/ProductsPage';
import CartPage from '../src/pages/CartPage';
import CheckoutPage from '../src/pages/CheckoutPage';
import CheckoutOverviewPage from '../src/pages/CheckoutOverviewPage';
import CheckoutCompletePage from '../src/pages/CheckoutCompletePage';

dotenv.config();

export class CustomWorld extends World {
    browser: Browser | null = null;
    context: BrowserContext | null = null;
    page!: Page;
    baseUrl: string;

    loginPage?: LoginPage;
    productsPage?: ProductsPage;
    cartPage?: CartPage;
    checkoutPage?: CheckoutPage;
    checkoutOverviewPage?: CheckoutOverviewPage;
    checkoutCompletePage?: CheckoutCompletePage;
    productName?: string;

    constructor(options: IWorldOptions) {
        super(options);
        this.baseUrl = process.env.BASE_URL ?? '';
    } 
    saucePassword(): string {
        const password = process.env.SAUCE_PASSWORD;
        if (!password) {
            throw new Error('Falta SAUCE_PASSWORD en el entorno');
        }
        return password;
    }
}

setWorldConstructor(CustomWorld);
