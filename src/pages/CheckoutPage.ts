import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly checkout_Button: Locator;
    readonly firstName_Input: Locator;
    readonly lastName_Input: Locator;
    readonly postalCode_Input: Locator;
    readonly summarySubtotal: Locator;
    readonly summaryTax: Locator;
    readonly summaryTotal: Locator;
    readonly continue_Button: Locator;
    readonly finish_Button: Locator;
    readonly complete_Header: Locator;

    constructor(page: Page) {
        this.page = page;

        this.checkout_Button = page.locator('[data-test="checkout"]');
        this.firstName_Input = page.locator('[data-test="firstName"]');
        this.lastName_Input = page.locator('[data-test="lastName"]');
        this.postalCode_Input = page.locator('[data-test="postalCode"]');
        this.summarySubtotal = page.locator('[data-test="subtotal-label"]');
        this.summaryTax = page.locator('[data-test="tax-label"]');
        this.summaryTotal = page.locator('[data-test="total-label"]');
        this.continue_Button = page.locator('[data-test="continue"]');
        this.finish_Button = page.locator('[data-test="finish"]');
        this.complete_Header = page.locator('[data-test="complete-header"]');
    }

    async proceedToCheckout() {
        await this.checkout_Button.click();
    }

    async fillDetails(fName: string, lName: string, zip: string) {
        await this.firstName_Input.fill(fName);
        await this.lastName_Input.fill(lName);
        await this.postalCode_Input.fill(zip);
        await this.continue_Button.click();
    }

    async verifyOrderSummary(itemPrices: number[], gstPercentage: number) {

        // Calculating the sum here for collected price values of selected items added to cart
        const expectedItemTotal = itemPrices.reduce((sum, price) => sum + price, 0);

        const subtotalText = await this.summarySubtotal.innerText();
        const taxText = await this.summaryTax.innerText();
        const totalText = await this.summaryTotal.innerText();

        // Using regular expression to replace non 0-9 characters from inner text of elements to proper calculation
        const actualSubtotal = parseFloat(subtotalText.replace(/[^0-9.]/g, ''));
        const actualTax = parseFloat(taxText.replace(/[^0-9.]/g, ''));
        const actualTotal = parseFloat(totalText.replace(/[^0-9.]/g, ''));

        // Validating actual subtotal without GST should match with expected items added total
        expect(actualSubtotal).toBe(expectedItemTotal);

        // Validating actual total with GST match with expected total calculated basis expected GST
        expect(actualTotal).toBeCloseTo(expectedItemTotal * gstPercentage,2);

        // Validating on UI only that actual total should match with sum of displayed sub total and GST
        expect(actualTotal).toBe(actualSubtotal + actualTax);
    }

    async completeOrder(currentURL: string) {
        await this.finish_Button.click();
        await expect(this.page).toHaveURL(currentURL);
    }

    async verifyOrderSuccess(message: string) {
        await expect(this.complete_Header).toHaveText(message);
    }
}