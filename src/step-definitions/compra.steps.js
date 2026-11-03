
const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');
const CartPage = require('../pages/CartPage');

// GIVEN: El usuario inicia sesión
Given('que el usuario inicia sesión con {string} y {string}', async function (username, password) {

    this.loginPage = new LoginPage(this.page, this.baseUrl);

    await this.loginPage.navigate();

    await this.loginPage.login(username, password);

    this.productsPage = new ProductsPage(this.page);

    await this.productsPage.verifyProductsPage();
});

// WHEN: El usuario agrega un producto al carrito
When('agrega el producto {string} al carrito', async function (productName) {

    await this.productsPage.addProductToCart(productName);

});

// THEN: Se valida el contador del carrito
Then('el contador del carrito debería mostrar {string}', async function (expectedCount) {

    await expect(
        this.productsPage.cartBadge
    ).toHaveText(expectedCount);

});

// WHEN: Ingresar al carrito de compras
When('ingresa al carrito de compras', async function () {

    await this.productsPage.openCart();

    this.cartPage = new CartPage(this.page);

});

// THEN: Visualizar un producto en el carrito
Then('debería visualizar el producto {string}', async function (productName) {

    await this.cartPage.verifyProductInCart(productName);

});

// WHEN: Eliminar un producto del carrito
When('elimina el producto {string} del carrito', async function (productName) {

    await this.cartPage.removeProduct(productName);

});

// THEN: Validar que el carrito esté vacío
Then('el carrito debería estar vacío', async function () {

    await this.cartPage.verifyCartIsEmpty();

});
