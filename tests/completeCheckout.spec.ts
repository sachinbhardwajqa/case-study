import { testWithLogin as test, expect } from '../src/fixtures/base';
import data from '../src/data/testData.json';

test.describe('Automated Test Suite for Sauce labs demo website', () => {

    test.beforeEach('Verify Login Page', async ({loginPage})=> {

        // Validate Page URL post auto login fixture use
        await loginPage.validatePageToHaveURL(data.pageURLs.inventoryPage);

    });

    test('Customer flow of selecting 3 random items and completing the checkout flow', { tag: '@sanity'}, async ({inventoryPage, checkoutPage}) => {

        const itemsToSelect = data.noOfItemsToBeAddedInCart;
        const customer = data.customer; 

        const selectedPrices = await inventoryPage.addRandomItemsToCart(itemsToSelect);
        await inventoryPage.verifyCartCount(itemsToSelect);
        await inventoryPage.navigateToCart();
        
        await checkoutPage.proceedToCheckout();
        await checkoutPage.fillDetails(customer.firstName, customer.lastName, customer.zip);

        const gstCalculationMultiplier = 1 + (data.gstPercentage/100);
        await checkoutPage.verifyOrderSummary(selectedPrices, gstCalculationMultiplier);

        await checkoutPage.completeOrder(data.pageURLs.checkoutCompletePage);
        
        await checkoutPage.verifyOrderSuccess(data.messages.successParams);
    });
    

    test.afterEach('Clear Browser Local Storage', async ({page}) => {
        await page.evaluate(() => window.localStorage.clear());
    });
});
