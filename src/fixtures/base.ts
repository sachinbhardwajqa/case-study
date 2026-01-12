import { test as base } from '@playwright/test';

// Importing required pages to declare fixtures
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CheckoutPage } from '../pages/CheckoutPage';

// Importing test data
import data from '../data/testData.json';

// Declaring the fixtures here
type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    checkoutPage: CheckoutPage;
};

// Declaring the Auth Fixture here
type AuthFixtures = {
    auth: void; 
};

// Extending base test to include required fixtures
export const test = base.extend<MyFixtures> ({
    loginPage: async({page}, use) => {
        await use (new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    }
});

// Using AuthFixture to extend to enable auto login
export const testWithLogin = test.extend<AuthFixtures>({
    
    auth: [async ({ loginPage, page }, use) => {
        
        // Open Login Page and Validate Page Title
        await loginPage.navigate();
        await loginPage.validatePageTitle(data.pageTitles.loginPage);

        // Login using credentials from test data file
        await loginPage.performLoginUsingCredentials(data.credentials.user, data.credentials.pass);

        await use(); 
        
    }, { auto: true }] 
});

// For single line import statement in test class for fixtures and expect
export {expect} from '@playwright/test';