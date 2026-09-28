import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

// ==================== GIVEN ====================

Given('giriş sayfasındayım', async ({ loginPage }) => {
  await loginPage.goto();
});

// ==================== WHEN ====================

When('kullanıcı adı olarak {string} giriyorum', async ({ loginPage }, kullaniciAdi: string) => {
  await loginPage.enterUsername(kullaniciAdi);
});

When('şifre olarak {string} giriyorum', async ({ loginPage }, sifre: string) => {
  await loginPage.enterPassword(sifre);
});

When('giriş butonuna tıklıyorum', async ({ loginPage }) => {
  await loginPage.clickLogin();
});

// ==================== THEN ====================

Then('ürünler sayfasına yönlendirilmeliyim', async ({ page }) => {
  await expect(page).toHaveURL(/.*inventory.html/);
});

Then('ürünler başlığını görmeliyim', async ({ inventoryPage }) => {
  expect(await inventoryPage.getProductsTitle()).toBe('Products');
});

Then('{string} hata mesajını görmeliyim', async ({ loginPage }, hataMesaji: string) => {
  expect(await loginPage.getErrorMessage()).toContain(hataMesaji);
});

Then('{string} sonucunu görmeliyim', async ({ page, loginPage }, sonuc: string) => {
  if (sonuc === 'basarili') {
    await expect(page).toHaveURL(/.*inventory.html/);
  } else if (sonuc === 'kilitli_hata') {
    expect(await loginPage.getErrorMessage()).toContain('locked out');
  } else {
    throw new Error(`Bilinmeyen beklenen sonuç: ${sonuc}`);
  }
});
