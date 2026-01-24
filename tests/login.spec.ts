import { test } from "../utils/fixtures"; // adjust path if needed
import { WelcomePage } from "../pages/welcome";
import { Checkout } from "../pages/checkout";
import { userData } from "../utils/testData";


test("Sign in using right password and account", async ({ page, account }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "no one is connected" },
    { type: "Expected Result", description: "successful sign in and log out" }
  );

  test.setTimeout(60000);

  const welcomePage = new WelcomePage(page);
  const checkout = new Checkout(page);

  await welcomePage.open();
  await welcomePage.signIn();
  await checkout.fillContactForm("Email Address", account.email);
  await checkout.fillContactForm("Password", account.password);
  await welcomePage.submitSignIn(); 
  await welcomePage.createYourOwn();


});

test("Sign in using right mail wrong password to see error message", async ({ page, account }) => {
  test.info().annotations.push(
    { type: "Pre-condition", description: "no one is connected" },
    { type: "Expected Result", description: "failure of signing in" }
  );

  test.setTimeout(60000);

  const welcomePage = new WelcomePage(page);
  const checkout = new Checkout(page);

  await welcomePage.open();
  await welcomePage.signIn();
  await checkout.fillContactForm("Email Address", account.email);
  await checkout.fillContactForm("Password", userData.wrongPassword);
  await welcomePage.submitSignIn(); 
  await welcomePage.displayErrorMessage("Invalid username or password."); 

});