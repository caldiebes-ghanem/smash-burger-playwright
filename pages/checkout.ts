import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';
import {paymentData } from "../utils/testData";

export class Checkout extends Common {
  constructor(page: Page) {
    super(page);
  }
 async checkout(){
  const checkout = this.page.locator('a[href="/cart/checkout"]').first();
  await checkout.scrollIntoViewIfNeeded();
  await checkout.click();
  await this.page.waitForURL("**/cart/checkout", { timeout: 10000 });
 }   

  async fillContactForm(label:string , value:string){
    const firstNameInput = this.page.getByLabel(label);
    await firstNameInput.fill(value);
    }

 async selectPaymentMeth(method:string){
    const paymntMeth = this.page.getByRole("radio", { name: method });
    await paymntMeth.click()
    await this.page.waitForURL("**/cart/checkout", { timeout: 10000 });
        }

 async paymentFormValidation(id:string , value:string){
    const frame = this.page.frameLocator('#hpc--card-frame');
    const input = frame.getByLabel(id);
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.click();
    await input.fill(value);
}
 
async confirmPayementForm(){
    const confirm = this.page.getByRole("button", { name: "Confirm" });
    await confirm.click(); 
    }

async placeOrder(){
    const confirm = this.page.getByRole("button", { name: "Place Order" });
    await confirm.click(); 
    }
async summaryValidation(){
    const confirmation = this.page.getByRole("heading", { name: "Thank You" });
    //await confirmation.waitFor({ state: "visible", timeout: 10000 });
    await expect(confirmation).toBeVisible({ timeout: 60000 });
    const summaryOrder = this.page.getByRole("button", { name: "Order Summary" });
    await summaryOrder.click();
    }

async checkoutQteIs(qte : number){
   const quantity = this.page.getByRole('cell', { name: String(qte) });
   await expect(quantity).toBeVisible({ timeout: 2000 });

    }
}
