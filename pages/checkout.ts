import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';
import {paymentData } from "../utils/testData";

export class Checkout extends Common {
  constructor(page: Page) {
    super(page);
  }
 async checkout(){
  const checkout = this.page.locator('a[href="/cart/checkout"]').first().describe(`checkout button`);
  await checkout.scrollIntoViewIfNeeded();
  await checkout.click();
  await this.page.waitForURL("**/cart/checkout", { timeout: 10000 });
 }   

  async fillContactForm(label:string , value:string){
    const firstNameInput = this.page.getByLabel(label).describe(`the field "${label}"`);
    await firstNameInput.fill(value);
    }

 async selectPaymentMeth(method:string){
    const paymntMeth = this.page.getByRole("radio", { name: method }).describe(`payment method "${method}"`);
    await paymntMeth.click()
    await this.page.waitForURL("**/cart/checkout", { timeout: 10000 });
        }

 async paymentFormValidation(id:string , value:string){
    const frame = this.page.frameLocator('#hpc--card-frame');
    const input = frame.getByLabel(id).describe(`payment field "${id}"`);
    await expect(input).toBeVisible({ timeout: 10000 });
    await input.click();
    await input.fill(value);
}
 
async confirmPayementForm(){
    const confirm = this.page.getByRole("button", { name: "Confirm" }).describe(`button of payment confirmation`);
    await confirm.click(); 
    }

async placeOrder(){
    const confirm = this.page.getByRole("button", { name: "Place Order" }).describe(`button of placing order`);
    await confirm.click(); 
    }
async summaryValidation(){
    const confirmation = this.page.getByRole("heading", { name: "Thank You" }).describe(`confirmation of passing the order`);
    await expect(confirmation).toBeVisible({ timeout: 60000 });
    const summaryOrder = this.page.getByRole("button", { name: "Order Summary" }).describe(`order summary to validate informations`);
    await summaryOrder.click();
    }

async checkoutQteIs(qte : number){
   const quantity = this.page.getByRole('cell', { name: String(qte) }).describe(`order summary's qte "qte"`);
   await expect(quantity).toBeVisible({ timeout: 2000 });

    }
}
