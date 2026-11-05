import { After, Before, ITestCaseHookParameter, setDefaultTimeout, Status } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import fs from 'fs';
import { CustomWorld } from './world';

setDefaultTimeout(30 * 1000);

Before(async function (this: CustomWorld) {
    this.browser = await chromium.launch({
        headless: process.env.HEADLESS !== 'false'
    });

    this.context = await this.browser.newContext();
    await this.context.tracing.start({ screenshots: true, snapshots: true });
    this.page = await this.context.newPage();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    if (this.page) {
        const image = await this.page.screenshot({ fullPage: true });
        await this.attach(image, 'image/png');
    }

    if (scenario.result?.status === Status.FAILED) {
        fs.mkdirSync('evidencias', { recursive: true });
        const nombre = scenario.pickle.name.replace(/[^a-z0-9]+/gi, '-');
        await this.context?.tracing.stop({ path: `evidencias/trace-${nombre}.zip` });
    } else {
        await this.context?.tracing.stop();
    }

    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
});
