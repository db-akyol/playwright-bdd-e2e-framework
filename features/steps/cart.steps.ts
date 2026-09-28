import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

// ==================== GIVEN ====================

Given('{string} kullanıcısı ve {string} şifresi ile giriş yaptım', async ({ loginPage }, kullaniciAdi: string, sifre: string) => {
  await loginPage.goto();
  await loginPage.login(kullaniciAdi, sifre);
});

Given('sepete bir ürün ekledim', async ({ inventoryPage }) => {
  await inventoryPage.addFirstProductToCart();
});

// ==================== WHEN ====================

When('ilk ürünü sepete ekliyorum', async ({ inventoryPage }) => {
  await inventoryPage.addFirstProductToCart();
});

When('sepete {string} ürün ekliyorum', async ({ inventoryPage }, adet: string) => {
  const urunSayisi = parseInt(adet, 10);
  for (let i = 0; i < urunSayisi; i++) {
    await inventoryPage.addProductByIndex(i);
  }
});

When('ürünü sepetten çıkarıyorum', async ({ inventoryPage }) => {
  await inventoryPage.removeFirstProductFromCart();
});

// ==================== THEN ====================

Then('sepet simgesinde {string} görmeliyim', async ({ inventoryPage }, beklenenSayi: string) => {
  expect(await inventoryPage.getCartBadgeCount()).toBe(beklenenSayi);
});

Then('sepet boş olmalı', async ({ inventoryPage }) => {
  expect(await inventoryPage.isCartEmpty()).toBe(true);
});
