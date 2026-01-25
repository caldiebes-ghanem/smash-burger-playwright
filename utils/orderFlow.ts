import { WelcomePage } from '../pages/welcome';
import { PickUp } from '../pages/pickup';
import { BurgerBuilder } from '../pages/burgerbuilder';
import { Cart } from '../pages/cart';
import { Checkout } from '../pages/checkout';
import { testData } from "../utils/testData";

export async function setupToBurgerBuilder(page: any) {
  await page.context().clearCookies();
  await page.goto('about:blank');
  await page.addInitScript(() => {
    localStorage.clear();
    sessionStorage.clear();   });
  const welcomePage = new WelcomePage(page);
  const pickUp = new PickUp(page);

  await welcomePage.open(testData.urlCYO);
  await welcomePage.createYourOwn();
  await welcomePage.startAnOrder();
  await pickUp.pickUpLocation();
  await pickUp.chosinglocation();
  await welcomePage.createYourOwn();

  const burgerOrder = new BurgerBuilder(page);
  const cart = new Cart(page);
  const checkout = new Checkout(page);

  await burgerOrder.selectRadio(testData.size);
  await burgerOrder.selectRadio(testData.bun);
  await burgerOrder.selectRadio(testData.cheese);

  return { welcomePage, pickUp, burgerOrder, cart, checkout };
}