import { test as base } from "@playwright/test";
import { WelcomePage } from "../pages/welcome";
import { Checkout } from "../pages/checkout";
import { userData, generateEmail } from "../utils/testData";

type Account = {
  email: string;
  password: string;
};

type WorkerFixtures = {
  account: Account;
};

// 1st generic = test fixtures (none here -> {})
// 2nd generic = worker fixtures (account lives here)
export const test = base.extend<{}, WorkerFixtures>({
  account: [
    async ({ browser }, use) => {
      const email = generateEmail();
      const password = userData.password;

      const page = await browser.newPage();

      const welcomePage = new WelcomePage(page);
      const checkout = new Checkout(page);

      await welcomePage.open(testData.urlCYO);
      await welcomePage.signIn();
      await welcomePage.createAccount();

      await checkout.fillContactForm("First Name", userData.firstName);
      await checkout.fillContactForm("Last Name", userData.lastName);
      await checkout.fillContactForm("Email Address", email);
      await checkout.fillContactForm("Phone Number", userData.phoneNumber);
      await checkout.fillContactForm("Password", password);

      await welcomePage.submitCreateAccount();

      await page.close();

      await use({ email, password });
    },
    { scope: "worker" },
  ],
});

export { expect } from "@playwright/test";
