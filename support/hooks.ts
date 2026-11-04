import { After, Before, ITestCaseHookParameter, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: process.env.HEADLESS === 'true'
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    if (scenario.result?.status === Status.FAILED && this.page) {
        const image = await this.page.screenshot({ fullPage: true });
        await this.attach(image, 'image/png');
    }

    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});
