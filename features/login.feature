@giris
Feature: Giriş İşlevselliği
  Bir kullanıcı olarak
  Uygulamaya giriş yapabilmek istiyorum
  Böylece hesabıma erişebilirim

  Background:
    Given giriş sayfasındayım

  @smoke @pozitif
  Scenario: Geçerli bilgilerle başarılı giriş
    When kullanıcı adı olarak "standard_user" giriyorum
    And şifre olarak "secret_sauce" giriyorum
    And giriş butonuna tıklıyorum
    Then ürünler sayfasına yönlendirilmeliyim
    And ürünler başlığını görmeliyim

  @negatif
  Scenario: Yanlış şifre ile başarısız giriş
    When kullanıcı adı olarak "standard_user" giriyorum
    And şifre olarak "yanlis_sifre" giriyorum
    And giriş butonuna tıklıyorum
    Then "Epic sadface: Username and password do not match any user in this service" hata mesajını görmeliyim

  @negatif
  Scenario: Kilitli kullanıcı ile başarısız giriş
    When kullanıcı adı olarak "locked_out_user" giriyorum
    And şifre olarak "secret_sauce" giriyorum
    And giriş butonuna tıklıyorum
    Then "Epic sadface: Sorry, this user has been locked out." hata mesajını görmeliyim

  @negatif
  Scenario Outline: Farklı kullanıcı tipleri için giriş doğrulaması
    When kullanıcı adı olarak "<kullanici_adi>" giriyorum
    And şifre olarak "<sifre>" giriyorum
    And giriş butonuna tıklıyorum
    Then "<sonuc>" sonucunu görmeliyim

    Examples:
      | kullanici_adi   | sifre        | sonuc         |
      | standard_user   | secret_sauce | basarili      |
      | problem_user    | secret_sauce | basarili      |
      | locked_out_user | secret_sauce | kilitli_hata  |
