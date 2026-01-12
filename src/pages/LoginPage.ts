import {Page, Locator, expect} from '@playwright/test';


export class LoginPage {

    readonly page: Page;
    readonly userInput: Locator;
    readonly passInput: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.userInput = page.locator('[data-test="username"]');
        this.passInput = page.locator('[data-test="password"]');
        this.loginBtn = page.locator('[data-test="login-button"]');
    }

    async navigate() {
        await this.page.goto('/');
    }

    async validatePageTitle(pageTitle: string) {
        await expect(this.page).toHaveTitle(pageTitle);
    }

    async performLoginUsingCredentials(user: string, pass: string) {
        await this.userInput.fill(user);
        await this.passInput.fill(pass);
        await this.loginBtn.click();
    }

    async validatePageToHaveURL(currentURL: string) {
        await expect(this.page).toHaveURL(currentURL);
    } 
}