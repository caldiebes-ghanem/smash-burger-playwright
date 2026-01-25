import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';

export class Menu extends Common {
  constructor(page: Page) {
    super(page);
  }

  async menuDisplay(){
   const displaymenu = this.page.getByRole('heading', { name: 'Smashburger Menu' }).describe(`heading of the smashburger menu`);
   await expect(displaymenu).toBeVisible({ timeout: 5000 });
    }
    
  async choseType(type:string){
   const typeMenu = this.page.getByRole('link', { name: type }).describe(`link of the burger "${type}"`);
   typeMenu.click();
   const displaytypeMenu = this.page.getByRole('heading', { name: type }).describe(`display of the burger "${type}"`);
   await expect(displaytypeMenu).toBeVisible({ timeout: 5000 });
}

}