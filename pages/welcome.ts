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
    await ownyourburger.waitFor({ state: "visible", timeout: 8000 });
}
   async startAnOrder() {
    const startOrderButton = this.page.getByRole("link", { name: "Start an Order" });
    const findLocation= this.page.getByRole("heading", { name: "Find a Location" });

    await this.waitUntilVisibleAndClick(startOrderButton);
    await findLocation.waitFor({ state: "visible", timeout: 8000 });


  }
}
