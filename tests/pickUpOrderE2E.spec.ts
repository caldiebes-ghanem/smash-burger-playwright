import { test } from '@playwright/test';
import { WelcomePage } from '../pages/welcome';
import { PickUp } from '../pages/pickup';
import { BurgerBuilder } from '../pages/burgerbuilder';
import { Cart } from '../pages/cart';
import { Checkout } from '../pages/checkout';

import { testData, userData, paymentData, generateEmail } from "../utils/testData";

test('Place pickup order with “Create Your Own” burger + validate details across pages', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "cart is empty" },
    { type: "Expected Result", description: "validate information cross all phases (oder, checkout &summary)" }
  );

  test.setTimeout(60000);
  const welcomePage = new WelcomePage(page);
  const pickUp = new PickUp(page);
  const burgerOrder = new BurgerBuilder(page);
  const cart = new Cart(page);
  const checkout = new Checkout(page);

  
  await welcomePage.open();
  await welcomePage.createYourOwn();
  await welcomePage.startAnOrder();
  await pickUp.pickUpLocation(); 
  await pickUp.chosinglocation(); 
  await welcomePage.createYourOwn();
  await burgerOrder.selectRadio(testData.size);
  await burgerOrder.selectRadio(testData.bun);
  await burgerOrder.selectRadio(testData.cheese);
  await burgerOrder.selectExtra(testData.extracheese);
  await burgerOrder.selectExtra(testData.topping);
  await burgerOrder.selectExtra(testData.sauce);
  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();
  await cart.validateProductInfo(testData.size); 
  await cart.validateProductInfo(testData.bun); 
  await cart.validateProductInfo(testData.cheese); 
  await cart.validateProductInfo(testData.extracheese); 
  await cart.validateProductInfo(testData.topping); 
  await cart.validateProductInfo(testData.sauce);
  await checkout.checkout();
  await checkout.fillContactForm("First Name", userData.firstName);
  await checkout.fillContactForm("Last Name", userData.lastName);
  const email = generateEmail();
  await checkout.fillContactForm("Email Address", email);
  await checkout.fillContactForm("Phone Number", userData.phoneNumber);
  await checkout.fillContactForm("Password", userData.password);
  await cart.validateProductInfo(testData.size); 
  await cart.validateProductInfo(testData.bun); 
  await cart.validateProductInfo(testData.extracheese); 
  await cart.validateProductInfo(testData.topping); 
  await cart.validateProductInfo(testData.sauce);
  await checkout.selectPaymentMeth(paymentData.method);
  await checkout.paymentFormValidation("Card Number",paymentData.cardNumber); 
  await checkout.paymentFormValidation("Expiration Date",paymentData.expirationDate); 
  await checkout.paymentFormValidation("Security Code",paymentData.cvv); 
  await checkout.paymentFormValidation("Postal Code",testData.zipCode); 
  await checkout.confirmPayementForm(); 
  await checkout.placeOrder();
  await checkout.summaryValidation();
  await cart.validateProductInfo(testData.size); 
  await cart.validateProductInfo(testData.bun); 
  await cart.validateProductInfo(testData.extracheese); 
  await cart.validateProductInfo(testData.topping); 
  await cart.validateProductInfo(testData.sauce);
});

