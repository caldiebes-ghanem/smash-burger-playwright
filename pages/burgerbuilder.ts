import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';

export class BurgerBuilder extends Common {
  constructor(page: Page) {
    super(page);
  }


  async selectRadio(Radio: string) {
    // const option = this.page.getByRole("radio", { name: Radio });
    // await expect(option).toBeVisible({ timeout: 2000 });
    // await option.check();
      const label = this.page.locator("label").filter({ hasText: Radio }).first();
      await expect(label).toBeVisible({ timeout: 2000 });
      const radio = label.locator('input[type="radio"]');
      await radio.check();
      await expect(radio).toBeChecked();
  }

  async selectExtra(extra : string){
    const option = this.page.locator("label").filter({ has: this.page.getByText(extra, { exact: true }) }).first();
    await expect(option).toBeVisible({ timeout: 2000 });
    await option.click();
  }

  async setQuantity(qty: number) {
    const plusButton = this.page.getByRole("button", { name: "+" });

    for (let i = 1; i < qty; i++) {
      await plusButton.click();
    }
  }

  async addToCart() {
    const addToCartButton = this.page.getByRole("button", { name: "Add to Cart - $" });
    await this.waitUntilVisibleAndClick(addToCartButton);
  }

  async ProceedToCheckout() {
    const checkout = this.page.getByRole("link", { name: /checkout/i});
    await checkout.click();

    }

}
