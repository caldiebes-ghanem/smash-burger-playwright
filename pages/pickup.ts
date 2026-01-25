import { Page, expect } from '@playwright/test';
import {Common} from '../utils/common';
import { testData } from "../utils/testData";

export class PickUp extends Common {
  constructor(page: Page) {
    super(page);}

async pickUpLocation() {
  const input = this.page.locator("#LocationOrZipCode");
await input.waitFor({ state: 'attached' });
await expect(input).toBeVisible();
await input.click();
await input.fill(testData.zipCode);
await expect(input).toHaveValue(testData.zipCode);

  // Pick the dropdown option that contains the zip
  //await this.page.getByRole("heading", { name: "Find a Location" }).click();
    const firstOption = this.page.locator('[role="option"]').first();
    try {
      await expect(firstOption).toBeVisible({ timeout: 3000 });
      await firstOption.click();
    } catch {
      const comboButton = this.page.locator('button[aria-haspopup="listbox"]').nth(1);
      await comboButton.click();
      await firstOption.click();
    }

  // Click the actual Search *button* (not text)
  const searchButton = this.page.locator('button[type="submit"]', { hasText: "Search" });
  await searchButton.click();
  
  // Optional: wait for results indicator (replace with your real results locator)
  // await expect(this.page.getByText("Results")).toBeVisible();
}
 
   async chosinglocation() {
      
      const location = testData.location;
      const secondStartOrder = this.page.locator('(//button[text()="Start Order"])[2]');
      await secondStartOrder.click();
    }}