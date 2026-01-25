import { Page, expect } from '@playwright/test';
import {Common} from '../utils/common';
import { testData } from "../utils/testData";

export class PickUp extends Common {
  constructor(page: Page) {
    super(page);}

async pickUpLocation() {
  const input = this.page.locator("#LocationOrZipCode").describe(`field to assign location`);
  await input.waitFor({ state: 'attached' });
  await expect(input).toBeVisible();
  await input.click();
  await input.fill('');                // clear
  await input.fill(testData.zipCode);
  await expect(input).toHaveValue(testData.zipCode);

  // Pick the dropdown option that contains the zip
  //await this.page.getByRole("heading", { name: "Find a Location" }).click();
    const firstOption = this.page.locator('[role="option"]').first().describe(`location option`);
    try {
      await expect(firstOption).toBeVisible({ timeout: 3000 });
      await firstOption.click();
    } catch {
      const comboButton = this.page.locator('button[aria-haspopup="listbox"]').nth(1).describe(`location list`);
      await comboButton.click();
      await expect(comboButton).toBeVisible({ timeout: 1000 });
      await firstOption.click();
    }
  const searchButton = this.page.locator('button[type="submit"]', { hasText: "Search" }).describe(`search of location`);
  await searchButton.click();
}
 
async accesLocation(){
   const accessLoc = this.page.getByRole("link", { name: "Choose a location to order" }).describe("accessing chosing location in welcome page");
   await expect(accessLoc).toBeVisible({ timeout: 10000 });
   accessLoc.click(); 
}

    
async chosinglocation() {
      const location = testData.location;
      const secondStartOrder = this.page.locator('(//button[text()="Start Order"])[2]').describe(`confirm location to order from`);
      await secondStartOrder.click();
    }}