import { Page, expect } from "@playwright/test";
import {Common} from '../utils/common';

export class Menu extends Common {
  constructor(page: Page) {
    super(page);
  }

  async menuDisplay(){
   const displaymenu = this.page.getByRole('heading', { name: 'Smashburger Menu' });
   await expect(displaymenu).toBeVisible({ timeout: 5000 });
    }
    
  async choseType(type:string){
   const typeMenu = this.page.getByRole('link', { name: type });
   typeMenu.click();
   const displaytypeMenu = this.page.getByRole('heading', { name: type });
   await expect(displaytypeMenu).toBeVisible({ timeout: 5000 });
}

}