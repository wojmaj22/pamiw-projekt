import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          Card: {
            price: "Price: ",
            amount: "Current stock: ",
            edit: "Edit",
            delete: "Delete product",
            loading: "Loading ...",
            add: "Add to cart",
          },
          Navbar: {
            shop: "Shop",
            langSelect: "Languange",
            products: "Products",
            cart: "Cart",
            add: "Add product",
            login: "Login",
            logout: "Logout",
          },
          Form: {
            productName: "Input product name",
            name: "Name",
            productAmount: "Input stock quantity",
            amount: "Amount",
            productPrice: "Enter price",
            price: "Price",
            nameError: "Wrong product name!",
            amountError: "Wrong amount!",
            priceError: "Wrong price!",
            submitButton: "Save product",
          },
          Cart: {
            name: "Product name",
            amount: "Amount in cart",
            price: "Total price",
            delete: "Delete",
            empty: "Your cart is empty",
          },
        },
      },
      pl: {
        translation: {
          Card: {
            price: "Cena: ",
            amount: "Ilość sztuk: ",
            edit: "Edytuj",
            delete: "Usuń produkt",
            loading: "Ładowanie ...",
            add: "Dodaj do koszyka",
          },
          Navbar: {
            shop: "Sklep",
            langSelect: "Język",
            products: "Produkty",
            cart: "Koszyk",
            add: "Dodaj produt",
            login: "Zaloguj",
            logout: "Wyloguj",
          },
          Form: {
            productName: "Podaj nazwę produktu",
            name: "Nazwa",
            productAmount: "Podaj ilość produktu",
            amount: "Ilość",
            productPrice: "Wpisz cenę",
            price: "Cena",
            nameError: "Błędna nazwa produktu!",
            amountError: "Błędna ilość!",
            priceError: "Zła cena!",
            submitButton: "Zapisz produkt",
          },
          Cart: {
            name: "Nazwa produktu",
            amount: "Ilość w koszyku",
            price: "Sumaryczna cena",
            delete: "Usuń",
            empty: "Twój koszyk jest pusty",
          },
        },
      },
    },
  });

export default i18n;
