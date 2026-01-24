import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';

export class Cart extends Common {
  constructor(page: Page) {
    super(page);
  }

  async validateProductInfo(product:string){
    const option = this.page.locator("li").filter({ hasText: product }).first();
    await expect(option).toBeVisible();
}
}
