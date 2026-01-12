import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly inventoryItems_Buttons: Locator;
    readonly inventoryItems_Price: Locator;
    readonly cart_Badge: Locator;
    readonly cartLink_Button: Locator;

    constructor(page: Page) {
        this.page = page;

        this.inventoryItems_Buttons = page.locator('.inventory_item button');
        this.inventoryItems_Price = page.locator('[data-test="inventory-item-price"]'); 
        this.cart_Badge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink_Button = page.locator('[data-test="shopping-cart-link"]');

    }

    async addRandomItemsToCart(count: number): Promise<number[]> {
        const itemCount = await this.inventoryItems_Buttons.count();
        const selectedPrices: number[] = [];
        const selectedIndices: number[] = [];
        while (selectedIndices.length < count) {
            const randomIndex = Math.floor(Math.random() * itemCount);
            if (!selectedIndices.includes(randomIndex)) {
                selectedIndices.push(randomIndex);
            }
        }
        
        for (const index of selectedIndices) {

            const priceText = await this.inventoryItems_Price.nth(index).innerText();
            const priceValue = parseFloat(priceText.replace('$', ''));
            selectedPrices.push(priceValue);

            await this.inventoryItems_Buttons.nth(index).click();
        }
        return selectedPrices;
    }

    async verifyCartCount(expectedCount: number) {
        await expect(this.cart_Badge).toHaveText(expectedCount.toString());
    }

    async navigateToCart() {
        await this.cartLink_Button.click();
    }
}