# Playwright + Cucumber (BDD) E-Ticaret Test Otomasyonu

[SauceDemo](https://www.saucedemo.com) demo e-ticaret uygulaması üzerinde giriş (login) ve alışveriş sepeti akışlarını uçtan uca doğrulayan test otomasyon projesi. Senaryolar Türkçe Gherkin diliyle yazılmış, `playwright-bdd` ile Playwright Test'e derlenmekte ve **Page Object Model (POM)** katmanı üzerinden çalıştırılmaktadır. Testler Chromium, Firefox ve WebKit tarayıcılarında paralel olarak koşar; her push ve pull request'te GitHub Actions üzerinde otomatik tetiklenir.

![Playwright](https://img.shields.io/badge/Playwright-1.57-2EAD33?logo=playwright&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Cucumber](https://img.shields.io/badge/Cucumber-BDD-23D96C?logo=cucumber&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub%20Actions-CI-2088FF?logo=githubactions&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## Özellikler

- **BDD / Gherkin senaryoları** — Test senaryoları Türkçe, iş diline yakın `Given / When / Then` adımlarıyla `.feature` dosyalarında tanımlanır; teknik olmayan paydaşlar da okuyabilir.
- **playwright-bdd entegrasyonu** — `bddgen` komutu `.feature` dosyalarını Playwright Test spec'lerine derler (`.features-gen/`), böylece ayrı bir Cucumber runner'a gerek kalmadan Playwright'ın tüm yeteneklerinden yararlanılır.
- **Page Object Model** — Tüm locator ve sayfa etkileşimleri `pages/` altındaki sınıflarda kapsüllenmiştir. Ortak davranışlar `BasePage` sınıfından miras alınır; step definition'lar hiçbir locator bilmez.
- **Çoklu tarayıcı desteği** — Aynı senaryolar Chromium, Firefox ve WebKit (Desktop Chrome / Firefox / Safari) projelerinde çalıştırılır.
- **Paralel çalıştırma** — `fullyParallel: true` ile test dosyaları eşzamanlı yürütülür; CI ortamında kararlılık için tek worker'a düşürülür.
- **Scenario Outline & Examples** — Veri güdümlü (data-driven) test için tablo tabanlı senaryo şablonları kullanılır.
- **Etiket (tag) tabanlı filtreleme** — `@smoke`, `@pozitif`, `@negatif`, `@giris`, `@sepet` etiketleriyle seçmeli koşum.
- **Hata ayıklama artefaktları** — Başarısız testlerde otomatik ekran görüntüsü, video kaydı ve ilk retry'da trace dosyası üretilir.
- **CI/CD entegrasyonu** — GitHub Actions workflow'u ile otomatik koşum, CI'da 2 kez retry ve HTML raporunun artefakt olarak 30 gün saklanması.
- **Merkezî test verisi** — Kullanıcılar, ürünler, checkout bilgileri ve hata mesajları `utils/testData.ts` içinde tek noktadan yönetilir.
- **TypeScript strict mode** — Tüm kod tip güvenli (`strict: true`) yazılmıştır.

---

## Teknolojiler

| Teknoloji | Versiyon | Kullanım Amacı |
|---|---|---|
| [@playwright/test](https://playwright.dev) | `^1.40.0` (kurulu: 1.57.0) | Test runner, tarayıcı otomasyonu, assertion API'si |
| [playwright-bdd](https://vitalets.github.io/playwright-bdd/) | `^8.4.2` | Gherkin `.feature` dosyalarını Playwright spec'lerine derleyen BDD katmanı |
| [@cucumber/cucumber](https://cucumber.io) | `^12.4.0` | Gherkin dil desteği / BDD altyapısı |
| [TypeScript](https://www.typescriptlang.org) | `^5.3.0` (kurulu: 5.9.3) | Tip güvenli test kodu (ES2020 hedefi, strict mode) |
| [@types/node](https://www.npmjs.com/package/@types/node) | `^20.10.0` | Node.js tip tanımları |
| GitHub Actions | — | CI pipeline (Node.js 18, ubuntu-latest) |

**Test edilen uygulama:** `https://www.saucedemo.com` (Swag Labs demo e-ticaret sitesi)

---

## Proje Yapısı

```
Playwright-cucumber/
├── .github/
│   └── workflows/
│       └── playwright.yml        # GitHub Actions CI pipeline tanımı
├── features/                     # BDD katmanı
│   ├── login.feature             # Giriş senaryoları (@giris)
│   ├── cart.feature              # Sepet senaryoları (@sepet)
│   ├── deneme.feature            # Giriş senaryolarının deneme varyantı (@deneme)
│   └── steps/                    # Gherkin adımlarının TypeScript karşılıkları
│       ├── login.steps.ts        # Giriş adımları (Given/When/Then)
│       └── cart.steps.ts         # Sepet adımları (Given/When/Then)
├── pages/                        # Page Object Model sınıfları
│   ├── BasePage.ts               # Ortak temel sınıf (navigate, waitForPageLoad, getTitle...)
│   ├── LoginPage.ts              # Giriş sayfası: kullanıcı adı/şifre/hata mesajı/logo
│   ├── InventoryPage.ts          # Ürünler sayfası: listeleme, sepete ekleme, sıralama, logout
│   ├── CartPage.ts               # Sepet sayfası: ürün doğrulama, kaldırma, checkout'a geçiş
│   ├── CheckoutPage.ts           # Ödeme sayfası: form doldurma, toplam tutar, sipariş tamamlama
│   └── index.ts                  # Barrel export (tüm page object'lerin tek noktadan dışa aktarımı)
├── tests/                        # Playwright Test API ile yazılmış, POM'u doğrudan kullanan spec'ler
│   ├── login.spec.ts             # Giriş testleri (4 test)
│   └── ecommerce.spec.ts         # Uçtan uca e-ticaret akış testleri (8 test)
├── utils/
│   └── testData.ts               # Merkezî test verisi: TestUsers, Products, CheckoutInfo, ErrorMessages
├── .features-gen/                # bddgen tarafından üretilen spec'ler (otomatik, git'e dahil değil)
├── playwright.config.ts          # Playwright + BDD konfigürasyonu, tarayıcı projeleri, reporter'lar
├── tsconfig.json                 # TypeScript derleyici ayarları (ES2020, strict)
└── package.json                  # Bağımlılıklar ve npm script'leri
```

> **Not:** `playwright.config.ts` içindeki `testDir`, `defineBddConfig` tarafından döndürülen üretilmiş BDD dizinini (`.features-gen/`) gösterir. Bu nedenle varsayılan koşumda `.feature` dosyalarından üretilen senaryolar çalışır; `tests/` altındaki spec'ler ise aynı POM katmanının klasik Playwright Test API'siyle nasıl kullanıldığını gösteren referans testlerdir.

---

## Test Senaryoları

### `features/login.feature` — Giriş İşlevselliği `@giris`

> **Background:** Giriş sayfasındayım

| # | Senaryo | Etiketler |
|---|---|---|
| 1 | Geçerli bilgilerle başarılı giriş (`standard_user` / `secret_sauce` → ürünler sayfasına yönlendirme + "Products" başlığı) | `@smoke` `@pozitif` |
| 2 | Yanlış şifre ile başarısız giriş → `Epic sadface: Username and password do not match any user in this service` | `@negatif` |
| 3 | Kilitli kullanıcı ile başarısız giriş (`locked_out_user`) → `Epic sadface: Sorry, this user has been locked out.` | `@negatif` |
| 4 | **Scenario Outline:** Farklı kullanıcı tipleri için giriş doğrulaması — `standard_user` (başarılı), `problem_user` (başarılı), `locked_out_user` (kilitli hata) | `@negatif` |

### `features/cart.feature` — Alışveriş Sepeti İşlevselliği `@sepet`

> **Background:** `standard_user` / `secret_sauce` ile giriş yaptım

| # | Senaryo | Etiketler |
|---|---|---|
| 1 | Sepete ürün ekleme → sepet simgesinde "1" görünmeli | `@smoke` |
| 2 | Sepetten ürün çıkarma → sepet boş olmalı | `@smoke` |
| 3 | Sepete birden fazla ürün ekleme ("3" ürün) → sepet simgesinde "3" görünmeli | — |

### `features/deneme.feature` — Giriş İşlevselliği `@deneme`

Giriş akışının deneme/varyant senaryoları: geçerli bilgilerle başarılı giriş (`@pozitif`), yanlış şifre ile başarısız giriş (`@negatif`), kilitli kullanıcı ile giriş (`@negatif`).

### `tests/login.spec.ts` — Giriş Testleri (Playwright Test API)

- Giriş sayfası doğru görüntülenmeli (logo görünür, sayfa başlığı `Swag Labs`)
- Geçerli bilgilerle giriş yapılabilmeli → `/inventory` yönlendirmesi
- Kilitli kullanıcı için hata gösterilmeli
- Geçersiz bilgiler için hata gösterilmeli

### `tests/ecommerce.spec.ts` — E-Ticaret Akış Testleri (Playwright Test API)

- Ürünler sayfası 6 ürünü listelemeli, başlık `Products` olmalı
- Ürün sepete eklenebilmeli (Sauce Labs Backpack)
- Birden fazla ürün sepete eklenebilmeli (Backpack + Bike Light)
- Ürünler fiyata göre düşükten yükseğe sıralanabilmeli (ilk ürün `$7.99`)
- Sepetteki ürünler görüntülenebilmeli (başlık `Your Cart`)
- Ürün sepetten kaldırılabilmeli
- Ödeme işlemi tamamlanabilmeli → `Thank you for your order!`
- Tam e-ticaret akışı: ürün listeleme → 2 ürün ekleme → sepet doğrulama → checkout → sipariş tamamlama → ana sayfaya dönüş

---

## Kurulum

**Gereksinimler:** Node.js 18 veya üzeri, npm

```bash
# 1. Depoyu klonlayın
git clone https://github.com/<kullanici-adi>/Playwright-cucumber.git
cd Playwright-cucumber

# 2. Bağımlılıkları kurun
npm install

# 3. Playwright tarayıcılarını indirin (Chromium, Firefox, WebKit)
npx playwright install
```

> Linux ortamında sistem bağımlılıkları da gerekiyorsa: `npx playwright install --with-deps`

---

## Testleri Çalıştırma

| Komut | Açıklama |
|---|---|
| `npm test` | `.feature` dosyalarını derler (`bddgen`) ve tüm BDD testlerini headless çalıştırır |
| `npm run test:headed` | Testleri tarayıcı penceresi açık (headed) modda çalıştırır |
| `npm run test:ui` | Playwright UI Mode — testleri adım adım izleyip debug etmek için |
| `npm run test:smoke` | Yalnızca `@smoke` etiketli kritik senaryoları çalıştırır |
| `npm run test:login` | `@login` etiketi ile filtreleyerek çalıştırır (`--grep @login`) |
| `npm run bddgen` | Yalnızca Gherkin → Playwright spec derlemesini yapar |
| `npm run report` | Son koşuma ait HTML raporunu tarayıcıda açar |

> **Not:** Giriş senaryoları `.feature` dosyalarında `@giris` etiketiyle işaretlidir; `npm run test:login` script'i `--grep @login` kalıbını kullandığından bu senaryoları filtrelemek için aşağıdaki `--grep @giris` komutu kullanılabilir.

Ek olarak, etiketlere veya tarayıcıya göre doğrudan filtreleme:

```bash
# Sadece giriş senaryoları
npx bddgen && npx playwright test --grep @giris

# Sadece sepet senaryoları
npx bddgen && npx playwright test --grep @sepet

# Sadece negatif senaryolar
npx bddgen && npx playwright test --grep @negatif

# Tek tarayıcıda çalıştırma
npx bddgen && npx playwright test --project=chromium
```

### Çalıştırma Konfigürasyonu

`playwright.config.ts` içinde tanımlı davranışlar:

- **baseURL:** `https://www.saucedemo.com`
- **Projeler:** `chromium` (Desktop Chrome), `firefox` (Desktop Firefox), `webkit` (Desktop Safari)
- **fullyParallel:** `true` — testler paralel koşar
- **retries:** CI'da `2`, lokalde `0`
- **workers:** CI'da `1`, lokalde Playwright varsayılanı
- **forbidOnly:** CI'da `test.only` bırakılmışsa koşum başarısız olur
- **reporter:** `html` + `list`
- **trace:** `on-first-retry` · **screenshot:** `only-on-failure` · **video:** `retain-on-failure`

---

## CI/CD

`.github/workflows/playwright.yml` dosyasındaki **Playwright Tests** workflow'u şu durumlarda tetiklenir:

- `main` veya `master` branch'ine **push**
- `main` veya `master` branch'ine açılan **pull request**
- GitHub arayüzünden manuel tetikleme (**workflow_dispatch**)

Pipeline adımları (`ubuntu-latest`, 60 dakika timeout):

1. **Checkout repository** — `actions/checkout@v4`
2. **Setup Node.js** — `actions/setup-node@v4`, Node.js 18 + npm cache
3. **Install dependencies** — `npm ci` ile deterministik kurulum
4. **Install Playwright Browsers** — `npx playwright install --with-deps`
5. **Run Playwright tests** — `npm test` (bddgen + tüm BDD senaryoları, 3 tarayıcıda)
6. **Upload Playwright Report** — koşum iptal edilmediği sürece (`if: !cancelled()`) HTML raporu `playwright-report` adıyla artefakt olarak yüklenir ve **30 gün** saklanır

Böylece başarısız bir koşumda rapor, ekran görüntüleri ve trace dosyaları doğrudan GitHub Actions çalıştırma sayfasından indirilebilir.

---

## Lisans

Bu proje [MIT Lisansı](LICENSE) ile lisanslanmıştır.
