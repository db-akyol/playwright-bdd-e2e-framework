@sepet
Feature: Alışveriş Sepeti İşlevselliği
  Giriş yapmış bir kullanıcı olarak
  Alışveriş sepetimi yönetebilmek istiyorum
  Böylece ürün satın alabilirim

  Background:
    Given "standard_user" kullanıcısı ve "secret_sauce" şifresi ile giriş yaptım

  @smoke
  Scenario: Sepete ürün ekleme
    When ilk ürünü sepete ekliyorum
    Then sepet simgesinde "1" görmeliyim

  @smoke
  Scenario: Sepetten ürün çıkarma
    Given sepete bir ürün ekledim
    When ürünü sepetten çıkarıyorum
    Then sepet boş olmalı

  Scenario: Sepete birden fazla ürün ekleme
    When sepete "3" ürün ekliyorum
    Then sepet simgesinde "3" görmeliyim
