//function to handle the cookie banner 

import { Page, expect } from "@playwright/test";

export async function handleCookiesAndCloseAlert(page: Page) {
  const frame = page.frameLocator('iframe[title="TrustArc Cookie Consent Manager"]');
  const acceptAllBtn = frame.getByRole("button", { name: "Accept all" }).describe(`button to accept all cookies`);

  // Only run if cookie button is visible
  if (await acceptAllBtn.isVisible().catch(() => false)) {
    await acceptAllBtn.click();

    // Small alert handling
    const closeAlertBtn = frame.getByRole("button", { name: "Close" }).describe(`button to close an alert`);
    if (await closeAlertBtn.isVisible({ timeout: 3000 }).catch(() => false)) {
      await closeAlertBtn.click();
    }
  }
}
