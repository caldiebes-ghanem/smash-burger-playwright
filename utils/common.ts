//common fle , is a library that contains all the keywords that maybe generic and used everywhere
// it is a class so it can be exported and inherited everywhere

import { Page, expect, Locator } from "@playwright/test";

export class Common {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  async waitUntilVisibleAndClick(locator: Locator,timeout = 8000) {
  await locator.waitFor({ state: "visible", timeout });
  await locator.click();
}
  async fill(locator: Locator, value: string, timeout = 8000) {
  await locator.waitFor({ state: "visible", timeout });
  await locator.fill(value);
  }

}