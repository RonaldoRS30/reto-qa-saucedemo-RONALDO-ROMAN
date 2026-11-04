import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage';
import ProductsPage from '../pages/ProductsPage';
import CartPage from '../pages/CartPage';
import { CustomWorld } from '../../support/world';

Given('que el usuario inicia sesión con {string} y {string}', async function (this: CustomWorld, username: string, password: string) {
    this.loginPage = new LoginPage(this.page, this.baseUrl);
    await this.loginPage.navigate();
    await this.loginPage.login(username, password);

    this.productsPage = new ProductsPage(this.page);
    await this.productsPage.verifyProductsPage();
});

When('agrega el producto {string} al carrito', async function (this: CustomWorld, productName: string) {
    await this.productsPage!.addProductToCart(productName);
});

Then('el contador del carrito debería mostrar {string}', async function (this: CustomWorld, expectedCount: string) {
    await expect(this.productsPage!.cartBadge).toHaveText(expectedCount);
});

When('ingresa al carrito de compras', async function (this: CustomWorld) {
    await this.productsPage!.openCart();
    this.cartPage = new CartPage(this.page);
});

Then('debería visualizar el producto {string}', async function (this: CustomWorld, productName: string) {
    await this.cartPage!.verifyProductInCart(productName);
});

When('elimina el producto {string} del carrito', async function (this: CustomWorld, productName: string) {
    await this.cartPage!.removeProduct(productName);
});

Then('el carrito debería estar vacío', async function (this: CustomWorld) {
    await this.cartPage!.verifyCartIsEmpty();
});
