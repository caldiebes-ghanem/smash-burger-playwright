import { test } from "../utils/fixtures"; // adjust path if needed
import { WelcomePage } from "../pages/welcome";
import { Checkout } from "../pages/checkout";
import { userData,testData } from "../utils/testData";


test("Sign in using right mail and right password to see the welcome page", async ({ page, account }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "no one is connected" },
    { type: "Expected Result", description: "successful sign in and log out" }
  );
  const welcomePage = new WelcomePage(page);
  const checkout = new Checkout(page);

  await welcomePage.open(testData.urlCYO);
  await welcomePage.signIn();
  await checkout.fillContactForm("Email Address", account.email);
  await checkout.fillContactForm("Password", account.password);
  await welcomePage.submitSignIn(); 
  await welcomePage.createYourOwn();


});

test("Sign in using right mail but wrong password to see error message", async ({ page, account }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "no one is connected" },
    { type: "Expected Result", description: "failure of signing in" }
  );
  const welcomePage = new WelcomePage(page);
  const checkout = new Checkout(page);

  await welcomePage.open(testData.urlCYO);
  await welcomePage.signIn();
  await checkout.fillContactForm("Email Address", account.email);
  await checkout.fillContactForm("Password", userData.wrongPassword);
  await welcomePage.submitSignIn(); 
  await welcomePage.displayErrorMessage("Invalid username or password."); 

});