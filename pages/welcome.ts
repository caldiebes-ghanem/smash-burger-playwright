// welcome page is a library to handle the actions and expected results in the welcoming page 
//based on the assignement, it is inherited from common and import the needed utils 

import { Page, expect } from '@playwright/test';
import { handleCookiesAndCloseAlert } from './cookiehandler';
import {Common} from '../utils/common';


export class WelcomePage extends Common {
  constructor(page: Page) {
    super(page);}

  async open() {
    await this.page.goto('https://dev.smashburger.com/menu/smashburgers/create-your-own');
    await handleCookiesAndCloseAlert(this.page);
  }

   async createYourOwn() {
    const ownyourburger= this.page.getByRole("heading", { name: "CREATE YOUR OWN" });
    await ownyourburger.waitFor({ state: "visible", timeout: 5000 }); 
}
   async startAnOrder() {
    await this.page.waitForLoadState("domcontentloaded");
    const startOrderButton = this.page.getByRole("link", { name: "Start an Order" });
    await this.page.waitForTimeout(3000);
    //await expect(startOrderButton).toBeVisible({ timeout: 15000 });
    await startOrderButton.click();
  }
  
}
 