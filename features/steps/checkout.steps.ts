import { expect } from '@playwright/test';
import { Given, When, Then } from './fixtures';

// ==================== GIVEN ====================

Given('{string} ürününü sepete ekledim', async ({ inventoryPage }, urunAdi: string) => {
  await inventoryPage.addProductToCartByName(urunAdi);
});

Given('sepete gidip ödeme adımına geçtim', async ({ inventoryPage, cartPage }) => {
  await inventoryPage.goToCart();
  await cartPage.proceedToCheckout();
});

// ==================== WHEN ====================

When('ödeme bilgilerini {string}, {string} ve {string} olarak giriyorum', async ({ checkoutPage }, ad: string, soyad: string, postaKodu: string) => {
  await checkoutPage.fillCheckoutInfo(ad, soyad, postaKodu);
  await checkoutPage.clickContinue();
});

When('siparişi onaylıyorum', async ({ checkoutPage }) => {
  await checkoutPage.finishOrder();
});

// ==================== THEN ====================

Then('{string} onay mesajını görmeliyim', async ({ checkoutPage }, mesaj: string) => {
  expect(await checkoutPage.getCompleteMessage()).toBe(mesaj);
});

Then('ödeme sayfasında {string} hatasını görmeliyim', async ({ checkoutPage }, hata: string) => {
  expect(await checkoutPage.getErrorMessage()).toBe(hata);
});
