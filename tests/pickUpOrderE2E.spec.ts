import { test } from '@playwright/test';
import { WelcomePage } from '../pages/welcome';
import { PickUp } from '../pages/pickup';

test('Create Your own', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  const pickUp = new PickUp(page);

  
  await welcomePage.open();
  await welcomePage.createYourOwn();
  await welcomePage.startAnOrder();
  await pickUp.pickUpLocation(); 
  await pickUp.chosinglocation(); 
  await welcomePage.createYourOwn();


});

