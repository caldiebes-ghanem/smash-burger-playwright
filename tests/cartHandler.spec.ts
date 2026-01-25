import { test } from '@playwright/test';
import { testData} from "../utils/testData";
import { setupToBurgerBuilder } from '../utils/orderFlow';

test('Update quantity in cart (increase)', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "cart is empty" },
    { type: "Expected Result", description: "validate quantity and cross all phases (order, checkout)" }
  );

  const { burgerOrder, cart, checkout } = await setupToBurgerBuilder(page);

  await cart.addquantity(2);
  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();

  await cart.qteShouldBe(2);
  await checkout.checkout();
  await checkout.checkoutQteIs(2);
});

test('Update quantity in cart (decrease)', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "cart is empty" },
    { type: "Expected Result", description: "validate decreasing quantity and cross all phases (oder, checkout)" }
  );
  const { burgerOrder, cart, checkout } = await setupToBurgerBuilder(page);
  await cart.addquantity(4); 
  await cart.decreasequantity(2); 
  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();
  await cart.qteShouldBe(3); 
  await checkout.checkout();
  await checkout.checkoutQteIs(3); 
    });


  test('verify totals recalc correctly through checkout and confirmation', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "cart is empty" },
    { type: "Expected Result", description: "validate quantity and total cross all phases (oder, checkout &summary)" }
  );
  const { burgerOrder, cart, checkout } = await setupToBurgerBuilder(page);

  await cart.addquantity(2); 
  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();
  await cart.qteShouldBe(2); 
  await cart.priceShouldBe(2, testData.price); 
  await cart.totalShouldBe(2,testData.price, testData.BagFee, testData.Tax); 
  await checkout.checkout();
  await cart.totalShouldBe(2,testData.price, testData.BagFee, testData.Tax); 
  });


test('Remove an item from cart + validate empty cart and checkout is blocked/handled correctly', async ({ page }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "cart is empty" },
    { type: "Expected Result", description: "Remove an item from cart + validate empty cart and checkout is blocked/handled correctly" }
  );
  const { burgerOrder, cart, checkout } = await setupToBurgerBuilder(page);

  await burgerOrder.addToCart();
  await burgerOrder.ProceedToCheckout();
  await cart.removeItem();
  await cart.displayCartEmptyMsg(); 

  });