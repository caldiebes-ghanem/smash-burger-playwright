// welcome page is a library to handle the actions and expected results in the welcoming page 
//based on the assignement, it is inherited from common and import the needed utils 

import { Page, expect } from '@playwright/test';
//mport { handleCookiesAndCloseAlert } from './cookiehandler';
import {Common} from '../utils/common';


export class WelcomePage extends Common {
  constructor(page: Page) {
    super(page);}

  async open(url:string) {
    await this.page.goto(url);
    await this.handleCookiesAndCloseAlert(this.page);
    await this.page.waitForTimeout(3000);

  }

 async handleCookiesAndCloseAlert(page: Page) {
  const frame = page.frameLocator('iframe[name="trustarc_cm"]');
  await frame.locator('body').waitFor({ state: 'visible', timeout: 10000 }).catch(() => {
    console.log("Cookie banner frame not found or not visible.");
    return;
  });
  const acceptAllBtn = frame.getByRole("button", { name: "Accept all" }).describe(`button to accept all cookies`);

  // Only run if cookie button is visible
  if (await acceptAllBtn.isVisible({ timeout: 10000 }).catch(() => false)) {
    await acceptAllBtn.click();

    // Small alert handling
    const closeAlertBtn = frame.getByRole("button", { name: "Close" }).describe(`button to close an alert`);
    if (await closeAlertBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await closeAlertBtn.click();
    }
  }
}


   async createYourOwn() {
    const ownyourburger= this.page.getByRole("heading", { name: "CREATE YOUR OWN" }).describe(`create your own burger welcoming`);
    await ownyourburger.waitFor({ state: "visible", timeout: 5000 }); 
}
   async startAnOrder() {
    await this.page.waitForLoadState("domcontentloaded");
    const startOrderButton = this.page.getByRole("link", { name: "Start an Order" }).describe(`Start an Order`);
    //await this.page.waitForTimeout(3000);
    //await expect(startOrderButton).toBeVisible({ timeout: 15000 });
    await startOrderButton.click();
  }

  async signIn() {
    await this.page.waitForTimeout(2000);
    const signInButton = this.page.getByRole("link", { name: "Sign In" }).describe("sign in button to connect");
    signInButton.click(); 

    const signInPage = this.page.getByRole("heading", { name: "Sign In" }).describe("sign in heading in the page of connexion");
    await expect(signInPage).toBeVisible({ timeout: 5000 });
    }

  async createAccount(){
    const createAccountButton = this.page.getByRole("link", { name: "Create an account" }).describe("Create an account link to be redirected to the creation account page");
    createAccountButton.click(); 

    const createAccountPage = this.page.getByRole("heading", { name: "Create an Account" }).describe("Create an Account heading in the page of creationg account");
    await expect(createAccountPage).toBeVisible({ timeout: 5000 });
    }

  async submitCreateAccount(){
    const createAccountButton = this.page.getByRole("button", { name: "Create an account" }).describe("Create an account button to submit the creation form");
    await createAccountButton.scrollIntoViewIfNeeded();
    await createAccountButton.focus();
    await createAccountButton.press("Enter"); // using pressing keys as other solution didn't work

    const accountPage = this.page.getByRole("heading", { name: "My Account" }).describe("My account heading in the page of account information");
    await expect(accountPage).toBeVisible({ timeout: 10000 });
}


  async submitSignIn(){
  const signInSubmit = this.page.getByRole("button", { name: "Sign In" }).describe("sign in button to submit the log in form");
  signInSubmit.click();

    }

  async displayErrorMessage(msg : string){
    
    const alert = this.page.getByRole('alert').filter({ hasText: msg}).describe(`error message: "${msg}"`);
    await expect(alert).toBeVisible({ timeout: 5000 });
    }
}
 