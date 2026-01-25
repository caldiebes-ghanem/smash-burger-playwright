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

async addquantity(qte : number){
  const increase = this.page.getByRole('button', { name: 'Increase' });
  const quantity = this.page.locator('#quantity');

  for (let i = 0; i < qte - 1; i++) {
    const before = Number(await quantity.inputValue());
    await increase.click();
    await expect(quantity).toHaveValue(String(before + 1));
  }
}

async decreasequantity(qte : number){
  const decrease = this.page.getByRole('button', { name: 'Decrease' });
  const quantity = this.page.locator('#quantity');

  for (let i = 0; i < qte - 1; i++) {
    const before = Number(await quantity.inputValue());
    await decrease.click();
    await expect(quantity).toHaveValue(String(before - 1));
  }
}

async qteShouldBe (qte : number){
  const quantity = this.page.locator('input[type="number"]').first();
  await expect(quantity).toHaveValue(String(qte)); 
  }

async priceShouldBe(qte : number , price: number){
  const expectedTotal = qte * price;
  const actualTotalText = await this.page.locator('//td/span').first().innerText(); // "$9.98"
  const actualTotal = Number(actualTotalText.replace(/[^0-9.]/g, '')); // keeps digits + dot only
  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
  }

async totalShouldBe(qte:number, price: number, bagFee:number, tax:number){
  const expectedTotal = (qte * price) + bagFee + tax;
  const totalDD = this.page.locator('//dt[normalize-space()="Total"]/following-sibling::dd[1]');
  await expect(totalDD).not.toHaveText(/Updating/i);

  const actualTotalText = await totalDD.innerText();
  const actualTotal = Number(actualTotalText.trim().replace(/[^0-9.,]/g, '').replace(',', '.'));
  expect(actualTotal).toBeCloseTo(expectedTotal, 2);
}

async removeItem(){
  const removeButton= this.page.getByRole('button', { name: 'Remove CREATE YOUR OWN' });
  removeButton.click(); 
}
async displayCartEmptyMsg(){
  const displayMsg = this.page.getByRole('heading', { name: 'Your Cart is Empty' });
  await expect(displayMsg).toBeVisible({ timeout: 5000 });
  }
}