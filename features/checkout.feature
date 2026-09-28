@odeme
Feature: Ödeme (Checkout) Akışı
  Giriş yapmış bir kullanıcı olarak
  Sepetimdeki ürünlerin siparişini tamamlayabilmek istiyorum
  Böylece satın alma işlemini bitirebilirim

  Background:
    Given "standard_user" kullanıcısı ve "secret_sauce" şifresi ile giriş yaptım
    And "Sauce Labs Backpack" ürününü sepete ekledim
    And sepete gidip ödeme adımına geçtim

  @smoke @pozitif
  Scenario: Geçerli bilgilerle siparişi tamamlama
    When ödeme bilgilerini "Deniz", "Akyol" ve "21000" olarak giriyorum
    And siparişi onaylıyorum
    Then "Thank you for your order!" onay mesajını görmeliyim

  @negatif
  Scenario Outline: Eksik ödeme bilgisi ile devam edememe
    When ödeme bilgilerini "<ad>", "<soyad>" ve "<posta_kodu>" olarak giriyorum
    Then ödeme sayfasında "<hata>" hatasını görmeliyim

    Examples:
      | ad    | soyad | posta_kodu | hata                           |
      |       | Akyol | 21000      | Error: First Name is required  |
      | Deniz |       | 21000      | Error: Last Name is required   |
      | Deniz | Akyol |            | Error: Postal Code is required |
