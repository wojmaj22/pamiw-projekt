import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  url: "http://40.114.251.183:8080/",
  realm: "backend",
  clientId: "frontend",
});

export default keycloak;
