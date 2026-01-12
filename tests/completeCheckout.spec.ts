import { testWithLogin as test, expect } from '../src/fixtures/base';
import data from './../src/data/testData.json';

test.describe('Automated Test Suite for Sauce labs demo website', () => {

    test('User Login', { tag: '@sanity'}, async ({loginPage})=> {
        // Validate Page URL after login
        await loginPage.validatePageToHaveURL(data.pageURLs.inventoryPage);

    });
});
