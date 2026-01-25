import { test } from '@playwright/test';
import { WelcomePage } from '../pages/welcome';
import { PickUp } from '../pages/pickup';
import { BurgerBuilder } from '../pages/burgerbuilder';
import { Cart } from '../pages/cart';
import { Checkout } from '../pages/checkout';
import { Menu } from '../pages/menu';


import { testData, userData, paymentData, generateEmail } from "../utils/testData";

test('Cart Page item image validation (inject images)', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "items with no images" },
    { type: "Expected Result", description: "mock response inject images" }
  );

  test.setTimeout(60000);
  const welcomePage = new WelcomePage(page);
  const pickUp = new PickUp(page);
  const menu = new Menu(page);
  const burgerOrder = new BurgerBuilder(page);
  const cart = new Cart(page);
  const checkout = new Checkout(page);

  
  await welcomePage.open(testData.url);
  await pickUp.accesLocation(); 
  await pickUp.pickUpLocation(); 
  await pickUp.chosinglocation();
  await menu.menuDisplay();
  await menu.choseType("SMASHBURGERS");
  await menu.choseType("TEST BACON STACK SMASH®");
  await burgerOrder.selectRadio(testData.sizeBaconStack);
  await burgerOrder.addToCart();
  await burgerOrder.returnToMenu();
  await menu.menuDisplay();
  await menu.choseType("SCORCHIN'");
  await menu.choseType("3 SCORCHIN' HOT TENDERS");
  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();
  await cart.mockImages();
  await cart.displayCart();
  await cart.synchronisation();
  await cart.validateImagesReplaced();

});

