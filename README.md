# Simple shop

Aplikacja stworzona w Java Spring Boot oraz React. Zawiera podstawowe funkcje CRUD.

## Funkcjonaności

Aplikacja zawiera następujące funkcjonalności:

- Dodawanie, usuwanie, edycja produktów
- Dodawanie produktów do koszyka
- Edycja ilości produktu w koszyku
- Zmiana języka w aplikacji
- Zmiana motywu ciemny/jasny
- Social login za pomocą GitHub

## Działanie

Backend aplikacji jest hostowany w chmurze. Aby uruchomić frontend aplikacji należy wpisać:

```bash
npm install
npm run dev
```

Po tym aplikacja będzie dostępna pod adresem `http://localhost:5173/`  
API backendowe jest dostępne pod adresem `http://20.101.96.88/api` i odpowiednimi endpointami
Aplikacja implementuje standardy OAuth2.0 oraz OIDC poprzez instancję serwera keycloak - serwer autoryzacyjny jest dostęny pod adresem `http://40.114.251.183/realms/backend` i korzysta z domyślnych endpointów dla danych standardów.

## Uruchomienie

Uruchomienie części frotendowej jest opisane w rozdziale wyżej.

## Niezrealizowane funkcjonalności

W ramach projektu nie powstała aplikacja mobilna jak i wszelkie podpunkty związane z aplikacją mobilną

## Technologie wykorzystane w projekcie

Do głównych technologii wykorzystanych w projekcie należą:

- Java
- Spring boot
- React
- Keycloak
- Tailwind CSS
- OpenID Connect
