# case-study
Purpose - Confidential

# Automated Test Suite for Website - SauceDemo

## Overview
This Automation suite automates the "Sauce Labs Demo" website checkout flow. 
It selects 3 random items and completes the checkout with proper assertions including verifying order summary amount basis provided GST percentage.

## Tech Stack
* Language: TypeScript
* Framework: Playwright
* Pattern: Page Object Model (POM) with Custom Fixtures

## Prerequisites
* Node.js (used v24.12.0, recommended v14+)
* npm

## Setup & Execution
1.  Install dependencies: npm install

2.  Run All Tests: 'npx playwright test' or Run Sanity Tests : 'npx playwright test --grep @sanity' or Run Smoke Tests : 'npx playwright test --grep @smoke'

3.  Open Report: npx playwright show-report

## Design Decisions
* Custom Fixtures: Used to decouple page initialization from test logic, improving readability. Created Auth Auto Fixture as well to enable auto login in completeCheckout test case
* Randomization Logic: Implemented in page - 'InventoryPage.ts' using set to ensure true randomness without duplicates.
* Data Separation: Test data is isolated in 'testData.json' for easy updates.
* Folder Structure: Used simple project structure - src/data, src/fixtures, src/pages, tests for test cases
* Customized config file for reporting as html and json, trace to capture - 'on-first-retry', screenshot to capture - 'only-on-failure', headless mode as false and launchOptions for slow motion execution to wait 1 second post every operation
