import { expect } from '@playwright/test';
import { createBdd } from 'playwright-bdd';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

const { Given, When, Then } = createBdd();

let loginPage: LoginPage;
let inventoryPage: InventoryPage;

// ==================== GIVEN ====================

Given('{string} kullanıcısı ve {string} şifresi ile giriş yaptım', async ({ page }, kullaniciAdi: string, sifre: string) => {
  loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login(kullaniciAdi, sifre);
  inventoryPage = new InventoryPage(page);
});

Given('sepete bir ürün ekledim', async ({ page }) => {
  await inventoryPage.addFirstProductToCart();
});

// ==================== WHEN ====================

When('ilk ürünü sepete ekliyorum', async ({ page }) => {
  await inventoryPage.addFirstProductToCart();
});

When('sepete {string} ürün ekliyorum', async ({ page }, adet: string) => {
  const urunSayisi = parseInt(adet);
  for (let i = 0; i < urunSayisi; i++) {
    await inventoryPage.addProductByIndex(i);
  }
});

When('ürünü sepetten çıkarıyorum', async ({ page }) => {
  await inventoryPage.removeFirstProductFromCart();
});

// ==================== THEN ====================

Then('sepet simgesinde {string} görmeliyim', async ({ page }, beklenenSayi: string) => {
  const sepetSayisi = await inventoryPage.getCartBadgeCount();
  expect(sepetSayisi).toBe(beklenenSayi);
});

Then('sepet boş olmalı', async ({ page }) => {
  const bosmu = await inventoryPage.isCartEmpty();
  expect(bosmu).toBe(true);
});
