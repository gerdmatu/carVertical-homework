import { test, expect } from '@playwright/test';

test('should apply voucher to reports', async ({ page }) => {
  await page.goto('https://www.carvertical.com/lt/home');
  await page.getByTestId('IdentifierForm-input').first().click();
  await page.getByTestId('IdentifierForm-input').first().fill('sallaaa146a396339');
  await page.getByTestId('IdentifierForm-submit').first().click();

  // This part is needed to avoid flakiness. Not sure when this part appears in the page
  await page.waitForLoadState('networkidle');
  let carOption = await page.locator('label').filter({ hasText: 'Kita' }).isVisible();
  if (carOption == true){
    await page.getByTestId('BisquitsBanner-acceptAllButton').click();
    await page.locator('label').filter({ hasText: 'Kita' }).click();
    await page.getByRole('button', { name: 'Toliau' }).click();
  }

  await page.locator('label').filter({ hasText: '3 ataskaitos' }).click();
  await page.getByRole('link', { name: 'Gauti ataskaitą' }).click();
  await page.getByTestId('VoucherField-expandButton').click();
  await page.getByTestId('VoucherField-input').fill('qahomework');
  await page.getByTestId('VoucherField-addVoucherButton').click();
  const locator = page.locator('#__next > main > div.CheckoutPage_root__dIFEz > div.Checkout_root__Onvvj > form > div:nth-child(1) > div.CheckoutTotalAmount_root__dGeMb > div.Title_root__Wim_K.Title_noSpaceBelow__CE9iw.CheckoutValue_root__cOeQL > p');
  await expect(locator).toContainText('32.65 €');
});