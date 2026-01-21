import { test } from '@playwright/test';
import { WelcomePage } from '../pages/welcome';

test('Create Your own', async ({ page }) => {
  const welcomePage = new WelcomePage(page);
  
  await welcomePage.open();
  await welcomePage.createYourOwn();
  await welcomePage.startAnOrder();
});

