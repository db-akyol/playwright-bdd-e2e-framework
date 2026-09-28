import { test as base } from 'playwright-bdd';
import { createBdd } from 'playwright-bdd';
import { LoginPage, InventoryPage, CartPage, CheckoutPage } from '../../pages';

/**
 * Page object'ler her senaryo için ayrı fixture olarak oluşturulur.
 * Böylece paralel koşan senaryolar arasında paylaşılan global durum kalmaz.
 */
type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
});

export const { Given, When, Then } = createBdd(test);
