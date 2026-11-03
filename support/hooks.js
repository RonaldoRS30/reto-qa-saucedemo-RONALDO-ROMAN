const { Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

const { chromium } = require('@playwright/test');

// Tiempo máximo de espera para cada paso
setDefaultTimeout(30 * 1000);

// Antes de cada escenario
Before(async function () {

    this.browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true'
    });

    this.context = await this.browser.newContext();

    this.page = await this.context.newPage();

});

// Después de cada escenario
After(async function () {

    if (this.page) {
        await this.page.close();
    }

    if (this.context) {
        await this.context.close();
    }

    if (this.browser) {
        await this.browser.close();
    }

});