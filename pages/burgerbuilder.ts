import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';

export class BurgerBuilder extends Common {
  constructor(page: Page) {
    super(page);
  }


  async selectRadio(Radio: string) {
      const label = this.page.locator("label").filter({ hasText: Radio }).first();
      await expect(label).toBeVisible({ timeout: 2000 });
      const radio = label.locator('input[type="radio"]').describe(`Select radio option "${Radio}"`);
      await radio.check();
      await expect(radio).toBeChecked();
  }

  async selectExtra(extra : string){
    const option = this.page.locator("label").filter({ has: this.page.getByText(extra, { exact: true }) }).first().describe(`Select extra modifiers option "${extra}"`);
    await expect(option).toBeVisible({ timeout: 2000 });
    await option.click();
  }

  async setQuantity(qty: number) {
    const plusButton = this.page.getByRole("button", { name: "+" }).describe(`Setting quantity to "${qty}"`);

    for (let i = 1; i < qty; i++) {
      await plusButton.click();
    }
  }

  async addToCart() {
    const addToCartButton = this.page.getByRole("button", { name: "Add to Cart - $" }).describe(`Adding to cart`);
    await this.waitUntilVisibleAndClick(addToCartButton);
  }

  async ProceedToCheckout() {
    const checkout = this.page.getByRole("link", { name: /checkout/i}).describe(`the link to proceed to checkout`);
    await checkout.click();

    }

  async returnToMenu(){
    const returnToMenu = this.page.getByRole("link", { name: "Return to menu"}).describe(`the link to return to menu`);
    await returnToMenu.click();
    }
}
