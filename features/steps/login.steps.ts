import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

const { Given, When, Then } = createBdd();

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

// ==================== GIVEN ====================

Given('giriş sayfasındayım', async ({ page }) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
});

// ==================== WHEN ====================

When('kullanıcı adı olarak {string} giriyorum', async ({ page }, kullaniciAdi: string) => {
  await loginPage.enterUsername(kullaniciAdi);
});

When('şifre olarak {string} giriyorum', async ({ page }, sifre: string) => {
  await loginPage.enterPassword(sifre);
});

When('giriş butonuna tıklıyorum', async ({ page }) => {
  await loginPage.clickLogin();
});

// ==================== THEN ====================

Then('ürünler sayfasına yönlendirilmeliyim', async ({ page }) => {
  inventoryPage = new InventoryPage(page);
  await expect(page).toHaveURL(/.*inventory.html/);
});

Then('ürünler başlığını görmeliyim', async ({ page }) => {
  const baslik = await inventoryPage.getProductsTitle();
  expect(baslik).toBe('Products');
});

Then('{string} hata mesajını görmeliyim', async ({ page }, hataMesaji: string) => {
  const gercekHata = await loginPage.getErrorMessage();
  expect(gercekHata).toContain(hataMesaji);
});

Then('{string} sonucunu görmeliyim', async ({ page }, sonuc: string) => {
  if (sonuc === 'basarili') {
    await expect(page).toHaveURL(/.*inventory.html/);
  } else if (sonuc === 'kilitli_hata') {
    const hataMesaji = await loginPage.getErrorMessage();
    expect(hataMesaji).toContain('locked out');
  }
});
